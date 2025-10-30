document.addEventListener("DOMContentLoaded", () => {
    const productos = [
        { nombre: "Tableta 80% Cacao", precio: 9800, img: "Imagenes/Productos_Chocolates/Chocolates_Amargo.png" },
        { nombre: "Tableta Chocolate Blanco", precio: 8900, img: "Imagenes/Productos_Chocolates/Chocolates_Blanco.png" },
        { nombre: "Tableta Chocolate Sin Azúcar", precio: 9500, img: "Imagenes/Productos_Chocolates/Chocolates_SinAzucar.png" },
        { nombre: "Tableta con Pistacho", precio: 10500, img: "Imagenes/Productos_Chocolates/Chocolates_Pistachio.png" },
        { nombre: "Chocolate En Rama (Arago y con Leche)", precio: 16500, img: "Imagenes/Productos_Chocolates/Chocolates_EnRama.png" },
        { nombre: "Chocolate En Rama (Blanco y con Leche)", precio: 15800, img: "Imagenes/Productos_Chocolates/Chocolates_EnRamaBlanco.png" },
        
        { nombre: "Caja Bombones Amargos x18", precio: 19800, img: "Imagenes/Productos_Bombones/Bombones_x18.png" },
        { nombre: "Caja Bombones Amargos x15", precio: 16500, img: "Imagenes/Productos_Bombones/Bombones_x15.png" },
        { nombre: "Caja Bombones Amargos x12", precio: 13800, img: "Imagenes/Productos_Bombones/Bombones_x12.png" },
        { nombre: "Caja Bombones Blancos x12", precio: 14500, img: "Imagenes/Productos_Bombones/Bombones_BlancoX12.png" },
        { nombre: "Caja Bombones Blancos x6", precio: 8200, img: "Imagenes/Productos_Bombones/Bombones_BlancoX6.png" },
        { nombre: "Caja Bombones Amargos x6", precio: 8500, img: "Imagenes/Productos_Bombones/Bombones_AmargosX6.png" },
        
        { nombre: "Alfajor de Mousse (caja x4)", precio: 11800, img: "Imagenes/Productos_Otros/Otros_AlfajoresCaja.png" },
        { nombre: "Alfajor de Mousse (unidad)", precio: 3200, img: "Imagenes/Productos_Otros/Otros_AlfajorUnidad.png" },
        { nombre: "Alfajor de Mousse Blanco", precio: 3500, img: "Imagenes/Productos_Otros/Otros_AlfajorBlanco.png" },
        { nombre: "Cono Relleno (caja x6)", precio: 15500, img: "Imagenes/Productos_Otros/Otros_ConosCaja.png" },
        { nombre: "Cono Relleno (unidad)", precio: 2900, img: "Imagenes/Productos_Otros/Otros_ConoUnidad.png" },
        { nombre: "Cono Relleno Blanco", precio: 3100, img: "Imagenes/Productos_Otros/Otros_ConoBlanco.png" },

    ];

    const productosPromo1 = [
        productos[4],
        productos[5],
        productos[6],
        productos[7],
        productos[9],
        productos[12],
        productos[15],
    ];

    const productosPromo3G1 = [
        productos[13],
        productos[14],
        productos[16],
        productos[17],
    ];

    const productosPromo3G2 = [
        productos[0],
        productos[1],
        productos[2],
        productos[3],
        productos[10],
        productos[11],
        productos[12],
    ];

    const productosPromo3G3 = [
        productos[4], 
        productos[5], 
        productos[6], 
        productos[7],
        productos[8],
        productos[9], 
        productos[15],  
    ];


    // PROMOCIÓN 1 — 70% de descuento en la segunda unidad
    const select1 = document.getElementById("productoSelect");
    const resultado1 = document.getElementById("promoResultado");

    productosPromo1.forEach((p, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `${p.nombre} — $${p.precio.toLocaleString("es-AR")}`;
        select1.appendChild(option);
    });

    select1.addEventListener("change", () => {
        const index = select1.value;
        if (index === "") {
            resultado1.style.display = "none";
            resultado1.innerHTML = "";
            return;
        }

        const producto = productosPromo1[index];
        const precioUnit = producto.precio;
        const precioSinPromo = precioUnit * 2;
        const descuento = precioUnit * 0.7;
        const precioConPromo = precioSinPromo - descuento;

        resultado1.style.display = "block";
        resultado1.innerHTML = `
            <div class="resultado-container">
                <div class="resultado-img">
                    <img src="${producto.img}" alt="${producto.nombre}">
                </div>
                <h3 class="resultado-nombre">${producto.nombre}</h3>
                <p class="resultado-precio">Precio sin promoción (2 unidades): <strong>$${precioSinPromo.toLocaleString("es-AR")}</strong></p>
                <p class="resultado-precio">Precio con promoción: <strong>$${precioConPromo.toLocaleString("es-AR")}</strong></p>
                <p class="resultado-ahorro">Ahorro: $${descuento.toLocaleString("es-AR")}</p>
            </div>
        `;
    });

    // PROMOCIÓN 2 — 10% de descuento en compras > $30.000

    const select2 = document.getElementById("productoSelect2");
    const btnAgregar = document.getElementById("btnAgregarProducto");
    const carritoDiv = document.getElementById("carrito");
    const resultado2 = document.getElementById("resultado2");
    const carrito = [];

    productos.forEach((p, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `${p.nombre} — $${p.precio.toLocaleString("es-AR")}`;
        select2.appendChild(option);
    });

    function renderCarrito() {
        carritoDiv.innerHTML = "";

        if (carrito.length === 0) {
            carritoDiv.innerHTML = "<p>No hay productos en el carrito.</p>";
            resultado2.style.display = "none";
            return;
        }

        const lista = document.createElement("div");
        lista.style.display = "flex";
        lista.style.flexDirection = "column";
        lista.style.gap = "10px";

        let total = 0;

carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const fila = document.createElement("div");
        fila.className = "carrito-item";
        fila.innerHTML = `
            <div class="carrito-info">
                <span class="carrito-nombre">${item.nombre}</span>
                <input type="number" min="1" value="${item.cantidad}" class="carrito-cantidad" id="cant-${index}">
                <span class="carrito-subtotal">$${subtotal.toLocaleString("es-AR")}</span>
                <button class="carrito-eliminar" id="del-${index}">X</button>
            </div>
        `;
        lista.appendChild(fila);
        });

        carritoDiv.appendChild(lista);

        carrito.forEach((_, index) => {
            document.getElementById(`cant-${index}`).addEventListener("input", e => {
                const nuevaCant = parseInt(e.target.value) || 1;
                carrito[index].cantidad = nuevaCant;
                renderCarrito();
                actualizarTotales();
            });

            document.getElementById(`del-${index}`).addEventListener("click", () => {
                carrito.splice(index, 1);
                renderCarrito();
                actualizarTotales();
            });
        });

        actualizarTotales();
    }

    function actualizarTotales() {
        let total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

        if (carrito.length === 0) {
            resultado2.style.display = "none";
            return;
        }

        resultado2.style.display = "block";

        if (total < 30000) {
            const faltante = 30000 - total;
            resultado2.innerHTML = `
            <div class="resultado-container">
                <p class="resultado-precio">
                    Total actual: <strong>$${total.toLocaleString("es-AR")}</strong>
                </p>
                <p class="resultado-precio">
                    Todavía faltan <strong>$${faltante.toLocaleString("es-AR")}</strong> para obtener el 10% de descuento.
                </p>
            </div>
            `;
        } else {
            const descuento = total * 0.1;
        const totalFinal = total - descuento;
        resultado2.innerHTML = `
            <div class="resultado-container">
                <p class="resultado-precio">
                    Total sin descuento: <strong>$${total.toLocaleString("es-AR")}</strong>
                </p>
                <p class="resultado-precio">
                    Descuento aplicado (10%): <strong>$${descuento.toLocaleString("es-AR")}</strong>
                </p>
                <p class="resultado-ahorro">
                    Total final: <strong>$${totalFinal.toLocaleString("es-AR")}</strong>
                </p>
            </div>
            `;
        }
    }

    btnAgregar.addEventListener("click", () => {
        const index = select2.value;
        if (index === "") return;

        const producto = productos[index];
        const existente = carrito.find(p => p.nombre === producto.nombre);
        if (existente) {
            existente.cantidad += 1;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        renderCarrito();
        select2.value = "";
    });


    // PROMOCIÓN 3 — 3 X 2 en productos seleccionados
    const todosGrupos = [...productosPromo3G1, ...productosPromo3G2, ...productosPromo3G3];

    const select3 = document.getElementById("promo3Select");
    const btnAgregar3 = document.getElementById("btnAgregarPromo3");
    const carrito3Div = document.getElementById("promo3Carrito");
    const resultado3 = document.getElementById("promo3Resultado");

    let carrito3 = [];
    let grupoActivo = null; 
    
    function actualizarSelect3() {
        select3.innerHTML = '<option value="">-- Elegí un producto --</option>';

        let opciones;
        if(grupoActivo){
            opciones = grupoActivo.filter(p => !carrito3.includes(p));
        } else {
            opciones = todosGrupos;
        }

        opciones.forEach(p => {
            const option = document.createElement("option");
            option.value = todosGrupos.indexOf(p);
            option.textContent = `${p.nombre} — $${p.precio.toLocaleString("es-AR")}`;
            select3.appendChild(option);
        });
    }

    function renderCarrito3() {
        carrito3Div.innerHTML = "";
        if(carrito3.length === 0){
            grupoActivo = null;
            actualizarSelect3();
            resultado3.innerHTML = "";
            btnAgregar3.disabled = false; // habilitar botón al inicio
            return;
        }
        carrito3.forEach((p, index) => {
            const div = document.createElement("div");
            div.style.display = "inline-block";
            div.style.position = "relative";
             div.style.textAlign = "center"; 
            div.style.marginRight = "10px";

            const img = document.createElement("img");
            img.src = p.img;
            img.alt = p.nombre;
            img.style.height = "120px";
            img.style.borderRadius = "8px";
            div.appendChild(img);

            const precio = document.createElement("p");
            precio.textContent = `$${p.precio.toLocaleString("es-AR")}`;
            precio.style.margin = "5px 0 0 0";
            precio.style.fontWeight = "bold";
            div.appendChild(precio);

            const btn = document.createElement("button");
            btn.textContent = "X";
            btn.style.position = "absolute";
            btn.style.top = "-5px";
            btn.style.right = "-5px";
            btn.style.background = "red";
            btn.style.color = "white";
            btn.style.border = "none";
            btn.style.borderRadius = "50%";
            btn.style.width = "20px";
            btn.style.height = "20px";
            btn.style.cursor = "pointer";

            btn.addEventListener("click", () => {
                carrito3.splice(index, 1);
                renderCarrito3();
            });

            div.appendChild(btn);
            carrito3Div.appendChild(div);
        });

        if(carrito3.length > 0){
            const precios = carrito3.map(p => p.precio).sort((a,b)=>b-a);
            const totalSinDescuento = precios.reduce((a,b)=>a+b,0);
            let totalConDescuento = totalSinDescuento;
            let ahorro = 0;

            if(carrito3.length >= 3){
                totalConDescuento = precios[0] + precios[1];
                ahorro = precios[2];
            }

            resultado3.innerHTML = `
                <p class="resultado-precio">Precio total sin descuento: <strong>$${totalSinDescuento.toLocaleString("es-AR")}</strong></p>
                ${carrito3.length >=3 ? `<p class="resultado-precio">Precio con descuento: <strong>$${totalConDescuento.toLocaleString("es-AR")}</strong></p>
                <p class="resultado-ahorro">Ahorro (producto más barato gratis): <strong>$${ahorro.toLocaleString("es-AR")}</strong></p>` 
                : `<p class="resultado-precio">Agregá ${3 - carrito3.length} producto(s) más para aplicar el 3x2.</p>`}
            `;
        }

        btnAgregar3.disabled = carrito3.length >= 3;

        actualizarSelect3();
    }

    btnAgregar3.addEventListener("click", () => {
        const index = select3.value;
        if(index === "") return;

        const producto = todosGrupos[index];

        if(!grupoActivo){
            if(productosPromo3G1.includes(producto)) grupoActivo = productosPromo3G1;
            else if(productosPromo3G2.includes(producto)) grupoActivo = productosPromo3G2;
            else grupoActivo = productosPromo3G3;
        }

    if(!grupoActivo){
        if(productosPromo3G1.includes(producto)) grupoActivo = productosPromo3G1;
        else if(productosPromo3G2.includes(producto)) grupoActivo = productosPromo3G2;
        else grupoActivo = productosPromo3G3;
    }

    if(!grupoActivo.includes(producto)){
        return;
    }

        carrito3.push(producto);
        renderCarrito3();
    });

    actualizarSelect3();
});

document.querySelectorAll('.promo-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const arrow = header.querySelector('.arrow');

        if(content.style.display === "block"){
            content.style.display = "none";
            arrow.style.transform = "rotate(0deg)";
        } else {
            content.style.display = "block";
            arrow.style.transform = "rotate(180deg)";
        }
    });
});
