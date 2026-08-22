# Plan de Implementación: Progress Engine y Seguridad Administrativa

Este documento detalla la reestructuración profunda (Fase de Arquitectura y Auditoría) solicitada. Pasaremos de un modelo de "estado acumulativo" a un modelo robusto de **Event Sourcing**, implementando seguridad real y control total sobre el progreso del estudiante.

## 🎯 Objetivo de la Fase
Garantizar la **integridad, trazabilidad y reconstrucción matemática** del progreso de cada estudiante. Construir un panel administrativo seguro, modular y con capacidades avanzadas de auditoría, gestión de estudiantes, y control dinámico de contenidos.

> [!IMPORTANT]
> **User Review Required**
> Esta es una actualización masiva de la arquitectura. Modificará fundamentalmente cómo la app maneja los XP, los niveles y el estado de la aplicación. Por favor, revisa las **Preguntas Abiertas** antes de proceder.

---

## ❓ Preguntas Abiertas

Para asegurar que la implementación se alinea con tus expectativas, necesito tu dirección en los siguientes puntos:

1. **Infraestructura de Eventos (Event Log):** ¿Prefieres que todo este registro inmutable de eventos (`ProgressEvent`) y el `AdminActionLog` lo construyamos **directamente en Supabase** (implicará que crees nuevas tablas), o empezamos con una arquitectura robusta en `localStorage` (simulando backend) para iterar rápido y lo migramos a Supabase más adelante?
2. **Autorización y Rol de Admin:** Para que el estudiante nunca pueda acceder al panel ni cambiar una variable del frontend, ¿utilizamos los metadatos nativos protegidos de Supabase Auth (`user.user_metadata.role`), o verificamos el rol leyendo de una tabla segura de permisos que el cliente no pueda modificar?
3. **Reglas de Desbloqueo (Prerrequisitos):** ¿El árbol de dependencias (Ej. "Ecuaciones requiere Términos semejantes") se definirá estáticamente en el código (en el archivo `curriculum.ts`), o necesitas que el Administrador pueda **crear y editar estas reglas de dependencia dinámicamente** desde el panel guardándolas en la base de datos?

---

## 🛠 Cambios Arquitectónicos Propuestos

### 1. Seguridad Administrativa (`src/auth/`)
- **Control de Acceso (RBAC):** Refactorizar `types.ts` con `type Role = "student" | "admin"`.
- **Rutas Protegidas:** El `AdminPanelModule` validará el rol desde la capa de datos protegida antes de renderizarse. Cualquier intento de inyección frontend será rechazado.

### 2. Motor de Progreso (`ProgressEngine`) (`src/engine/`)
- **Event Sourcing:** Eliminar mutaciones directas como `xp = xp + 50`. Todo cambio de estado requerirá la emisión de un evento:
  `{ type: 'TRIAL_COMPLETED', timestamp, entityId, metadata }`
- **Reconstrucción:** `ProgressEngine.recalculate(studentId)` leerá todo el historial de eventos del alumno desde el origen de los tiempos para calcular matemáticamente su Nivel, XP exacto y Temas Desbloqueados.
- **Lógica de Racha Restringida:** La racha se calculará agrupando cronológicamente eventos válidos (ej. `SESSION_COMPLETED`, `TRIAL_COMPLETED`). Un inicio de sesión (abrir la app) no generará racha.

### 3. Dashboard Administrativo Expandido
Se dividirá el actual `AdminPanelModule` en sub-módulos para mantener el código limpio:

#### A. Resumen General (`AdminOverview.tsx`)
- Tarjetas de métricas: Total de alumnos, activos, promedio de progreso.
- **Admin Action Log:** Listado de actividad reciente (últimos 5-10 registros visuales).
- **Activity Log de Estudiantes:** Feed con las acciones más recientes de los alumnos.

#### B. Gestión de Estudiantes y Análisis (`AdminStudentsView.tsx`)
- Lista/Tabla responsiva de estudiantes.
- Modal de detalle por estudiante mostrando:
  - Progreso real por módulo (Barra de porcentaje).
  - Estadísticas de Arena (Tasa de éxito, propiedades fallidas, tiempo promedio).
  - **Métrica Anti-Adivinanza:** Score calculado evaluando cambios bruscos de respuesta, rapidez excesiva y uso de "Illegal Moves".

#### C. Auditoría y Control de Integridad (`AdminAuditView.tsx`)
- Herramienta para correr el `Progress Integrity Checker`.
- Listado de Inconsistencias (Ej. XP inflado, dependencias saltadas).
- Botón **[Recalcular y Corregir]** para regenerar el progreso de un estudiante en base a sus eventos puros.

#### D. Gestión de Contenidos (`AdminContentView.tsx`)
- Panel para ver todos los Módulos, Temas y Trials.
- Opciones de bloqueo global (🔒) o disponibilidad (🟢).
- Botón para anular el estado general para un estudiante en particular (Ej. Desbloqueo manual por mérito o castigo).

## Plan de Verificación

### Tests Automatizados
- Unit tests sobre `ProgressEngine.recalculate()` pasando arrays de eventos ficticios para comprobar si el XP resultante y los desbloqueos son los matemáticamente esperados.
- Test de detección de inconsistencias: Generar un estado de XP falso y verificar que el `Integrity Checker` arroja error.

### Verificación Manual
- Acceder como estudiante y comprobar que es **imposible** ver el panel de administración.
- Iniciar un evento de Arena (Trial) como estudiante y luego desde el Panel de Admin verificar que:
  1. El evento apareció en tiempo real.
  2. El XP coincide exactamente con el valor del evento.
  3. Bloquear un tema desde el Panel Admin efectivamente prohíbe el acceso del estudiante a dicho tema.
