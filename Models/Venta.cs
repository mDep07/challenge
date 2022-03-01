using System;
using System.Collections.Generic;

#nullable disable

namespace GYF_Challenge.Models
{
  public partial class Venta
  {
    public int CategoriaId { get; set; }
    public string CategoriaNombre { get; set; }
    public List<Producto> Productos { get; set; }
  }
}
