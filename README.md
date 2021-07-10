# Security System Internet of Things

## Descripción

Aplicación compuesta de una api construida en Node.js, una pequeña aplicación para recibir información de un puerto serial y un frontend básico construido con HTML/CSS/JS.
Permite visualizar los reportes de seguridad creados en el Backend. Estos reportes indican ciertos eventos ocurridos al intentar abrir una puerta (motor servo) mediante el ingreso de una contraseña en un teclado numérico. El circuito que modela el contexto de esta aplicación fue construido usando el simulador Proteus.

Para simular un puerto serial se puede utilizar la aplicación VSPE.

<div align='center'>

![Security System Circuit Proteus](public/securitySystemCircuit.png)
</div>

## Instalación

Instalar aplicación Backend y aplicación Serial (siguiendo pasos de sus respectivos README) y abrir index.html de aplicacion Frontend.

## Licencia

[MIT license](https://opensource.org/licenses/MIT).
