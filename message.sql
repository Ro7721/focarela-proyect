CREATE DATABASE IF NOT EXISTS focarela;
USE focarela;

-- ===========================
-- TABLA USUARIO
-- ===========================

CREATE TABLE Usuario (
    idUsuario CHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===========================
-- TABLA CLIENTE
-- ===========================

CREATE TABLE Cliente (
    idCliente CHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    correo VARCHAR(150),
    direccion VARCHAR(200)
);

-- ===========================
-- CATEGORIA PRODUCTO
-- ===========================

CREATE TABLE CategoriaProducto (
    idCategoria CHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- ===========================
-- PRODUCTO
-- ===========================

CREATE TABLE Producto (
    idProducto CHAR(36) PRIMARY KEY,
    idCategoria CHAR(36) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen VARCHAR(255),
    estado BOOLEAN DEFAULT TRUE,

    CONSTRAINT fk_producto_categoria
        FOREIGN KEY (idCategoria)
        REFERENCES CategoriaProducto(idCategoria)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ===========================
-- INVENTARIO
-- ===========================

CREATE TABLE Inventario (
    idInventario CHAR(36) PRIMARY KEY,
    nombre_insumo VARCHAR(100) NOT NULL,
    cantidad INT NOT NULL,
    unidad_medida VARCHAR(50),
    stock_minimo INT DEFAULT 0
);

-- ===========================
-- MOVIMIENTO INVENTARIO
-- ===========================

CREATE TABLE MovimientoInventario (
    idMovimiento CHAR(36) PRIMARY KEY,
    idInventario CHAR(36) NOT NULL,
    tipo_movimiento ENUM('ENTRADA','SALIDA') NOT NULL,
    cantidad INT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    observacion TEXT,

    CONSTRAINT fk_movimiento_inventario
        FOREIGN KEY (idInventario)
        REFERENCES Inventario(idInventario)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ===========================
-- PEDIDO
-- ===========================

CREATE TABLE Pedido (
    idPedido CHAR(36) PRIMARY KEY,
    idCliente CHAR(36) NOT NULL,
    idUsuario CHAR(36) NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(30) NOT NULL,

    CONSTRAINT fk_pedido_cliente
        FOREIGN KEY (idCliente)
        REFERENCES Cliente(idCliente)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_pedido_usuario
        FOREIGN KEY (idUsuario)
        REFERENCES Usuario(idUsuario)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ===========================
-- DETALLE PEDIDO
-- ===========================

CREATE TABLE DetallePedido (
    idDetalle CHAR(36) PRIMARY KEY,
    idPedido CHAR(36) NOT NULL,
    idProducto CHAR(36) NOT NULL,
    cantidad INT NOT NULL,

    CONSTRAINT fk_detallepedido_pedido
        FOREIGN KEY (idPedido)
        REFERENCES Pedido(idPedido)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_detallepedido_producto
        FOREIGN KEY (idProducto)
        REFERENCES Producto(idProducto)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ===========================
-- VENTA
-- ===========================

CREATE TABLE Venta (
    idVenta CHAR(36) PRIMARY KEY,
    idPedido CHAR(36) NOT NULL,
    fechaVenta DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    metodoPago VARCHAR(50) NOT NULL,
    estadoPago VARCHAR(30),

    CONSTRAINT fk_venta_pedido
        FOREIGN KEY (idPedido)
        REFERENCES Pedido(idPedido)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ===========================
-- DETALLE VENTA
-- ===========================

CREATE TABLE DetalleVenta (
    idDetalleVenta CHAR(36) PRIMARY KEY,
    idVenta CHAR(36) NOT NULL,
    idProducto CHAR(36) NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_detalleventa_venta
        FOREIGN KEY (idVenta)
        REFERENCES Venta(idVenta)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_detalleventa_producto
        FOREIGN KEY (idProducto)
        REFERENCES Producto(idProducto)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ===========================
-- CATEGORIA GASTO
-- ===========================

CREATE TABLE CategoriaGasto (
    idCategoriaGasto CHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- ===========================
-- GASTO
-- ===========================

CREATE TABLE Gasto (
    idGasto CHAR(36) PRIMARY KEY,
    idCategoriaGasto CHAR(36) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha DATE NOT NULL,
    descripcion TEXT,

    CONSTRAINT fk_gasto_categoria
        FOREIGN KEY (idCategoriaGasto)
        REFERENCES CategoriaGasto(idCategoriaGasto)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ===========================
-- CAJA
-- ===========================

CREATE TABLE Caja (
    idCaja CHAR(36) PRIMARY KEY,
    idUsuario CHAR(36) NOT NULL,
    fecha DATE NOT NULL,
    totalIngresos DECIMAL(10,2) DEFAULT 0,
    totalEgresos DECIMAL(10,2) DEFAULT 0,
    saldoFinal DECIMAL(10,2) DEFAULT 0,
    estado BOOLEAN DEFAULT TRUE,

    CONSTRAINT fk_caja_usuario
        FOREIGN KEY (idUsuario)
        REFERENCES Usuario(idUsuario)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ===========================
-- REPORTE
-- ===========================

CREATE TABLE Reporte (
    idReporte CHAR(36) PRIMARY KEY,
    idUsuario CHAR(36) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL,
    fechaGeneracion DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_reporte_usuario
        FOREIGN KEY (idUsuario)
        REFERENCES Usuario(idUsuario)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);