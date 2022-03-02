using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GYF_Challenge.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GYF_Challenge.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class VentasController : ControllerBase
  {
    private readonly GYFChallengeDbContext _context;

    public VentasController(GYFChallengeDbContext context)
    {
      _context = context;
    }

    // GET: api/Ventas
    [HttpGet]
    public async Task<ActionResult<Venta>> GetProductos(int presupuesto)
    {
      if(presupuesto < 0 || presupuesto > 1000000) 
      {
        return BadRequest();
      }

      var productos = await _context.Productos.Where(prod => prod.Precio <= presupuesto).ToListAsync();
      var productosOrdenados = productos.OrderByDescending(prod => prod.Precio).ToArray();
      var productosAgrupados = productosOrdenados.GroupBy(prod => prod.Categoria).ToArray();

      var resultado = new Venta() 
      {
        Suma = 0,
        Productos = new List<Producto>()
      };

      var primerGrupo = productosAgrupados.ElementAtOrDefault(0);
      if(primerGrupo == null)
      {
        return resultado;
      }

      var segundoGrupo = productosAgrupados.ElementAtOrDefault(1);
      if(segundoGrupo == null)
      {
        
        var primerResultado = primerGrupo.First();
        var categoria = _context.Categorias.Find(primerResultado.Categoria);
        primerResultado.CategoriaNavigation = new Categoria() 
        {
          Id = categoria.Id,
          Nombre = categoria.Nombre
        };

        resultado.Productos.Add(primerResultado);
        resultado.Suma = (decimal)primerResultado.Precio;
        return resultado;
      }

      
      var listadoProductos = new List<List<Producto>>();
      for(var i = 0; i < primerGrupo.Count(); i++)
      {
        var producto = primerGrupo.ElementAtOrDefault(i);
        var existeProducto = segundoGrupo.Where(prod => ((decimal)prod.Precio + (decimal)producto.Precio) <= presupuesto).FirstOrDefault();
        if(existeProducto != null)
        {
          var listado = new List<Producto>();
          listado.Add(producto);
          listado.Add(existeProducto);
          listadoProductos.Add(listado);
        }
      }

      var listadoPosiblesVentas = listadoProductos.Aggregate(
        new List<Venta>(), (acc, current) => 
        {
          var venta = new Venta()
          {
            Suma = current.Sum(prod => (decimal)prod.Precio),
            Productos = new List<Producto>()
          };
          
          venta.Productos.AddRange(current);
          acc.Add(venta);
          return acc;
        });

      var venta = listadoPosiblesVentas.OrderByDescending(venta => venta.Suma).First();
      venta.Productos.ForEach(prod => 
      {
        var categoria = _context.Categorias.Find(prod.Categoria);
        prod.CategoriaNavigation = new Categoria() 
        {
          Id = categoria.Id,
          Nombre = categoria.Nombre
        };
      });

      resultado.Suma = venta.Suma;
      resultado.Productos = venta.Productos;

      return resultado;
    }
  }
}