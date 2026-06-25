package com.epiis.backfocarela.business;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.epiis.backfocarela.dto.request.RequestProducto;
import com.epiis.backfocarela.dto.response.ResponseProducto;
import com.epiis.backfocarela.message.GenericResponse;
import com.epiis.backfocarela.model.Categoria;
import com.epiis.backfocarela.model.Producto;
import com.epiis.backfocarela.repository.CategoriapRepo;
import com.epiis.backfocarela.repository.ProductoRepo;

@Service
public class BusinessProducto {
    private final ProductoRepo productoRepo;
    private final CategoriapRepo categoriaRepo;

    public BusinessProducto(ProductoRepo productoRepo,
            CategoriapRepo categoriaRepo) {
        this.productoRepo = productoRepo;
        this.categoriaRepo = categoriaRepo;
    }

    // INSERTAR
    public ResponseProducto insert(RequestProducto request) {
        GenericResponse response = new GenericResponse();

        Producto producto = new Producto();
        Categoria categoria = categoriaRepo.findById(request.getIdCategoria())
                .orElse(null);
        if (categoria == null) {
            response.error();
            response.addMessage("La categoría no existe");
            return null;
        }
        producto.setIdProducto(UUID.randomUUID().toString());
        producto.setCategoria(categoria);
        producto.setNombre(request.getNombre());
        producto.setDescripcion(request.getDescripcion());
        producto.setPrecio(request.getPrecio());
        producto.setImagen(request.getImagen());
        producto.setEstado(request.getEstado());

        productoRepo.save(producto);
        response.success();
        response.addMessage("Producto registrado correctamente.");
        return mapProducto(producto);
    }

    public ResponseProducto mapProducto(Producto producto) {

        ResponseProducto response = new ResponseProducto();

        response.setIdProducto(producto.getIdProducto());
        response.setIdCategoria(producto.getCategoria().getIdCategoria());
        response.setCategoriaNombre(producto.getCategoria().getNombre());
        response.setNombre(producto.getNombre());
        response.setDescripcion(producto.getDescripcion());
        response.setPrecio(producto.getPrecio());
        response.setImagen(producto.getImagen());
        response.setEstado(producto.getEstado());

        return response;
    }

    public List<ResponseProducto> getAll() {

        return productoRepo.findAll()
                .stream()
                .map(this::mapProducto)
                .collect(Collectors.toList());
    }

    public ResponseProducto getById(String id) {

        Producto producto = productoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado."));

        return mapProducto(producto);
    }

    public List<ResponseProducto> search(String nombre) {

        return productoRepo.findByNombreContainingIgnoreCase(nombre)
                .stream()
                .map(this::mapProducto)
                .collect(Collectors.toList());
    }

    public List<ResponseProducto> getByCategoria(String idCategoria) {

        return productoRepo.findByCategoria_IdCategoria(idCategoria)
                .stream()
                .map(this::mapProducto)
                .collect(Collectors.toList());
    }

    public ResponseProducto update(String id, RequestProducto request) {

        Producto producto = productoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado."));

        Categoria categoria = categoriaRepo.findById(request.getIdCategoria())
                .orElseThrow(() -> new RuntimeException("La categoría no existe."));

        producto.setCategoria(categoria);
        producto.setNombre(request.getNombre());
        producto.setDescripcion(request.getDescripcion());
        producto.setPrecio(request.getPrecio());
        producto.setImagen(request.getImagen());
        producto.setEstado(request.getEstado());

        productoRepo.save(producto);

        return mapProducto(producto);
    }

    public GenericResponse delete(String id) {

        GenericResponse response = new GenericResponse();

        Producto producto = productoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado."));

        producto.setEstado(false);

        productoRepo.save(producto);

        response.success();
        response.addMessage("Producto eliminado correctamente.");

        return response;
    }
}
