interface GeneraData {
  id: number | string;
  fechaRegistro: Date;
  estado: string;
}
interface ProductoI extends GeneraData {
  nombre: string;
  precioUnitario: number;
  cantidad: number;
}

interface FacturaI extends GeneraData {
  dirrecion: string;
  nombreCliente: string;
  fechaTransaccion: Date;
  iva: number;
  detalles?: string;

  productos: ProductoI[];
}

class ProductoImp implements ProductoI {
  id: number | string = 0;
  fechaRegistro = new Date();
  estado: string = "";
  nombre: string = "";
  precioUnitario: number = 0;
  cantidad: number = 0;
  constructor() {
    this.fechaRegistro = new Date();
  }

  cantidadTotal(): number {
    return this.cantidad * this.precioUnitario;
  }
  imprimirTabla(): string {
    return `${this.id} | ${this.nombre} | $${this.precioUnitario} | ${
      this.cantidad
    } | $$${this.cantidadTotal()}\n`;
  }

}

//otros metodos
const newUID = ()=>{
    return Math.random().toString(36).slice(2);
}

//instanciacion de objetos
class FaturaImp implements FacturaI {
  public id: number | string = 0;
  public fechaRegistro: Date = new Date();
  public estado: string = "";
  public dirrecion: string = "";
  public nombreCliente: string = "";
  public fechaTransaccion: Date = new Date();

  public iva: number = 0;
  public productos: ProductoImp[] = [];
  public detalles?: string;
  constructor() {
    this.fechaRegistro = new Date();
  }
    public subTotalPagar(): number {
        let totalPrecio = 0;
        this.productos.forEach((producto) => {
            totalPrecio += producto.cantidadTotal();
        });
        return totalPrecio;
    }

    public totalConImpuestos(): number {
        var total = this.subTotalPagar();
        return total+ (total * (this.iva/100));
    }

    public imprimirFactura(): string {
        return `****************************************\n\tFACTURACION AA\n****************************************\n${this.id}\tCliente:${this.nombreCliente}\n${this.dirrecion}\tFecha:${this.fechaTransaccion.toLocaleDateString()}\n****************************************\n${this.productos.map((producto) => producto.imprimirTabla()).join("")}\nSubtotal: $${this.subTotalPagar()}\nIVA: (${this.iva}%)\nTotal: $${this.totalConImpuestos()}\n****************************************\n`;
    }
}

var prod1 = new ProductoImp();
prod1.id = newUID();
prod1.nombre = "Tomate";
prod1.precioUnitario = 2;
prod1.cantidad = 2;

var prod2 = new ProductoImp();
prod2.id = newUID();
prod2.nombre = "Pepino";
prod2.precioUnitario = 3;
prod2.cantidad = 3;

var fact = new FaturaImp();
fact.id = "SRR-1111-E";
fact.estado = "Pendiente";
fact.dirrecion = "Calle Empaña y Olmedo";
fact.nombreCliente = "Juan Pit";
fact.fechaTransaccion = new Date();
fact.iva = 16;
fact.productos.push(prod1);
fact.productos.push(prod2);
fact.detalles = "La venta 1 de esta factura";


//console.log(prod1.imprimirTabla(), prod2.imprimirTabla());
console.log(fact.imprimirFactura());
