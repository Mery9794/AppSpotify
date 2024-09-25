# SpotifyApp

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 17.1.1. La aplicación permite realizar búsquedas de artistas, visualizar detalles de álbumes y canciones utilizando la API de Spotify.

## Funcionalidades del Proyecto

1. **Búsqueda de Artistas:** Puedes buscar cualquier artista a través de la API de Spotify y obtener información detallada como álbumes y canciones.
2. **Detalles de Álbumes y Canciones:** Visualiza la lista de canciones y los detalles de cualquier álbum asociado a un artista seleccionado.
3. **Autenticación mediante API de Spotify:** La autenticación se realiza mediante OAuth 2.0 utilizando Postman para generar tokens de acceso.

## Tecnologías Utilizadas

- **Angular Material:** Para el diseño de la interfaz y los componentes visuales.
- **Spotify API:** Para obtener información sobre artistas, álbumes y canciones.
- **Postman:** Para la autenticación y generación de tokens de acceso API de Spotify.

## Autenticación con Spotify

La autenticación para acceder a la API de Spotify se gestiona mediante **OAuth 2.0**. Utilizamos **Postman** para generar los tokens de acceso que luego son utilizados en las solicitudes HTTP dentro de la aplicación Angular.

### Pasos para la Autenticación en Postman

1. **Obtener Código de Autorización:**
   - Realiza un `GET` con los siguientes parámetros:
     - `client_id`
     - `redirect_uri`
     - `response_type: code`
     - `scope: playlist-modify-public`
   - Esto redirigirá a la página de autorización de Spotify, donde se obtiene un **Código de Autorización** que se deberá usar para obtener el token.

2. **Generar Token de Acceso:**
   - En Postman, se realiza un `POST` al endpoint `https://accounts.spotify.com/api/token` utilizando **OAuth 2.0** como tipo de autenticación.
   - Incluyedo los siguientes parámetros en el cuerpo de la solicitud:
     - `grant_type: authorization_code`
     - `code: [El código de autorización obtenido]`
     - `redirect_uri: [Tu URL de redirección]`
     - `client_id: [Tu client ID]`
     - `client_secret: [Tu client secret]`

3. **Actualizar el Token en la Aplicación:**
   - El token que se obtiene tiene una validez limitada (generalmente una hora).
   - Se debe actualizar el token en el servicio de Angular (spotify.service.ts):

   ```typescript
   private token = 'TOKEN_NUEVO';
