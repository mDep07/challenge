using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GYF_Challenge.Models;
using System.Net;

namespace GYF_Challenge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly GYFChallengeDbContext _context;

        public ProductosController(GYFChallengeDbContext context)
        {
            _context = context;
        }

        // GET: api/Productos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
        {   
            var productos = await _context.Productos.ToListAsync();

            productos.ForEach(producto => {
                if(producto.Categoria != null) {
                    var categoria = _context.Categorias.Find(producto.Categoria);
                    producto.CategoriaNavigation = new Categoria 
                    {
                        Id = categoria.Id,
                        Nombre = categoria.Nombre
                    };
                }
            });

            return productos;
        }

        // GET: api/Productos/Categorias
        [HttpGet("Categorias")]
        public async Task<ActionResult<IEnumerable<Categoria>>> GetCategorias()
        {
            return await _context.Categorias.ToListAsync();
        }

        // GET: api/Productos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> GetProducto(int id)
        {
            var producto = await _context.Productos.FindAsync(id);

            if (producto == null)
            {
                return NotFound();
            }

            var categoria = await _context.Categorias.FindAsync(producto.Categoria);
            producto.CategoriaNavigation = new Categoria 
            {
                Id = categoria.Id,
                Nombre = categoria.Nombre
            };
            
            return producto;
        }

        // POST: api/Productos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Producto>> PostProducto(Producto producto)
        {
            producto.FechaCarga = DateTime.Now;
            if(producto.Categoria == null) 
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { Status = "Error", Message = "Debe seleccionar una categoría." });
            }

            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();

            var categoria = await _context.Categorias.FindAsync(producto.Categoria);
            producto.CategoriaNavigation = new Categoria 
            {
                Id = categoria.Id,
                Nombre = categoria.Nombre
            };

            return CreatedAtAction("GetProducto", new { id = producto.Id }, producto);
        }

        // DELETE: api/Productos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducto(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null)
            {
                return NotFound();
            }

            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductoExists(int id)
        {
            return _context.Productos.Any(e => e.Id == id);
        }
    }
}
