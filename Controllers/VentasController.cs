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
      // var productosAgrupadosPorCategoria = productos.Aggregate(new Venta(), (list, producto) => 
      // {
      //   // var existeCategoria = list.Where(c => c).SingleOrDefault();

      // });

      return NoContent();
    }
  }
}