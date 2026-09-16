# Respaldo diario local del Sistema Gerencial

La base activa de producción está en el disco persistente de Render. La base
`outputs/sistema-gerencial/sistema-gerencial.db` de esta Mac **no** sustituye
una copia de producción.

## Configuración inicial

1. Ejecutar `python3 scripts/backup_system_daily.py --init-secret` una sola vez.
   Esto crea una clave aleatoria en
   `~/Documents/Codex/Respaldos-Sistema-Gerencial/.backup-token` con permisos
   sólo para el usuario de esta Mac. Nunca agregar esa clave a Git.
2. En el servicio `sistema-gerencial` de Render, abrir **Environment** y crear
   la variable `SYSTEM_BACKUP_TOKEN` con el contenido exacto de ese archivo.
   Puede copiarse temporalmente al portapapeles con:
   `pbcopy < ~/Documents/Codex/Respaldos-Sistema-Gerencial/.backup-token`.
   Elegir **Save only** si el código de respaldo aún no está desplegado; una
   vez desplegado, reiniciar o desplegar el servicio para cargar la variable.
3. Desplegar el código del endpoint de respaldo. Si la variable no existe o
   tiene menos de 32 caracteres, el endpoint responde 503 y no expone datos.
4. Ejecutar `python3 scripts/backup_system_daily.py` y verificar que informe
   una ruta `.zip` y una cantidad positiva de tablas.
5. Sólo después de una primera descarga verificada, activar la tarea diaria.

Cada ZIP contiene una copia consistente de SQLite, los adjuntos de chat aún
vigentes y un manifiesto con la huella SHA-256 de la base. El programa valida
el ZIP, la huella y `PRAGMA integrity_check` antes de conservarlo. Los archivos
se guardan con permisos restringidos en esta Mac. No borra respaldos antiguos
automáticamente y nunca escribe en la base de producción.

Para restaurar, trabajar primero sobre una copia y validar los datos antes de
reemplazar la base activa. No usar la restauración completa del disco de Render
como sustituto de un respaldo consistente de SQLite.
