using System;
using System.Collections.Generic;

#nullable disable

namespace GYF_Challenge.Models
{
  public partial class Venta
  {
    public decimal Suma { get; set; }
    public List<Producto> Productos { get; set; }
  }
}
