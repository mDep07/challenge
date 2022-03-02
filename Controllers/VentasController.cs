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
    public async Task<ActionResult<Venta>> GetProductos(decimal presupuesto)
    {
      var productos = await _context.Productos.Where(prod => prod.Precio < presupuesto).ToListAsync();
      var productosOrdenados = productos.OrderByDescending(prod => prod.Precio).ToArray();
      var productosAgrupados = productosOrdenados.GroupBy(prod => prod.Categoria).ToArray();


      var primerGrupo = productosAgrupados.ElementAtOrDefault(0);
      if(primerGrupo == null)
      {
        return NoContent();
      }

      var segundoGrupo = productosAgrupados.ElementAtOrDefault(1);
      if(segundoGrupo == null)
      {
        var primerResultado = primerGrupo.First();
        var resultado = new Venta() 
        {
          Suma = (decimal)primerResultado.Precio,
          Productos = new List<Producto>()
        };

        resultado.Productos.Add(primerResultado);
        return resultado;
      }

      
      var resultado1 = new List<List<Producto>>();
      for(var i = 0; i < primerGrupo.Count(); i++)
      {
        var producto = primerGrupo.ElementAtOrDefault(i);
        var existeProducto = segundoGrupo.Where(prod => ((decimal)prod.Precio + (decimal)producto.Precio) <= presupuesto).FirstOrDefault();
        if(existeProducto != null)
        {
          var listado = new List<Producto>();
          listado.Add(producto);
          listado.Add(existeProducto);
          resultado1.Add(listado);
        }

        // for(var j = 0; j <= segundoGrupo.Count(); j++)
        // {
        //   var productoSigGrupo = segundoGrupo.ElementAtOrDefault(j);
        //   var sumaPrecios = producto.Precio + productoSigGrupo.Precio;
        //   if(sumaPrecios <= presupuesto)
        //   { 
        //     var listado = new List<Producto>();
        //     listado.Add(producto);
        //     listado.Add(productoSigGrupo);
        //     resultado1.Add(listado);
        //     break;
        //   }
        // }
      }

      var listadoPosiblesVentas = resultado1.Aggregate(
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
      var categorias = await _context.Categorias.ToListAsync();

      venta.Productos.ForEach(prod => 
      {
        var categoria = _context.Categorias.Find(prod.Categoria);
        prod.CategoriaNavigation = new Categoria() 
        {
          Id = categoria.Id,
          Nombre = categoria.Nombre
        };
      });

      return venta;
    }
  }
}