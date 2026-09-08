# El Bajón del Gorila — versión unificada

Proyecto HTML/CSS/JavaScript que integra las páginas públicas (Inicio, Menú y Promociones) con los módulos de Carrito/Checkout y Administración.

## Estructura

```text
el-bajon-unificado/
├── index.html
├── menu.html
├── promociones.html
├── carrito/
│   ├── carrito.html
│   ├── entrega.html
│   └── confirmacion.html
├── admin/
│   ├── productos.html
│   ├── pedidos.html
│   └── usuarios.html
├── css/
│   ├── base.css
│   ├── header.css
│   ├── footer.css
│   ├── componentes.css
│   ├── inicio.css
│   ├── menu.css
│   ├── promociones.css
│   ├── responsive.css
│   ├── checkout.css
│   └── admin.css
├── js/
│   ├── comun.js
│   ├── menu.js
│   ├── promociones.js
│   ├── carrito.js
│   ├── entrega.js
│   ├── productos.js
│   ├── pedidos.js
│   └── usuarios.js
└── img/
```

## Decisiones de integración

- `header.css` y `footer.css` son compartidos por Inicio, Menú, Promociones y Checkout.
- Se conservaron nombres como `header`, `footer`, `navbar`, `checkout` y `btn` donde ya formaban parte del código del grupo.
- Los HTML del carrito se mantienen en `carrito/` y los del panel en `admin/` para separar módulos.
- Los CSS y JS se centralizaron en `css/` y `js/`.
- Las rutas relativas fueron actualizadas para funcionar desde las subcarpetas.
- Bootstrap Icons se conserva porque el header del carrito lo utiliza.

## Pendiente funcional importante

Los botones `+ AGREGAR` del Menú todavía no comparten datos con `carrito.js`. El carrito actual contiene un producto de ejemplo definido directamente en el JavaScript. Para una integración completa se debe crear un estado compartido, por ejemplo usando `localStorage`.
