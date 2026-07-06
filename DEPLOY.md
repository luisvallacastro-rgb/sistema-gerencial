# Sistema Gerencial - Despliegue

Flujo recomendado:

1. Subir este proyecto a GitHub.
2. Crear un servicio en Render conectado al repositorio.
3. Render usara `render.yaml` para levantar la app.
4. Cada cambio nuevo se publica con `git push`.

## Base de datos

El servidor usa SQLite y guarda la base en `DATA_DIR`.

En Render, `DATA_DIR` apunta al disco persistente:

```text
/opt/render/project/src/data
```

Esto evita que los usuarios, oportunidades y datos de gestion se pierdan entre despliegues.

## Usuarios iniciales

Usuarios demo disponibles:

- `general`
- `accionistas`
- `comercializacion`
- `financiera`
- `operaciones`
- `rrhh`

Contrasena inicial:

```text
admin123
```
