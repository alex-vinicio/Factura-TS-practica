"use strict";
var ProductoImp = /** @class */ (function () {
    function ProductoImp() {
        this.id = 0;
        this.fechaRegistro = new Date();
        this.estado = "";
        this.nombre = "";
        this.precioUnitario = 0;
        this.cantidad = 0;
        this.fechaRegistro = new Date();
    }
    ProductoImp.prototype.cantidadTotal = function () {
        return this.cantidad * this.precioUnitario;
    };
    ProductoImp.prototype.imprimirTabla = function () {
        return "".concat(this.id, " | ").concat(this.nombre, " | $").concat(this.precioUnitario, " | ").concat(this.cantidad, " | $$").concat(this.cantidadTotal(), "\n");
    };
    return ProductoImp;
}());
//otros metodos
var newUID = function () {
    return Math.random().toString(36).slice(2);
};
//instanciacion de objetos
var FaturaImp = /** @class */ (function () {
    function FaturaImp() {
        this.id = 0;
        this.fechaRegistro = new Date();
        this.estado = "";
        this.dirrecion = "";
        this.nombreCliente = "";
        this.fechaTransaccion = new Date();
        this.iva = 0;
        this.productos = [];
        this.fechaRegistro = new Date();
    }
    FaturaImp.prototype.subTotalPagar = function () {
        var totalPrecio = 0;
        this.productos.forEach(function (producto) {
            totalPrecio += producto.cantidadTotal();
        });
        return totalPrecio;
    };
    FaturaImp.prototype.totalConImpuestos = function () {
        var total = this.subTotalPagar();
        return total + (total * (this.iva / 100));
    };
    FaturaImp.prototype.imprimirFactura = function () {
        return "****************************************\n\tFACTURACION AA\n****************************************\n".concat(this.id, "\tCliente:").concat(this.nombreCliente, "\n").concat(this.dirrecion, "\tFecha:").concat(this.fechaTransaccion.toLocaleDateString(), "\n****************************************\n").concat(this.productos.map(function (producto) { return producto.imprimirTabla(); }).join(""), "\nSubtotal: $").concat(this.subTotalPagar(), "\nIVA: (").concat(this.iva, "%)\nTotal: $").concat(this.totalConImpuestos(), "\n****************************************\n");
    };
    return FaturaImp;
}());
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
