const macOSRenderSafe = /Macintosh|MacIntel|Mac OS X/i.test(`${navigator.platform || ""} ${navigator.userAgent || ""}`);
document.documentElement.classList.toggle("macos-render-safe", macOSRenderSafe);

const systemThemeStorageKey = "kmi-system-theme-v1";

function currentSystemTheme() {
  return localStorage.getItem(systemThemeStorageKey) === "light" ? "light" : "dark";
}

function applySystemTheme(theme) {
  const normalized = theme === "light" ? "light" : "dark";
  localStorage.setItem(systemThemeStorageKey, normalized);
  document.body.classList.toggle("theme-light-active", normalized === "light");
  document.querySelector("#appShell")?.classList.toggle("theme-light", normalized === "light");
  const lightStylesheet = document.querySelector("#lightThemeStylesheet");
  if (lightStylesheet) lightStylesheet.disabled = normalized !== "light";
  const themeSwitch = document.querySelector("#systemThemeSwitch");
  if (themeSwitch) {
    const isLight = normalized === "light";
    themeSwitch.classList.toggle("is-light", isLight);
    themeSwitch.setAttribute("aria-checked", String(isLight));
    themeSwitch.setAttribute("aria-label", isLight ? "Cambiar a tema oscuro" : "Cambiar a tema claro");
    themeSwitch.title = isLight ? "Usar tema oscuro" : "Usar tema claro";
  }
}

applySystemTheme(currentSystemTheme());

const areas = {
  general: {
    label: "Vista ejecutiva",
    nav: "Gerencia general",
    status: "Estable",
    summary: [
      ["Cumplimiento global", "86%", "Meta consolidada de julio"],
      ["KPIs en verde", "14/20", "Indicadores dentro de rango"],
      ["Riesgos altos", "4", "Requieren seguimiento semanal"],
      ["Solicitudes abiertas", "18", "6 pendientes de aprobacion"]
    ],
    results: [
      ["Financiera", 91],
      ["Comercializacion", 83],
      ["Operaciones", 88],
      ["Recursos humanos", 79]
    ],
    kpis: [
      ["Margen operativo", "22.4%", "+2.1% contra junio", "ok"],
      ["Ventas ejecutadas", "$184K", "83% de la meta mensual", "warn"],
      ["Eficiencia operativa", "88%", "Entregas dentro de SLA", "ok"],
      ["Rotacion mensual", "3.8%", "Rango controlado", "ok"]
    ],
    risks: [
      ["Presion de flujo de caja", "Financiera", "Alto", "danger"],
      ["Conversion comercial bajo meta", "Comercializacion", "Medio", "warn"],
      ["Retrasos por proveedor critico", "Operaciones", "Alto", "danger"],
      ["Cobertura de vacantes tecnicas", "RRHH", "Medio", "warn"]
    ],
    requests: [
      ["Aprobacion de ampliacion presupuestaria", "Financiera", "Alta", "Pendiente"],
      ["Campana para clientes corporativos", "Comercializacion", "Media", "En revision"],
      ["Compra de repuestos para mantenimiento", "Operaciones", "Alta", "Aprobado"],
      ["Plan de capacitacion trimestral", "RRHH", "Media", "Pendiente"]
    ]
  },
  financiera: {
    label: "Gerencia financiera",
    nav: "Financiera",
    status: "Controlado",
    submenus: [
      { key: "resultados-cuentas-por-cobrar", label: "Cuentas por cobrar", status: "Cartera, saldos y antigüedad", items: [] },
      { key: "resultados-ordenes-de-pedido", label: "Órdenes de Pedido", status: "Control de producción y entregas", items: [] },
      { key: "riesgos", label: "Riesgos", status: "Sin datos cargados", items: [] },
      { key: "solicitudes", label: "Solicitudes", status: "Sin datos cargados", items: [] }
    ],
    summary: [
      ["Ingresos", "$248K", "91% del presupuesto"],
      ["Gastos", "$174K", "4% debajo del limite"],
      ["Flujo de caja", "$62K", "Proyeccion a 30 dias"],
      ["CxC vencida", "$21K", "12 cuentas prioritarias"]
    ],
    results: [["Ingresos", 91], ["Gastos controlados", 96], ["Cobranza", 82], ["Rentabilidad", 89]],
    kpis: [
      ["Margen neto", "18.7%", "+1.4% mensual", "ok"],
      ["Liquidez", "1.42", "Rango saludable", "ok"],
      ["Cuentas por cobrar", "34 dias", "Meta: 30 dias", "warn"],
      ["Ejecucion presupuestaria", "88%", "Alineada al plan", "ok"]
    ],
    risks: [
      ["Aumento de morosidad en clientes B2B", "Tesoreria", "Alto", "danger"],
      ["Variacion en costos financieros", "Contabilidad", "Medio", "warn"],
      ["Dependencia de cobros de cierre", "Tesoreria", "Medio", "warn"]
    ],
    requests: [
      ["Validar presupuesto de campana Q3", "Comercializacion", "Alta", "Pendiente"],
      ["Conciliacion de pagos operativos", "Operaciones", "Media", "En revision"],
      ["Aprobar plazas presupuestadas", "RRHH", "Media", "Aprobado"]
    ]
  },
  comercializacion: {
    label: "Gerencia de comercializacion",
    nav: "Comercializacion",
    status: "Atencion",
    submenus: [
      {
        key: "crm",
        label: "Oportunidades / Vendedores",
        status: "Operacion comercial",
        items: []
      },
      {
        key: "crm-seguimiento",
        label: "Seguimiento",
        status: "Pipeline por etapa",
        items: []
      },
      {
        key: "crm-clientes",
        label: "Clientes",
        status: "Maestro único de clientes",
        items: []
      },
      {
        key: "resultados-oportunidades",
        label: "Oportunidades / Gerencia",
        status: "Pipeline activo",
        items: []
      },
      {
        key: "autorizacion-pedidos",
        label: "Autorización de pedidos",
        status: "Primer visto bueno",
        items: []
      },
      {
        key: "cotizaciones",
        label: "Cotizaciones / OP",
        status: "Cotizaciones y órdenes de pedido vinculadas",
        items: []
      },
      { key: "resultados-pedidos", label: "Pedidos", status: "Registro comercial de pedidos", items: [] },
      {
        key: "resultados-dashboard",
        label: "Dashboard",
        status: "Acumulado comercial",
        items: []
      },
      {
        key: "kpi",
        label: "KPI de Comercialización",
        status: "Dashboard visual",
        items: []
      },
      {
        key: "riesgos",
        label: "Riesgos",
        status: "Riesgos futuros",
        items: []
      },
      {
        key: "solicitudes",
        label: "Solicitudes",
        status: "Mensajeria gerencial",
        items: []
      }
    ],
    summary: [
      ["Ventas", "$184K", "83% de la meta"],
      ["Clientes nuevos", "42", "+8 contra junio"],
      ["Conversion", "18%", "Meta mensual: 22%"],
      ["Ticket promedio", "$1,240", "+6% mensual"]
    ],
    results: [["Ventas", 83], ["Prospectos", 92], ["Conversion", 74], ["Retencion", 86]],
    kpis: [
      ["Pipeline ponderado", "$390K", "2.1x de cobertura", "ok"],
      ["Conversion comercial", "18%", "4 puntos bajo meta", "warn"],
      ["Retencion", "91%", "Clientes activos", "ok"],
      ["Tiempo de respuesta", "5h", "Meta: 4h", "warn"]
    ],
    risks: [
      ["Baja conversion en segmento empresarial", "Ventas", "Alto", "danger"],
      ["Competencia con descuento agresivo", "Mercadeo", "Medio", "warn"],
      ["Falta de material comercial actualizado", "Mercadeo", "Medio", "warn"]
    ],
    requests: [
      ["Aprobacion de promocion corporativa", "Financiera", "Alta", "Pendiente"],
      ["Disponibilidad para entregas especiales", "Operaciones", "Media", "En revision"],
      ["Contratacion de ejecutivo de cuenta", "RRHH", "Alta", "Pendiente"]
    ]
  },
  operaciones: {
    label: "Gerencia de operaciones",
    nav: "Operaciones",
    status: "Estable",
    submenus: [
      { key: "resultados-control-ventas", label: "Control de Ventas", status: "Órdenes, productos y auditoría", items: [] },
      { key: "produccion-semanal", label: "Producción y Pedidos de la Semana", status: "Agenda semanal de producción", items: [] },
      { key: "riesgos", label: "Riesgos", status: "Sin datos cargados", items: [] },
      { key: "solicitudes", label: "Solicitudes", status: "Sin datos cargados", items: [] }
    ],
    summary: [
      ["Productividad", "88%", "5 puntos sobre junio"],
      ["Entregas a tiempo", "93%", "SLA operativo"],
      ["Incidencias", "17", "-9 mensual"],
      ["Costo por servicio", "$42", "Meta: $39"]
    ],
    results: [["Productividad", 88], ["Entregas", 93], ["Calidad", 90], ["Costo", 78]],
    kpis: [
      ["SLA cumplido", "93%", "Entregas a tiempo", "ok"],
      ["Incidencias abiertas", "17", "5 criticas", "warn"],
      ["Utilizacion de capacidad", "81%", "Rango optimo", "ok"],
      ["Costo unitario", "$42", "8% sobre meta", "warn"]
    ],
    risks: [
      ["Proveedor critico con retrasos", "Abastecimiento", "Alto", "danger"],
      ["Capacidad limitada en horas pico", "Logistica", "Medio", "warn"],
      ["Mantenimiento preventivo acumulado", "Planta", "Medio", "warn"]
    ],
    requests: [
      ["Compra de repuestos prioritarios", "Financiera", "Alta", "Aprobado"],
      ["Forecast de demanda semanal", "Comercializacion", "Media", "Pendiente"],
      ["Turnos temporales para cierre", "RRHH", "Media", "En revision"]
    ]
  },
  rrhh: {
    label: "Gerencia de recursos humanos",
    nav: "Recursos humanos",
    status: "Controlado",
    submenus: [
      { key: "riesgos", label: "Riesgos", status: "Sin datos cargados", items: [] },
      { key: "solicitudes", label: "Solicitudes", status: "Sin datos cargados", items: [] }
    ],
    summary: [
      ["Rotacion", "3.8%", "Dentro de rango"],
      ["Ausentismo", "2.1%", "-0.4 mensual"],
      ["Vacantes", "9", "4 posiciones criticas"],
      ["Capacitaciones", "76%", "Avance trimestral"]
    ],
    results: [["Retencion", 90], ["Clima laboral", 84], ["Capacitacion", 76], ["Cobertura", 81]],
    kpis: [
      ["Rotacion mensual", "3.8%", "Meta menor a 5%", "ok"],
      ["Ausentismo", "2.1%", "Tendencia favorable", "ok"],
      ["Vacantes criticas", "4", "Prioridad de cierre", "warn"],
      ["Horas de capacitacion", "312", "76% del plan", "warn"]
    ],
    risks: [
      ["Demora en contrataciones tecnicas", "Talento", "Alto", "danger"],
      ["Brecha de liderazgo en mandos medios", "Desarrollo", "Medio", "warn"],
      ["Sobrecarga en equipos operativos", "Bienestar", "Medio", "warn"]
    ],
    requests: [
      ["Aprobacion de plazas criticas", "Financiera", "Alta", "Pendiente"],
      ["Plan de incentivos comerciales", "Comercializacion", "Media", "En revision"],
      ["Refuerzo de turnos temporales", "Operaciones", "Media", "Pendiente"]
    ]
  }
};

function currentElSalvadorPeriod() {
  const parts = new Intl.DateTimeFormat("es-SV", {
    timeZone: "America/El_Salvador",
    month: "long",
    year: "numeric"
  }).formatToParts(new Date());
  const month = parts.find((part) => part.type === "month")?.value || "julio";
  const year = parts.find((part) => part.type === "year")?.value || "2026";
  return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${year}`;
}

const state = {
  role: "gerencias",
  currentUser: null,
  activeArea: "comercializacion",
  activeSubmenu: "resultados-oportunidades",
  openMenus: new Set(["comercializacion"]),
  onlineUsers: [],
  opportunityFilter: null,
  opportunityCycleView: "active",
  opportunityMainStatusFilter: "active",
  opportunityMainResultFilter: "pending",
  opportunityPage: 1,
  opportunitySearch: "",
  opportunityClosedDateFrom: "2026-07-01",
  opportunityClosedDateTo: todayISO(),
  opportunityClosedResultFilter: "all",
  opportunityFormContext: "results",
  kpiView: "dashboard",
  kpiSeller: "all",
  adminQuery: "",
  adminSellerQuery: "",
  adminSellerEditingId: "",
  adminSellerNotice: "",
  adminMinuteQuery: "",
  adminMinuteView: "new",
  adminMinuteEditId: "",
  managementRequestAreaKey: "",
  minutes: [],
  operationsPresentationMonth: String(new Date().getMonth() + 1).padStart(2, "0"),
  operationsPresentationYear: String(new Date().getFullYear()),
  operationsPresentationSection: 0,
  financialPresentationSection: 0,
  financialOrders: [],
  financialOrderQuery: "",
  financialOrderPage: 1,
  financialOrderSourceOpportunityId: "",
  financialOrdersView: "list",
  financialOrderYearFilter: "all",
  financialOrderMonthFilter: "all",
  accountsReceivable: [],
  accountsReceivableQuery: "",
  accountsReceivablePage: 1,
  accountsReceivableView: "list",
  accountsReceivableStatus: "pending",
  purchaseOrders: [],
  purchaseOrderQuery: "",
  purchaseOrderPage: 1,
  purchaseOrderView: "list",
  purchaseOrderStatus: "all",
  controlSales: [],
  controlSalesCounts: { orders: 0, details: 0 },
  controlSalesQuery: "",
  controlSalesSeller: "all",
  controlSalesStatus: "active",
  controlSalesDateFrom: "",
  controlSalesDateTo: "",
  controlSalesPeriodYear: String(new Date().getFullYear()),
  controlSalesPeriodMonth: String(new Date().getMonth() + 1).padStart(2, "0"),
  controlSalesSort: "date-desc",
  controlSalesPage: 1,
  productionSchedule: [],
  productionWeekStart: "",
  commercialApprovalQuery: "",
  quotations: [],
  quotationModuleQuery: "",
  quotationModulePage: 1,
  crmData: null,
  crmSellerId: "",
  crmStatusFilter: "Vigente",
  crmSearch: "",
  crmTrackingView: "active",
  crmCustomerSearch: "",
  crmCustomerStatus: "active",
  crmCustomerPage: 1,
  crmWonDateFrom: "",
  crmWonDateTo: "",
  crmOpportunityPage: 1,
  crmOpportunitiesView: "list",
  period: currentElSalvadorPeriod()
};

// El menú es la fuente única del catálogo de permisos. Cualquier gerencia o
// módulo agregado a `areas` aparecerá automáticamente en Administración.
const areaKeys = Object.keys(areas);
const areaOptions = areaKeys;
const adminEmail = "luisvallacastro@gmail.com";
const adminAreaKey = "administracion";
const adminMinutePermissionSections = [
  { key: "actas-nueva", label: "Nueva acta" },
  { key: "actas-historial", label: "Historial de actas" }
];
const adminConsolidatedPermissionSections = [
  { key: "riesgos", label: "Riesgos" },
  { key: "solicitudes", label: "Solicitudes" }
];
const adminManagementPermissionSections = [
  { key: "permisos", label: "Asignación de permisos" },
  { key: "vendedores", label: "Administración de vendedores" }
];
areas[adminAreaKey] = {
  label: "Administracion",
  nav: "Administracion",
  status: "Usuarios",
  submenus: [
    { key: "permisos", label: "Permisos" },
    { key: "vendedores", label: "Vendedores" },
    { key: "actas", label: "Actas" },
    { key: "riesgos", label: "Riesgos", status: "Consolidado de todas las gerencias" },
    { key: "solicitudes", label: "Solicitudes", status: "Consolidado de todas las gerencias" },
    { key: "cambiar-contrasena", label: "Cambiar contraseña" }
  ],
  summary: [],
  results: [],
  kpis: [],
  risks: [],
  requests: []
};
const closureStage = "Cierre de ventas";
const legacyClosureStages = ["Cierre", closureStage];
const opportunityStages = [
  "Prospeccion",
  "Contacto inicial",
  "Deteccion de necesidades",
  "Presentacion de solucion",
  "Manejo de objeciones",
  closureStage,
  "Compilado de informacion",
  "Postventa"
];
const opportunityProbabilities = [
  ["caliente", "🔥 Caliente", "80% o mas"],
  ["tibio", "🌤️ Tibio", "50% a 79%"],
  ["frio", "❄️ Frio", "20% a 49%"],
  ["congelado", "🧊 Congelado", "Menos de 20%"]
];
const opportunitySegments = [
  "Salud",
  "Industria",
  "Educacion / Colegios",
  "Gobierno",
  "Comercio",
  "Servicios",
  "Financiero",
  "Construccion",
  "Hoteleria y restaurantes",
  "Tecnologia",
  "ONG / Fundaciones",
  "Otro"
];

const opportunityLocationsByDepartment = {
  "Ahuachapán": ["Ahuachapán Norte", "Ahuachapán Centro", "Ahuachapán Sur"],
  "Santa Ana": ["Santa Ana Norte", "Santa Ana Centro", "Santa Ana Este", "Santa Ana Oeste"],
  "Sonsonate": ["Sonsonate Norte", "Sonsonate Centro", "Sonsonate Este", "Sonsonate Oeste"],
  "Chalatenango": ["Chalatenango Norte", "Chalatenango Centro", "Chalatenango Sur"],
  "La Libertad": ["La Libertad Norte", "La Libertad Centro", "La Libertad Oeste", "La Libertad Este", "La Libertad Costa", "La Libertad Sur"],
  "San Salvador": ["San Salvador Norte", "San Salvador Oeste", "San Salvador Este", "San Salvador Centro", "San Salvador Sur"],
  "Cuscatlán": ["Cuscatlán Norte", "Cuscatlán Sur"],
  "La Paz": ["La Paz Oeste", "La Paz Centro", "La Paz Este"],
  "Cabañas": ["Cabañas Este", "Cabañas Oeste"],
  "San Vicente": ["San Vicente Norte", "San Vicente Sur"],
  "Usulután": ["Usulután Norte", "Usulután Este", "Usulután Oeste"],
  "San Miguel": ["San Miguel Norte", "San Miguel Centro", "San Miguel Oeste"],
  "Morazán": ["Morazán Norte", "Morazán Sur"],
  "La Unión": ["La Unión Norte", "La Unión Sur"]
};
const commercialSellers = [
  "Gabriela Amador",
  "Jose Amadeo",
  "Vacante",
  "Marco Velado",
  "Marjorie Morales",
  "Odaliz Valencia"
];
const sellerNameMap = {
  "Mariana Lopez": "Gabriela Amador",
  "Carlos Mejia": "Jose Amadeo",
  "Ana Perez": "Marco Velado",
  "Roberto Diaz": "Marjorie Morales",
  "Kevin Hernandez": "Vacante",
  "KEVIN HERNANDEZ": "Vacante"
};
const operationalPlan = [
  { seller: "Gabriela Amador", plan: 184265.02, type: "seller" },
  { seller: "Jose Amadeo", plan: 359706.77, type: "seller" },
  { seller: "Vacante", plan: 178403.85, type: "vacancy", note: "Plaza en busqueda al 03/07/2026" },
  { seller: "Marco Velado", plan: 435818.63, type: "seller" },
  { seller: "Marjorie Morales", plan: 286722.79, type: "seller" },
  { seller: "Odaliz Valencia", plan: 286722.78, type: "seller" },
  { seller: "Online", plan: 0, type: "channel" }
];
const goalsMatrixColumns = ["Fecha", "Gabriela Amador", "Jose Amadeo", "Vacante", "Marco Velado", "Marjorie Morales", "Odaliz Valencia", "Online", "Total"];
const goalsMatrixRows = [
  ["1/1/2026", 17221.71, 54581.59, 15339.37, 37982.95, 17808.52, 25523.54, 0, 168457.68],
  ["1/2/2026", 11987.72, 47648.11, 10677.46, 41465.33, 3449.96, 21488.57, 0, 136717.15],
  ["1/3/2026", 12830.63, 28098.83, 11428.23, 24814.55, 12399.65, 31185.01, 0, 120756.90],
  ["1/4/2026", 11600.63, 7581.99, 10438.88, 58663.48, 14215.98, 12641.87, 0, 115142.83],
  ["1/5/2026", 18372.04, 14478.98, 16532.16, 50469.99, 39957.16, 16844.96, 0, 156655.29],
  ["1/6/2026", 19955.99, 24857.30, 17957.49, 52473.92, 13265.10, 35683.95, 0, 164193.75],
  ["1/7/2026", 20626.83, 30035.52, 21300.95, 37200.56, 26480.87, 38942.17, 0, 174586.90],
  ["1/8/2026", 10828.51, 27118.76, 11182.40, 14328.63, 18119.01, 12987.24, 0, 94564.55],
  ["1/9/2026", 15052.70, 21042.85, 15544.65, 19369.53, 54357.02, 13228.35, 0, 138595.10],
  ["1/10/2026", 11899.22, 18892.43, 12474.59, 45840.20, 23461.44, 9759.00, 0, 122326.88],
  ["1/11/2026", 20673.40, 34146.08, 21673.02, 35340.93, 57193.22, 36111.43, 0, 205138.08],
  ["1/12/2026", 13215.64, 51224.33, 13854.65, 17868.56, 6014.86, 32326.69, 0, 134504.73]
];

const operationsPresentationSections = [
  {
    eyebrow: "Informe Gerencial Mensual de Operaciones",
    title: "Objetivo General",
    body: [
      {
        type: "paragraph",
        text: "Presentar los resultados de la gestion operativa de Konfi Inversiones, S.A. de C.V., mediante indicadores de desempeno, analisis de riesgos y necesidades de la Gerencia de Operaciones, con el proposito de evaluar el cumplimiento de las metas de produccion, calidad, eficiencia y entrega oportuna de los pedidos, contribuyendo a la toma de decisiones estrategicas de la Gerencia General."
      }
    ]
  },
  {
    eyebrow: "Informe Gerencial Mensual de Operaciones",
    title: "Objetivos Especificos",
    body: [
      {
        type: "list",
        items: [
          "Informar los resultados alcanzados en produccion durante el periodo.",
          "Medir el desempeno mediante indicadores de productividad, calidad y cumplimiento.",
          "Identificar riesgos que afecten la operacion.",
          "Presentar acciones de mejora continua.",
          "Solicitar recursos necesarios para garantizar el cumplimiento de las metas."
        ]
      }
    ]
  },
  {
    eyebrow: "A. Resultados",
    title: "Resultados",
    body: [
      {
        type: "paragraph",
        text: "En esta seccion se presentan los principales logros alcanzados durante el mes que sean relevantes."
      },
      {
        type: "list",
        items: [
          "Se confeccionaron 8,450 uniformes durante el mes.",
          "Se entregaron 35 pedidos, de los cuales 34 fueron entregados puntualmente 97 %.",
          "Se redujo el tiempo promedio de produccion de 12 a 10 dias.",
          "Se implemento un nuevo control de calidad en el area de costura.",
          "Se hizo una mejora en los procesos productivos.",
          "Se compraron nuevas herramientas o maquinaria de trabajo.",
          "Se optimizo el flujo entre corte y confeccion, reduciendo tiempos muertos."
        ]
      }
    ]
  },
  {
    eyebrow: "B. KPIs para la Gerencia de Operaciones",
    title: "Indicadores clave de desempeno",
    body: [
      {
        type: "paragraph",
        text: "Estos indicadores utilizados son los que como Gerencia de Operaciones se han considerados que se pueden medir, y que se apegan mas a nuestra forma de trabajar, ya que al ser una planta de confeccion multi estilos, que su produccion cambia segun ordenes de produccion y teniendo en cuenta que cada orden de produccion va personalizada segun las especificaciones del cliente, hay indicadores que se usan en plantas de produccion textil que no pueden ser medidos en nuestra planta."
      },
      {
        type: "cards",
        items: [
          ["Produccion Total del Mes Ano Actual", "Medir el volumen de produccion mensual.", "Total de prendas confeccionadas en el mes.", "Prendas", "Mensual"],
          ["Crecimiento de la Produccion Mensual", "Medir el % de aumento o disminucion versus el ano anterior.", "Produccion actual - produccion anterior / produccion anterior x 100.", "%", "Mensual"],
          ["Horas Extras del Mes", "Controlar el uso de horas extraordinarias.", "Total de horas extras registradas y monto total pagado.", "Horas / USD", "Mensual"],
          ["Comparativo de Horas Extras", "Evaluar la eficiencia en el uso del tiempo extraordinario.", "Horas extras ano actual - ano anterior / ano anterior x 100.", "% y USD", "Mensual"],
          ["Reclamos de Clientes", "Monitorear y reducir reclamos de confeccion, calidad, entrega o servicio.", "Reclamos recibidos / pedidos entregados x 100.", "% y numero", "Mensual"],
          ["Avance del Plan de Operaciones 2026", "Dar seguimiento al cumplimiento del Plan Operativo Anual.", "Actividades ejecutadas / actividades programadas x 100.", "%", "Mensual"]
        ]
      }
    ]
  },
  {
    eyebrow: "C. Riesgos",
    title: "Matriz de riesgos operativos",
    body: [
      {
        type: "paragraph",
        text: "Esta matriz identifica los principales riesgos que pueden afectar afectarnos como empresa de confeccion, el nivel de impacto que tendrian sobre la operacion y las acciones preventivas o de mitigacion para reducir la probabilidad de que ocurran o minimizar sus consecuencias."
      },
      {
        type: "table",
        columns: ["Riesgo", "Impacto", "Accion de mitigacion"],
        rows: [
          ["Retraso en la entrega de tela", "Alto", "Mantener inventario de seguridad y proveedores alternos."],
          ["Ausencia de personal clave", "Medio", "Capacitacion cruzada y plan de reemplazos."],
          ["Averias en maquinaria", "Alto", "Programa de mantenimiento preventivo."],
          ["Incremento inesperado de pedidos", "Alto", "Planificacion de capacidad y contratacion temporal."],
          ["Errores en especificaciones del cliente", "Medio", "Validacion previa mediante ficha tecnica aprobada."],
          ["Retrasos de proveedores", "Alto", "Evaluacion continua de proveedores y diversificacion."],
          ["Reclamos de Clientes Claves", "Alto", "Evaluar una solucion ganar ganar que no afecte la relacion comercial con el cliente."]
        ]
      }
    ]
  },
  {
    eyebrow: "D. Solicitudes",
    title: "Solicitudes operativas",
    body: [
      {
        type: "paragraph",
        text: "Las solicitudes son requerimientos formales que una empresa presenta para obtener los recursos, el personal, los equipos o las herramientas necesarias para mejorar sus procesos y alcanzar sus objetivos."
      },
      {
        type: "paragraph",
        text: "Estas solicitudes deben estar sustentadas con datos objetivos, como indicadores de produccion, niveles de utilizacion de los recursos, incremento en la demanda o resultados de evaluaciones, que demuestren la necesidad de realizar la inversion o el cambio."
      },
      {
        type: "table",
        columns: ["Solicitud", "Justificacion", "Beneficio esperado"],
        rows: [
          ["Adquisicion de una maquina de costura industrial", "La utilizacion de las maquinas actuales supera el 95 %, generando cuellos de botella.", "Incrementar la capacidad de produccion y reducir tiempos de entrega."],
          ["Contratacion de dos operarios", "El volumen de pedidos aumento un 20 % respecto al mes anterior.", "Mejorar el cumplimiento del plan de produccion y disminuir horas extra."],
          ["Implementacion de un sistema de control de produccion", "Actualmente el seguimiento es manual.", "Obtener informacion en tiempo real para una mejor toma de decisiones."]
        ]
      }
    ]
  }
];

const financialPresentationSections = [
  {
    eyebrow: "Informe Gerencial Mensual Financiero",
    title: "Resumen ejecutivo",
    body: [
      { type: "paragraph", text: "Durante el primer semestre de 2026, los ingresos promedio mensuales se mantuvieron practicamente en el mismo nivel que en 2025, registrando un crecimiento marginal del 0.82 %. Esto indica que la capacidad comercial de la empresa se ha mantenido estable." },
      { type: "paragraph", text: "Sin embargo, el incremento en los costos promedio del 8.62 % y en los gastos promedio del 16.64 % absorbio practicamente todo ese crecimiento, reduciendo la utilidad promedio mensual de $13,005 a $6,451, una disminucion del 50.39 %." }
    ]
  },
  {
    eyebrow: "Comparativo primer semestre",
    title: "Rentabilidad afectada",
    body: [
      { type: "table", columns: ["Indicador", "2025", "2026", "Variacion"], rows: [
        ["Ingresos promedio mensuales", "Base 2025", "+0.82 %", "Estable"],
        ["Costos promedio", "Base 2025", "+8.62 %", "Presion al margen"],
        ["Gastos promedio", "Base 2025", "+16.64 %", "Mayor carga operativa"],
        ["Utilidad promedio mensual", "$13,005", "$6,451", "-50.39 %"]
      ] }
    ]
  },
  {
    eyebrow: "Lectura operativa de costos",
    title: "Costo registrado al comprar",
    body: [
      { type: "paragraph", text: "El comportamiento mensual de los costos no refleja necesariamente una perdida de eficiencia operativa, ya que la politica de compras registra el costo en el momento de la adquisicion y no mantiene inventarios en proceso." },
      { type: "list", items: [
        "Algunos meses muestran costos elevados por abastecimiento para periodos posteriores.",
        "Otros meses reflejan costos menores por un menor volumen de compras.",
        "El analisis debe enfocarse en el promedio y el acumulado del semestre."
      ] }
    ]
  },
  {
    eyebrow: "Margenes promedio",
    title: "Indicadores de margen",
    body: [
      { type: "table", columns: ["Indicador", "2025", "2026"], rows: [
        ["Margen bruto", "43.2 %", "38.8 %"],
        ["Gastos sobre ventas", "26.3 %", "30.4 %"],
        ["Margen neto", "16.7 %", "8.2 %"]
      ] },
      { type: "paragraph", text: "Aunque las ventas permanecieron estables, cada dolar facturado dejo una utilidad significativamente menor que en el ano anterior." }
    ]
  },
  {
    eyebrow: "Interpretacion",
    title: "Menor utilidad por cada venta",
    body: [
      { type: "list", items: [
        "En 2025, por cada $100 vendidos, la empresa generaba aproximadamente $16.70 de utilidad.",
        "En 2026, por cada $100 vendidos, genera unicamente $8.20.",
        "Esto evidencia una disminucion importante en la rentabilidad del negocio."
      ] }
    ]
  }
];

const closedSalesActuals = [
  { seller: "Gabriela Amador", month: 1, amount: 2938.01, count: 3 },
  { seller: "Gabriela Amador", month: 2, amount: 3942.22, count: 5 },
  { seller: "Gabriela Amador", month: 3, amount: 2469.57, count: 4 },
  { seller: "Gabriela Amador", month: 4, amount: 3150.00, count: 2 },
  { seller: "Gabriela Amador", month: 5, amount: 11545.32, count: 5 },
  { seller: "Gabriela Amador", month: 6, amount: 3773.50, count: 3 },
  { seller: "Jose Amadeo", month: 1, amount: 74018.69, count: 21 },
  { seller: "Jose Amadeo", month: 2, amount: 46990.36, count: 25 },
  { seller: "Jose Amadeo", month: 3, amount: 39338.92, count: 24 },
  { seller: "Jose Amadeo", month: 4, amount: 13260.99, count: 15 },
  { seller: "Jose Amadeo", month: 5, amount: 9487.48, count: 10 },
  { seller: "Jose Amadeo", month: 6, amount: 55103.10, count: 8 },
  { seller: "Vacante", month: 1, amount: 3591.72, count: 3 },
  { seller: "Vacante", month: 2, amount: 583.08, count: 1 },
  { seller: "Vacante", month: 6, amount: 1592.04, count: 1 },
  { seller: "Marco Velado", month: 1, amount: 18393.58, count: 11 },
  { seller: "Marco Velado", month: 2, amount: 4978.32, count: 6 },
  { seller: "Marco Velado", month: 3, amount: 64917.45, count: 6 },
  { seller: "Marco Velado", month: 4, amount: 41516.85, count: 8 },
  { seller: "Marco Velado", month: 5, amount: 29905.56, count: 5 },
  { seller: "Marco Velado", month: 6, amount: 6783.53, count: 4 },
  { seller: "Marjorie Morales", month: 1, amount: 1556.50, count: 2 },
  { seller: "Marjorie Morales", month: 2, amount: 13136.78, count: 1 },
  { seller: "Marjorie Morales", month: 3, amount: 4042.82, count: 3 },
  { seller: "Marjorie Morales", month: 4, amount: 18284.54, count: 3 },
  { seller: "Marjorie Morales", month: 5, amount: 14981.68, count: 4 },
  { seller: "Marjorie Morales", month: 6, amount: 10344.38, count: 3 },
  { seller: "Odaliz Valencia", month: 1, amount: 26156.84, count: 6 },
  { seller: "Odaliz Valencia", month: 2, amount: 12667.30, count: 11 },
  { seller: "Odaliz Valencia", month: 3, amount: 3406.25, count: 3 },
  { seller: "Odaliz Valencia", month: 4, amount: 13671.89, count: 8 },
  { seller: "Odaliz Valencia", month: 5, amount: 640.00, count: 1 },
  { seller: "Odaliz Valencia", month: 6, amount: 2191.76, count: 1 }
];
const historicalClosedSales = (window.historicalClosedSalesCsv || "")
  .trim()
  .split("\n")
  .filter(Boolean)
  .map((line, index) => {
    const [date, invoice, amount, seller, company] = line.split("|");
    const id = `hist-sale-${index + 1}`;
    return {
      id,
      date,
      time: "17:00",
      company,
      seller,
      stage: closureStage,
      probability: "caliente",
      amount: Number(amount || 0),
      invoice,
      source: "historical",
      managements: [
        {
          id: `${id}-close`,
          date,
          time: "17:00",
          stage: closureStage,
          result: "ganado",
          comment: `Venta historica importada${invoice ? `, documento #${invoice}` : ""}.`
        }
      ]
    };
  });
const opportunitiesStorageKey = "sistemaGerencial.oportunidades.v6";
const usersStorageKey = "sistemaGerencial.usuarios.v2";
const sessionStorageKey = "sistemaGerencial.sesion.v1";
const navigationSessionKey = "sistemaGerencial.navigation.v1";
const minutesStorageKey = "sistemaGerencial.actas.v1";
const strategicRisksStorageKey = "sistemaGerencial.riesgos.v2";
const managementRequestsStorageKey = "sistemaGerencial.solicitudes.v2";
const financialOrdersStorageKey = "sistemaGerencial.pedidosFinancieros.v1";
const financialOrdersSeedVersionKey = "sistemaGerencial.pedidosFinancieros.seedVersion";
const financialOrdersSeedManifestKey = "sistemaGerencial.pedidosFinancieros.seedManifest";
const financialOrdersDeletedSeedKeysKey = "sistemaGerencial.pedidosFinancieros.deletedSeedKeys";
const financialOrdersFiltersStorageKey = "sistemaGerencial.pedidosFinancieros.filters.v1";
const controlSalesPeriodStorageKey = "sistemaGerencial.controlVentas.periodo.v1";
const productionWeekStorageKey = "sistemaGerencial.produccion.semana.v1";
const financialOrdersSeedVersion = "base-pedidos-20260720-v3";
const financialOrdersSeedExpectedCount = 2596;
const legacyStrategicRisksStorageKey = "sistemaGerencial.riesgos.v1";
const legacyManagementRequestsStorageKey = "sistemaGerencial.solicitudes.v1";
const defaultUsers = [
  { id: "user-admin-luis", name: "Luis Valladares", username: "luisvallacastro", email: adminEmail, role: "gerencias", password: "admin123", admin: true },
  { id: "user-general", name: "Gerencia general", username: "general", email: "general@empresa.local", role: "gerencias", password: "admin123" },
  { id: "user-accionistas", name: "Accionistas", username: "accionistas", email: "accionistas@empresa.local", role: "accionistas", password: "admin123" },
  { id: "user-financiera", name: "Gerencia financiera", username: "financiera", email: "financiera@empresa.local", role: "gerencias", password: "admin123" },
  { id: "user-comercial", name: "Gerencia comercializacion", username: "comercializacion", email: "comercializacion@empresa.local", role: "gerencias", password: "admin123" },
  { id: "user-operaciones", name: "Gerencia operaciones", username: "operaciones", email: "operaciones@empresa.local", role: "gerencias", password: "admin123" },
  { id: "user-rrhh", name: "Gerencia recursos humanos", username: "rrhh", email: "rrhh@empresa.local", role: "gerencias", password: "admin123" }
];
const accessRoles = [
  ["gerencias", "Gerencias"],
  ["jefaturas", "Jefaturas"],
  ["operativos", "Operativos"],
  ["accionistas", "Accionistas"]
];
const legacyAccessRoleMap = {
  general: "gerencias",
  comercializacion: "gerencias",
  financiera: "gerencias",
  operaciones: "gerencias",
  rrhh: "gerencias"
};
let systemUsers = [];
let sessionRestored = false;
let presenceTimer = null;
const apiEnabled = window.location.protocol !== "file:";

async function apiJson(path, options = {}) {
  const { headers: optionHeaders = {}, ...requestOptions } = options;
  const response = await fetch(path, {
    ...requestOptions,
    headers: {
      "Content-Type": "application/json",
      "X-System-User-Id": state.currentUser?.id || "",
      ...optionHeaders
    }
  });
  if (!response.ok) {
    let message = `API ${response.status}`;
    try {
      const payload = await response.json();
      message = payload?.error || message;
    } catch {}
    throw new Error(message);
  }
  return response.json();
}

async function loadCrmData() {
  if (!apiEnabled) return null;
  try {
    const data = await apiJson("/api/crm/bootstrap");
    state.crmData = data;
    syncLostCrmOpportunities();
    fillOpportunityOptions();
    if (state.activeArea === adminAreaKey && state.activeSubmenu === "vendedores") renderAdminPanel();
    else if (state.activeArea === "comercializacion" && (
      state.activeSubmenu?.startsWith("crm") || state.activeSubmenu === "cotizaciones"
    )) renderDashboard();
    return data;
  } catch {
    state.crmData = null;
    return null;
  }
}
const defaultStrategicRisks = [];
const defaultManagementRequests = [];
const demoStrategicRiskIds = new Set(["risk-001", "risk-002", "risk-003"]);
const demoManagementRequestIds = new Set(["req-001", "req-002"]);
const defaultOpportunities = [];
const opportunityPageSize = 10;
const crmOpportunityPageSize = 6;
const opportunityManagementPageSize = 6;
const quotationModulePageSize = 8;

const loginView = document.querySelector("#loginView");
const appShell = document.querySelector("#appShell");
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const loginUserSelect = document.querySelector("#loginUserSelect");
const loginPassword = document.querySelector("#loginPassword");
const registerName = document.querySelector("#registerName");
const registerUser = document.querySelector("#registerUser");
const registerEmail = document.querySelector("#registerEmail");
const registerRole = document.querySelector("#registerRole");
const registerPassword = document.querySelector("#registerPassword");
const activeRoleLabel = document.querySelector("#activeRoleLabel");
const activeUserStatus = document.querySelector("#activeUserStatus");
const onlineCount = document.querySelector("#onlineCount");
const presenceList = document.querySelector("#presenceList");
const sidebarToggleBtn = document.querySelector("#sidebarToggleBtn");
const sidebarRestoreBtn = document.querySelector("#sidebarRestoreBtn");
const systemThemeSwitch = document.querySelector("#systemThemeSwitch");
const navList = document.querySelector("#navList");
const dashboard = document.querySelector(".dashboard");
const explicitIPadLayout = /iPad/i.test(navigator.userAgent)
  || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
appShell.classList.toggle("ipad-layout", explicitIPadLayout);
const pageTitle = document.querySelector("#pageTitle");
const periodLabel = document.querySelector("#periodLabel");
const periodSelect = document.querySelector("#periodSelect");
const initialPeriodOption = Array.from(periodSelect.options)
  .find((option) => option.text === state.period);
if (initialPeriodOption) periodSelect.value = initialPeriodOption.value;
const topbarActions = document.querySelector(".topbar-actions");
const minutesTopbarTabs = document.querySelector("#minutesTopbarTabs");
const financialOrdersTopbarFilters = document.querySelector("#financialOrdersTopbarFilters");
const financialOrderYearFilter = document.querySelector("#financialOrderYearFilter");
const financialOrderMonthFilter = document.querySelector("#financialOrderMonthFilter");
const summaryGrid = document.querySelector("#summaryGrid");
const resultsChart = document.querySelector("#resultsChart");
const kpiList = document.querySelector("#kpiList");
const riskList = document.querySelector("#riskList");
const requestTable = document.querySelector("#requestTable");
const commercialPanel = document.querySelector("#commercialPanel");
const commercialSubmenuTitle = document.querySelector("#commercialSubmenuTitle");
const commercialSubmenuStatus = document.querySelector("#commercialSubmenuStatus");
const financialOrdersViewTabs = document.querySelector("#financialOrdersViewTabs");
const financialOrdersNotificationCount = document.querySelector("#financialOrdersNotificationCount");
const accountsReceivableViewTabs = document.querySelector("#accountsReceivableViewTabs");
const purchaseOrdersViewTabs = document.querySelector("#purchaseOrdersViewTabs");
const crmOpportunitiesViewTabs = document.querySelector("#crmOpportunitiesViewTabs");
const crmCancellationDialog = document.querySelector("#crmCancellationDialog");
const crmCancellationForm = document.querySelector("#crmCancellationForm");
const crmCancellationOpportunityId = document.querySelector("#crmCancellationOpportunityId");
const crmCancellationOpportunityLabel = document.querySelector("#crmCancellationOpportunityLabel");
const crmCancellationReason = document.querySelector("#crmCancellationReason");
const closeCrmCancellationDialog = document.querySelector("#closeCrmCancellationDialog");
const cancelCrmCancellation = document.querySelector("#cancelCrmCancellation");
const opportunitySearchField = document.querySelector("#opportunitySearchField");
const opportunitySearchInput = document.querySelector("#opportunitySearchInput");
const opportunityTotalAmount = document.querySelector("#opportunityTotalAmount");
const financialOrderDialog = document.querySelector("#financialOrderDialog");
const financialOrderForm = document.querySelector("#financialOrderForm");
const financialOrderDialogTitle = document.querySelector("#financialOrderDialogTitle");
const financialOrderId = document.querySelector("#financialOrderId");
const closeFinancialOrderDialog = document.querySelector("#closeFinancialOrderDialog");
const cancelFinancialOrder = document.querySelector("#cancelFinancialOrder");
const accountsReceivableDialog = document.querySelector("#accountsReceivableDialog");
const accountsReceivableForm = document.querySelector("#accountsReceivableForm");
const accountsReceivableDialogTitle = document.querySelector("#accountsReceivableDialogTitle");
const accountsReceivableId = document.querySelector("#accountsReceivableId");
const closeAccountsReceivableDialog = document.querySelector("#closeAccountsReceivableDialog");
const cancelAccountsReceivable = document.querySelector("#cancelAccountsReceivable");
const purchaseOrderDialog = document.querySelector("#purchaseOrderDialog");
const purchaseOrderForm = document.querySelector("#purchaseOrderForm");
const purchaseOrderDialogTitle = document.querySelector("#purchaseOrderDialogTitle");
const purchaseOrderDialogContext = document.querySelector("#purchaseOrderDialogContext");
const purchaseOrderId = document.querySelector("#purchaseOrderId");
const closePurchaseOrderDialog = document.querySelector("#closePurchaseOrderDialog");
const cancelPurchaseOrder = document.querySelector("#cancelPurchaseOrder");
const purchaseOrderMonthDialog = document.querySelector("#purchaseOrderMonthDialog");
const purchaseOrderMonthTitle = document.querySelector("#purchaseOrderMonthTitle");
const purchaseOrderMonthSummary = document.querySelector("#purchaseOrderMonthSummary");
const purchaseOrderMonthList = document.querySelector("#purchaseOrderMonthList");
const closePurchaseOrderMonthDialog = document.querySelector("#closePurchaseOrderMonthDialog");
const opportunityDashboard = document.querySelector("#opportunityDashboard");
const newOpportunityBtn = document.querySelector("#newOpportunityBtn");
const newRiskBtn = document.querySelector("#newRiskBtn");
const newManagementRequestBtn = document.querySelector("#newManagementRequestBtn");
const goalsMatrixBtn = document.querySelector("#goalsMatrixBtn");
const opportunityDialog = document.querySelector("#opportunityDialog");
const opportunityForm = document.querySelector("#opportunityForm");
const opportunityDialogTitle = document.querySelector("#opportunityDialogTitle");
const opportunityId = document.querySelector("#opportunityId");
const opportunityCrmSourceId = document.querySelector("#opportunityCrmSourceId");
const opportunityCustomerId = document.querySelector("#opportunityCustomerId");
const opportunityCustomerSearch = document.querySelector("#opportunityCustomerSearch");
const opportunityCustomerToggle = document.querySelector("#opportunityCustomerToggle");
const opportunityCustomerResults = document.querySelector("#opportunityCustomerResults");
const newCustomerFromOpportunity = document.querySelector("#newCustomerFromOpportunity");
const opportunityDate = document.querySelector("#opportunityDate");
const opportunityCompany = document.querySelector("#opportunityCompany");
const opportunitySeller = document.querySelector("#opportunitySeller");
const opportunityContact = document.querySelector("#opportunityContact");
const opportunityPhone = document.querySelector("#opportunityPhone");
const opportunitySegment = document.querySelector("#opportunitySegment");
const opportunityLocation = document.querySelector("#opportunityLocation");
const opportunityStage = document.querySelector("#opportunityStage");
const opportunityPriority = document.querySelector("#opportunityPriority");
const opportunityProbability = document.querySelector("#opportunityProbability");
const opportunityAmount = document.querySelector("#opportunityAmount");
const opportunityNextAction = document.querySelector("#opportunityNextAction");
const opportunityAgendaDate = document.querySelector("#opportunityAgendaDate");
const opportunityAgendaTime = document.querySelector("#opportunityAgendaTime");
const opportunityAgendaType = document.querySelector("#opportunityAgendaType");
const opportunityAgendaPlace = document.querySelector("#opportunityAgendaPlace");
const opportunityNote = document.querySelector("#opportunityNote");
const closeOpportunityDialog = document.querySelector("#closeOpportunityDialog");
const cancelOpportunityEdit = document.querySelector("#cancelOpportunityEdit");
const saveOpportunityBtn = document.querySelector("#saveOpportunityBtn");
const opportunityTable = document.querySelector("#opportunityTable");
const managementDialog = document.querySelector("#managementDialog");
const managementForm = document.querySelector("#managementForm");
const managementDialogTitle = document.querySelector("#managementDialogTitle");
const managementOpportunityId = document.querySelector("#managementOpportunityId");
let managementCrmItem = null;
const managementEditId = document.querySelector("#managementEditId");
const managementEntryEyebrow = document.querySelector("#managementEntryEyebrow");
const managementEntryTitle = document.querySelector("#managementEntryTitle");
const managementSubmitBtn = document.querySelector("#managementSubmitBtn");
const managementTable = document.querySelector("#managementTable");
const managementQuotationCount = document.querySelector("#managementQuotationCount");
const managementQuotationList = document.querySelector("#managementQuotationList");
const sampleCustodyToggle = document.querySelector("#sampleCustodyToggle");
const sampleCustodyPanel = document.querySelector("#sampleCustodyPanel");
const sampleCustodyId = document.querySelector("#sampleCustodyId");
const sampleCustodyQuantity = document.querySelector("#sampleCustodyQuantity");
const sampleCustodySize = document.querySelector("#sampleCustodySize");
const sampleCustodyDescription = document.querySelector("#sampleCustodyDescription");
const sampleCustodyExitDate = document.querySelector("#sampleCustodyExitDate");
const sampleCustodyEntryDate = document.querySelector("#sampleCustodyEntryDate");
const saveSampleCustody = document.querySelector("#saveSampleCustody");
const resetSampleCustody = document.querySelector("#resetSampleCustody");
const closeSampleCustody = document.querySelector("#closeSampleCustody");
const sampleCustodyList = document.querySelector("#sampleCustodyList");
const managementDate = document.querySelector("#managementDate");
const managementStage = document.querySelector("#managementStage");
const managementResultField = document.querySelector("#managementResultField");
const managementResult = document.querySelector("#managementResult");
const managementComment = document.querySelector("#managementComment");
const notifyOperationsBtn = document.querySelector("#notifyOperationsBtn");
const goalsMatrixDialog = document.querySelector("#goalsMatrixDialog");
const goalsMatrixTable = document.querySelector("#goalsMatrixTable");
const closeGoalsMatrixDialog = document.querySelector("#closeGoalsMatrixDialog");
const kpiDetailDialog = document.querySelector("#kpiDetailDialog");
const kpiDetailEyebrow = document.querySelector("#kpiDetailEyebrow");
const kpiDetailTitle = document.querySelector("#kpiDetailTitle");
const kpiDetailSummary = document.querySelector("#kpiDetailSummary");
const kpiDetailReport = document.querySelector("#kpiDetailReport");
const closeKpiDetailDialog = document.querySelector("#closeKpiDetailDialog");
const closeManagementDialog = document.querySelector("#closeManagementDialog");
const cancelManagement = document.querySelector("#cancelManagement");
const overallStatus = document.querySelector("#overallStatus");
const logoutBtn = document.querySelector("#logoutBtn");
const accountPasswordDialog = document.querySelector("#accountPasswordDialog");
const accountPasswordForm = document.querySelector("#accountPasswordForm");
const accountCurrentPassword = document.querySelector("#accountCurrentPassword");
const accountNewPassword = document.querySelector("#accountNewPassword");
const accountConfirmPassword = document.querySelector("#accountConfirmPassword");
const accountPasswordError = document.querySelector("#accountPasswordError");
const closeAccountPasswordDialog = document.querySelector("#closeAccountPasswordDialog");
const cancelAccountPassword = document.querySelector("#cancelAccountPassword");
const exportBtn = document.querySelector("#exportBtn");
const requestDialog = document.querySelector("#requestDialog");
const requestForm = document.querySelector("#requestForm");
const requestArea = document.querySelector("#requestArea");
const requestSubject = document.querySelector("#requestSubject");
const requestPriority = document.querySelector("#requestPriority");
const newRequestBtn = document.querySelector("#newRequestBtn");
const strategicRiskDialog = document.querySelector("#strategicRiskDialog");
const strategicRiskForm = document.querySelector("#strategicRiskForm");
const strategicRiskDate = document.querySelector("#strategicRiskDate");
const strategicRiskText = document.querySelector("#strategicRiskText");
const strategicRiskAffects = document.querySelector("#strategicRiskAffects");
const strategicRiskImpactField = document.querySelector("#strategicRiskImpactField");
const strategicRiskImpactList = document.querySelector("#strategicRiskImpactList");
const closeStrategicRiskDialog = document.querySelector("#closeStrategicRiskDialog");
const cancelStrategicRisk = document.querySelector("#cancelStrategicRisk");
const managementRequestDialog = document.querySelector("#managementRequestDialog");
const managementRequestForm = document.querySelector("#managementRequestForm");
const managementRequestId = document.querySelector("#managementRequestId");
const managementRequestTitle = document.querySelector("#managementRequestTitle");
const managementRequestDate = document.querySelector("#managementRequestDate");
const managementRequestSubject = document.querySelector("#managementRequestSubject");
const managementRequestMessage = document.querySelector("#managementRequestMessage");
const closeManagementRequestDialog = document.querySelector("#closeManagementRequestDialog");
const cancelManagementRequest = document.querySelector("#cancelManagementRequest");
const saveManagementRequestBtn = document.querySelector("#saveManagementRequestBtn");
const adminPanel = document.querySelector("#adminPanel");
const adminUserDialog = document.querySelector("#adminUserDialog");
const adminUserForm = document.querySelector("#adminUserForm");
const adminUserDialogTitle = document.querySelector("#adminUserDialogTitle");
const adminUserId = document.querySelector("#adminUserId");
const adminUserName = document.querySelector("#adminUserName");
const adminUsername = document.querySelector("#adminUsername");
const adminUserEmail = document.querySelector("#adminUserEmail");
const adminUserRole = document.querySelector("#adminUserRole");
const adminUserPassword = document.querySelector("#adminUserPassword");
const adminPermissionGrid = document.querySelector("#adminPermissionGrid");
const closeAdminUserDialog = document.querySelector("#closeAdminUserDialog");
const cancelAdminUser = document.querySelector("#cancelAdminUser");
const adminPasswordDialog = document.querySelector("#adminPasswordDialog");
const adminPasswordForm = document.querySelector("#adminPasswordForm");
const adminPasswordUserId = document.querySelector("#adminPasswordUserId");
const adminPasswordUserLabel = document.querySelector("#adminPasswordUserLabel");
const adminPasswordValue = document.querySelector("#adminPasswordValue");
const closeAdminPasswordDialog = document.querySelector("#closeAdminPasswordDialog");
const cancelAdminPassword = document.querySelector("#cancelAdminPassword");

function normalizeKey(value) {
  return String(value || "").trim().toLowerCase();
}

function searchTokenMatches(value, query) {
  const text = normalizeKey(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const needle = normalizeKey(query).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (!needle || text.includes(needle)) return true;
  const distance = (left, right) => {
    let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
    for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
      const current = [leftIndex];
      for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
        current[rightIndex] = Math.min(
          current[rightIndex - 1] + 1,
          previous[rightIndex] + 1,
          previous[rightIndex - 1] + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1)
        );
      }
      previous = current;
    }
    return previous[right.length];
  };
  const tolerance = needle.length >= 8 ? 2 : 1;
  return text.split(/\s+/).some((word) => distance(word, needle) <= tolerance);
}

function permissionKey(areaKey, sectionKey) {
  return `${areaKey}:${sectionKey}`;
}

function areaPermissionSections(areaKey) {
  return (areas[areaKey]?.submenus || []).filter((section) => !["riesgos", "solicitudes"].includes(section.key));
}

function allPermissionKeys() {
  return [
    ...areaKeys.flatMap((areaKey) => areaPermissionSections(areaKey)
      .map((section) => permissionKey(areaKey, section.key))),
    ...adminManagementPermissionSections.map((section) => permissionKey(adminAreaKey, section.key)),
    ...adminConsolidatedPermissionSections.map((section) => permissionKey(adminAreaKey, section.key)),
    ...adminMinutePermissionSections.map((section) => permissionKey(adminAreaKey, section.key))
  ];
}

function operationalPermissionKeys() {
  return areaKeys.flatMap((areaKey) => areaPermissionSections(areaKey)
    .map((section) => permissionKey(areaKey, section.key)));
}

function defaultPermissionsForRole(role) {
  if (role === "operativos") {
    return ["crm", "crm-seguimiento", "cotizaciones"]
      .map((sectionKey) => permissionKey("comercializacion", sectionKey));
  }
  if (role === "jefaturas") {
    return [
      ...areaPermissionSections("comercializacion")
        .map((section) => permissionKey("comercializacion", section.key)),
      permissionKey("comercializacion", "resultados-pedidos"),
      permissionKey("financiera", "resultados-cuentas-por-cobrar"),
      permissionKey("financiera", "resultados-ordenes-de-pedido"),
      ...adminConsolidatedPermissionSections.map((section) => permissionKey(adminAreaKey, section.key))
    ];
  }
  return role === "gerencias"
    ? allPermissionKeys()
    : [...operationalPermissionKeys(), ...adminConsolidatedPermissionSections.map((section) => permissionKey(adminAreaKey, section.key))];
}

function normalizePermissionList(value, role) {
  const valid = new Set(allPermissionKeys());
  if (!Array.isArray(value)) return defaultPermissionsForRole(role);
  const legacyRisks = value.some((item) => item.endsWith(":riesgos"));
  const legacyRequests = value.some((item) => item.endsWith(":solicitudes"));
  const migrated = [
    ...value,
    ...(value.includes(permissionKey("comercializacion", "resultados"))
      ? [permissionKey("comercializacion", "resultados-oportunidades")]
      : []),
    ...(value.includes(permissionKey("financiera", "resultados-pedidos"))
      ? [permissionKey("comercializacion", "resultados-pedidos")]
      : []),
    ...(value.some((item) => [
      permissionKey("comercializacion", "crm"),
      permissionKey("comercializacion", "crm-seguimiento"),
      permissionKey("comercializacion", "autorizacion-pedidos")
    ].includes(item))
      ? [permissionKey("comercializacion", "cotizaciones")]
      : []),
    ...(legacyRisks ? [permissionKey(adminAreaKey, "riesgos")] : []),
    ...(legacyRequests ? [permissionKey(adminAreaKey, "solicitudes")] : [])
  ];
  const next = migrated.filter((item) => valid.has(item));
  return [...new Set(next)];
}

function isAdminUser(user = state.currentUser) {
  return Boolean(user?.admin) || normalizeKey(user?.email) === adminEmail;
}

function canOpenAdminModule(sectionKey, user = state.currentUser) {
  const username = normalizeKey(user?.username);
  const email = normalizeKey(user?.email);
  if (isAdminUser(user)) return true;
  if (sectionKey === "permisos" && (user?.permissionManager || username === "financiera" || email === "financiera@empresa.local")) return true;
  return new Set(normalizePermissionList(user?.permissions, user?.role)).has(permissionKey(adminAreaKey, sectionKey));
}

function canOpenAdminPermissions(user = state.currentUser) {
  return canOpenAdminModule("permisos", user);
}

function canOpenAdminMinutes(user = state.currentUser) {
  return canCreateAdminMinutes(user) || canViewAdminMinuteHistory(user);
}

function canCreateAdminMinutes(user = state.currentUser) {
  return Boolean(user) && userPermissions(user).has(permissionKey(adminAreaKey, "actas-nueva"));
}

function canViewAdminMinuteHistory(user = state.currentUser) {
  return Boolean(user) && userPermissions(user).has(permissionKey(adminAreaKey, "actas-historial"));
}

function userPermissions(user = state.currentUser) {
  if (!user) return new Set();
  if (isAdminUser(user) || user.role === "gerencias") return new Set(allPermissionKeys());
  return new Set(normalizePermissionList(user.permissions, user.role));
}

function visibleSubmenus(areaKey, user = state.currentUser) {
  const area = areas[areaKey];
  if (!Array.isArray(area?.submenus)) return [];
  if (areaKey === adminAreaKey) {
    return area.submenus.filter((item) => {
      if (item.key === "cambiar-contrasena") return Boolean(user);
      if (item.key === "apariencia") return isAdminUser(user);
      if (item.key === "permisos") return canOpenAdminModule("permisos", user);
      if (item.key === "vendedores") return canOpenAdminModule("vendedores", user);
      if (item.key === "actas") return canOpenAdminMinutes(user);
      if (["riesgos", "solicitudes"].includes(item.key)) {
        return userPermissions(user).has(permissionKey(adminAreaKey, item.key));
      }
      return false;
    });
  }
  const permissions = userPermissions(user);
  return area.submenus.filter((item) => permissions.has(permissionKey(areaKey, item.key)));
}

function fallbackAreaForRole(role) {
  return "comercializacion";
}

function allowedAreas(user = state.currentUser) {
  const visible = areaKeys.filter((areaKey) => visibleSubmenus(areaKey, user).length);
  if (visibleSubmenus(adminAreaKey, user).length) visible.push(adminAreaKey);
  return visible.length ? visible : [fallbackAreaForRole(user?.role || state.role)];
}

function canDeleteOpportunities() {
  const user = state.currentUser;
  if (!user || !user.admin) return false;
  const normalizeIdentity = (value) => String(value || "").trim().toLowerCase();
  return normalizeIdentity(user.username) === "luisvallacastro"
    || normalizeIdentity(user.email) === "luisvallacastro@gmail.com";
}

function isCommercialManagementUser(user = state.currentUser) {
  if (!user) return false;
  const normalizeIdentity = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
  const id = normalizeIdentity(user.id);
  const username = normalizeIdentity(user.username);
  const email = normalizeIdentity(user.email);
  const name = normalizeIdentity(user.name);
  return id === "user-comercial"
    || username === "comercializacion"
    || email === "comercializacion@empresa.local"
    || (name.includes("gerencia") && name.includes("comercial"));
}

function canManageMigratedOpportunityLifecycle() {
  return isAdminUser() || state.role === "gerencias" || isCommercialManagementUser();
}

function crmManagementItem(opportunity) {
  if (!opportunity) return null;
  const gestiones = (crmData().gestiones || []).filter((item) => String(item.opportunityId) === String(opportunity.id));
  return {
    ...opportunity,
    id: `crm-management-${opportunity.id}`,
    crmOpportunityId: opportunity.id,
    company: opportunity.company,
    seller: opportunity.owner?.name || crmOwnerName(opportunity.ownerId),
    stage: crmStageToOpportunityStage(opportunity),
    sampleCustodies: Array.isArray(opportunity.sampleCustodies) ? opportunity.sampleCustodies : [],
    managements: gestiones.map((gestion) => ({
      ...gestion,
      id: gestion.id,
      stage: gestion.stageName || crmStageToOpportunityStage(opportunity),
      comment: gestion.note || gestion.comment || gestion.result || "Gestión registrada."
    }))
  };
}

async function openCrmManagementDialog(opportunityId) {
  const opportunity = crmData().opportunities.find((item) => String(item.id) === String(opportunityId));
  if (!opportunity) return;
  managementCrmItem = crmManagementItem(opportunity);
  await openManagementDialog(managementCrmItem, "crm");
}

async function persistCrmSampleCustodies(item) {
  const opportunity = crmData().opportunities.find((record) => String(record.id) === String(item.crmOpportunityId));
  if (!opportunity) return;
  await crmApi(`/opportunities/${encodeURIComponent(opportunity.id)}`, {
    method: "PATCH",
    body: JSON.stringify({ sampleCustodies: sampleCustodies(item) })
  });
  managementCrmItem = crmManagementItem(crmData().opportunities.find((record) => String(record.id) === String(opportunity.id)) || opportunity);
}

function canCancelManagements() {
  return isAdminUser() || state.role === "gerencias";
}

function canEditManagements() {
  return Boolean(state.currentUser);
}

function roleDisplayName(role = state.role) {
  return accessRoles.find(([key]) => key === role)?.[1] || areas[role]?.nav || "Usuario";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function levelClass(value) {
  if (value < 80) return "danger";
  if (value < 86) return "warn";
  return "";
}

function priorityClass(priority) {
  if (priority === "Alta" || priority === "Alto") return "danger";
  if (priority === "Media" || priority === "Medio") return "warn";
  return "info";
}

function probabilityClass(value) {
  if (value === "caliente") return "danger";
  if (value === "tibio") return "warn";
  if (value === "frio") return "info";
  return "";
}

function probabilityLabel(value) {
  const item = opportunityProbabilities.find(([key]) => key === value);
  return item ? item[1] : value;
}

function formatMoney(value) {
  return new Intl.NumberFormat("es-SV", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(Number(value || 0));
}

function varianceLabel(value) {
  if (value > 0) return `Arriba ${formatMoney(value)}`;
  if (value < 0) return `Faltan ${formatMoney(Math.abs(value))}`;
  return "En meta";
}

function formatDate(value) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function todayISO() {
  const now = new Date();
  return `${now.getFullYear()}-${padded(now.getMonth() + 1)}-${padded(now.getDate())}`;
}

function padded(value) {
  return String(value).padStart(2, "0");
}

function seededTime(index = 0) {
  const hours = [8, 9, 10, 11, 13, 14, 15, 16, 17, 8];
  const minutes = [15, 30, 45, 10, 20, 35, 50, 5, 25, 40];
  return `${padded(hours[index % hours.length])}:${padded(minutes[index % minutes.length])}`;
}

function currentTimeValue() {
  const now = new Date();
  return `${padded(now.getHours())}:${padded(now.getMinutes())}`;
}

function formatTime(value) {
  if (!value) return "";
  const [rawHour, rawMinute = "00"] = String(value).split(":");
  const hour = Number(rawHour);
  const minute = padded(Number(rawMinute));
  const suffix = hour >= 12 ? "pm" : "am";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute} ${suffix}`;
}

function formatDateTime(date, time) {
  return `${formatDate(date)} ${formatTime(time)}`.trim();
}

function isClosureStage(stage) {
  return legacyClosureStages.includes(stage);
}

function normalizeStage(stage) {
  return stage === "Cierre" ? closureStage : stage;
}

function closureResult(item) {
  const managements = Array.isArray(item.managements) ? item.managements : [];
  return [...managements].reverse().find((management) => !management.canceled && isClosureStage(management.stage) && management.result);
}

function hasConvertedQuotationOrder(item) {
  if (!item) return false;
  if (item.orderHandoff?.status === "converted" || item.orderHandoff?.orderId) return true;
  const quotationId = String(item.quotationId || "");
  if (!quotationId) return false;
  const quotation = state.quotations.find((record) => String(record.id || "") === quotationId);
  if (quotation?.convertedOrderId) return true;
  return state.controlSales.some((order) => (
    !order.archived && String(order.sourceQuotationId || "") === quotationId
  ));
}

function isWonPendingOrder(item, result = closureResult(item || {})) {
  return result?.result === "ganado" && !hasConvertedQuotationOrder(item);
}

function syncTrackingWin(item) {
  const result = closureResult(item || {});
  if (result?.result !== "ganado") {
    delete item.trackingWin;
    return;
  }
  item.trackingWin = {
    managementId: result.id || "",
    closedDate: result.date || item.date || todayISO(),
    closedTime: result.time || "",
    createdAt: item.trackingWin?.managementId === result.id
      ? item.trackingWin.createdAt
      : new Date().toISOString()
  };
}

function isLostOpportunity(item) {
  return closureResult(item)?.result === "perdida";
}

function visibleResultOpportunities(items = []) {
  return items.filter((item) => !isLostOpportunity(item));
}

function normalizeBusinessMatch(value) {
  return normalizeKey(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function hasEquivalentFinancialOrder(item, result) {
  const wonDate = Date.parse(`${result?.date || ""}T00:00:00Z`);
  const company = normalizeBusinessMatch(item.company);
  const seller = normalizeBusinessMatch(item.seller);
  if (!company || !seller || !Number.isFinite(wonDate)) return false;

  return state.financialOrders.some((order) => {
    const orderDate = Date.parse(`${order.date || ""}T00:00:00Z`);
    const daysApart = Math.abs(orderDate - wonDate) / 86400000;
    return !order.deleted
      && normalizeBusinessMatch(order.client) === company
      && normalizeBusinessMatch(order.seller) === seller
      && Number.isFinite(daysApart)
      && daysApart <= 7;
  });
}

function pendingWonOrderOpportunities() {
  const convertedOpportunityIds = new Set(
    state.financialOrders.map((order) => order.sourceOpportunityId).filter(Boolean)
  );
  return getOpportunitySubmenu().items.filter((item) => {
    const result = closureResult(item);
    return result?.result === "ganado"
      && item.orderHandoff?.status !== "converted"
      && !convertedOpportunityIds.has(item.id)
      && !hasEquivalentFinancialOrder(item, result);
  });
}

function sumAmounts(items) {
  return items.reduce((sum, item) => sum + Number(item.amount || 0), 0);
}

function groupBy(items, key) {
  return items.reduce((groups, item) => {
    const value = typeof key === "function" ? key(item) : item[key];
    groups[value] = groups[value] || [];
    groups[value].push(item);
    return groups;
  }, {});
}

function planTotal() {
  return operationalPlan.reduce((sum, row) => sum + row.plan, 0);
}

function sellerPlanRows(items) {
  const bySeller = groupBy(items, "seller");
  return operationalPlan.map((planRow) => {
    const sellerItems = bySeller[planRow.seller] || [];
    const actual = sumAmounts(sellerItems);
    const percent = planRow.plan ? Math.round((actual / planRow.plan) * 100) : 0;
    return {
      ...planRow,
      actual,
      count: sellerItems.length,
      percent,
      gap: Math.max(planRow.plan - actual, 0)
    };
  });
}

function sellerPlanAverage(rows) {
  const sellerRows = rows.filter((row) => row.type !== "channel");
  if (!sellerRows.length) return 0;
  return Math.round(sellerRows.reduce((sum, row) => sum + row.percent, 0) / sellerRows.length);
}

function goalsMatrixTotals() {
  return goalsMatrixColumns.map((column, index) => {
    if (index === 0) return "Total";
    return goalsMatrixRows.reduce((sum, row) => sum + Number(row[index] || 0), 0);
  });
}

function activeMonthNumber() {
  const monthMap = {
    Enero: 1,
    Febrero: 2,
    Marzo: 3,
    Abril: 4,
    Mayo: 5,
    Junio: 6,
    Julio: 7,
    Agosto: 8,
    Septiembre: 9,
    Octubre: 10,
    Noviembre: 11,
    Diciembre: 12
  };
  const monthName = state.period.split(" ")[0];
  return monthMap[monthName] || 7;
}

function monthLabel(monthNumber) {
  return [
    "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ][monthNumber] || "";
}

function activePeriodYear() {
  const year = Number(state.period.split(" ")[1]);
  return Number.isFinite(year) ? year : 2026;
}

function activePeriodStart() {
  return `${activePeriodYear()}-${padded(activeMonthNumber())}-01`;
}

function nextPeriodStart() {
  const year = activePeriodYear();
  const month = activeMonthNumber();
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  return `${nextYear}-${padded(nextMonth)}-01`;
}

function opportunityCycleRows(items) {
  const periodStart = activePeriodStart();
  const nextStart = nextPeriodStart();
  const rows = items.map((item) => {
    const result = closureResult(item);
    const isPendingOrder = isWonPendingOrder(item, result);
    const closureDate = result?.date || "";
    const isClosedBeforePeriod = Boolean(result && closureDate < periodStart);
    const isClosedInPeriod = Boolean(result && closureDate >= periodStart && closureDate < nextStart);
    const isFuture = item.date >= nextStart;
    return {
      item,
      result,
      isHistory: Boolean(result) && !isPendingOrder,
      isPendingOrder,
      isInherited: item.date < periodStart && !isClosedBeforePeriod,
      isClosedInPeriod,
      isFuture
    };
  });
  const importedHistoryRows = historicalClosedSales
    .filter((item) => item.date < periodStart)
    .map((item) => ({
      item,
      result: closureResult(item),
      isHistory: true,
      isInherited: false,
      isClosedInPeriod: false,
      isFuture: false,
      isImportedHistory: true
    }));

  const sortRows = (a, b) => {
    if (a.isInherited !== b.isInherited) return a.isInherited ? -1 : 1;
    return `${a.item.date} ${a.item.time || ""}`.localeCompare(`${b.item.date} ${b.item.time || ""}`);
  };

  return {
    // Una oportunidad vigente siempre debe ser localizable en Gerencia. El
    // periodo limita métricas y cierres, pero nunca oculta el pipeline activo.
    active: rows.filter((row) => !row.result || row.isPendingOrder).sort(sortRows),
    history: [
      ...rows.filter((row) => row.isHistory && !row.isFuture),
      ...importedHistoryRows
    ].sort((a, b) => `${b.result.date} ${b.result.time || ""}`.localeCompare(`${a.result.date} ${a.result.time || ""}`))
  };
}

function matrixRowForMonth(monthNumber) {
  return goalsMatrixRows.find((row) => Number(row[0].split("/")[1]) === monthNumber) || goalsMatrixRows[0];
}

function monthlyGoalForSeller(seller, monthNumber) {
  const columnIndex = goalsMatrixColumns.indexOf(seller);
  const monthRow = matrixRowForMonth(monthNumber);
  return columnIndex >= 0 ? Number(monthRow[columnIndex] || 0) : 0;
}

function cumulativeGoalForSeller(seller, monthNumber) {
  const columnIndex = goalsMatrixColumns.indexOf(seller);
  if (columnIndex < 0) return 0;
  return goalsMatrixRows
    .filter((row) => Number(row[0].split("/")[1]) <= monthNumber)
    .reduce((sum, row) => sum + Number(row[columnIndex] || 0), 0);
}

function finalGoalForSeller(seller) {
  const columnIndex = goalsMatrixColumns.indexOf(seller);
  if (columnIndex < 0) return 0;
  return goalsMatrixRows.reduce((sum, row) => sum + Number(row[columnIndex] || 0), 0);
}

function cumulativeGlobalGoal(monthNumber) {
  const totalIndex = goalsMatrixColumns.indexOf("Total");
  return goalsMatrixRows
    .filter((row) => Number(row[0].split("/")[1]) <= monthNumber)
    .reduce((sum, row) => sum + Number(row[totalIndex] || 0), 0);
}

function periodStartForMonth(monthNumber) {
  return `${activePeriodYear()}-${padded(monthNumber)}-01`;
}

function nextStartForMonth(monthNumber) {
  const nextMonth = monthNumber === 12 ? 1 : monthNumber + 1;
  const nextYear = monthNumber === 12 ? activePeriodYear() + 1 : activePeriodYear();
  return `${nextYear}-${padded(nextMonth)}-01`;
}

function cumulativeGlobalActual(items, monthNumber = activeMonthNumber()) {
  const nextStart = nextStartForMonth(monthNumber);
  const appOpportunityStart = "2026-07-01";
  const historicalAmount = historicalClosedSales
    .filter((item) => item.date < nextStart)
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const appWonAmount = items
    .map((item) => ({ item, result: closureResult(item) }))
    .filter(({ result }) => result?.result === "ganado" && result.date >= appOpportunityStart && result.date < nextStart)
    .reduce((sum, { item }) => sum + Number(item.amount || 0), 0);
  return {
    historicalAmount,
    appWonAmount,
    amount: historicalAmount + appWonAmount
  };
}

function dateMonthNumber(value) {
  if (!value) return activeMonthNumber();
  if (value.includes("-")) return Number(value.split("-")[1]);
  return Number(value.split("/")[1]);
}

function dateYearNumber(value) {
  if (!value) return activePeriodYear();
  if (value.includes("-")) return Number(value.split("-")[0]);
  return Number(value.split("/")[2]);
}

function isThroughActivePeriod(value) {
  return dateYearNumber(value) === activePeriodYear() && dateMonthNumber(value) <= activeMonthNumber();
}

function actualClosedSalesForSeller(seller, monthNumber) {
  return closedSalesActuals
    .filter((row) => row.seller === seller && row.month <= monthNumber)
    .reduce((summary, row) => ({
      amount: summary.amount + Number(row.amount || 0),
      count: summary.count + Number(row.count || 0)
    }), { amount: 0, count: 0 });
}

function actualClosedRowsForSeller(seller, monthNumber) {
  return closedSalesActuals.filter((row) => row.seller === seller && row.month <= monthNumber);
}

function historicalClosedRowsForSeller(seller, monthNumber) {
  return historicalClosedSales
    .filter((item) => item.seller === seller && dateMonthNumber(item.date) <= monthNumber)
    .sort((a, b) => `${b.date} ${b.invoice || ""}`.localeCompare(`${a.date} ${a.invoice || ""}`));
}

function wonClosure(item) {
  const result = closureResult(item);
  if (result?.result !== "ganado") return null;
  return result;
}

function wonSalesFulfillmentRows(items) {
  const monthNumber = activeMonthNumber();
  const historicalMonthNumber = Math.max(Math.min(monthNumber - 1, 6), 0);
  const accumulatedItems = opportunityCycleRows(items).active.map(({ item }) => item);
  const closedItems = items
    .map((item) => ({ item, result: closureResult(item) }))
    .filter(({ item, result }) => result
      && dateYearNumber(result.date || item.date) === activePeriodYear()
      && dateMonthNumber(result.date || item.date) === monthNumber);
  const wonItems = closedItems.filter(({ result }) => result.result === "ganado").map(({ item }) => item);
  const wonItemsToDate = items
    .map((item) => ({ item, result: closureResult(item) }))
    .filter(({ result }) => result?.result === "ganado"
      && dateYearNumber(result.date) === activePeriodYear()
      && dateMonthNumber(result.date) <= monthNumber)
    .map(({ item }) => item);
  const lostItems = closedItems.filter(({ result }) => result.result === "perdida").map(({ item }) => item);
  const allBySeller = groupBy(accumulatedItems, "seller");
  const wonBySeller = groupBy(wonItems, "seller");
  const lostBySeller = groupBy(lostItems, "seller");

  return commercialSellerNames({ includeInactive: true }).map((seller) => {
    const sellerItems = allBySeller[seller] || [];
    const sellerWonItems = wonBySeller[seller] || [];
    const sellerLostItems = lostBySeller[seller] || [];
    const historicalSales = actualClosedSalesForSeller(seller, historicalMonthNumber);
    const sales = historicalSales.amount + sumAmounts(wonItemsToDate.filter((item) => item.seller === seller));
    const wonCount = sellerWonItems.length;
    const opportunityCount = sellerItems.length;
    const goal = finalGoalForSeller(seller);
    const percent = goal ? Math.round((sales / goal) * 100) : 0;
    const variance = sales - goal;
    return {
      seller,
      goal,
      sales,
      variance,
      percent,
      opportunityCount,
      wonCount,
      historicalOpportunityCount: historicalSales.count,
      historicalWonCount: historicalSales.count,
      historicalAmount: historicalSales.amount,
      lostCount: sellerLostItems.length,
      historicalCount: historicalSales.count,
      count: wonCount,
      gap: Math.max(goal - sales, 0)
    };
  });
}

function kpiMonthItems(items) {
  return opportunityCycleRows(items).active.map(({ item }) => item);
}

function kpiDetailItems(items, seller, category) {
  return kpiMonthItems(items)
    .filter((item) => item.seller === seller)
    .filter((item) => {
      const result = closureResult(item);
      if (category === "won") return result?.result === "ganado";
      if (category === "lost") return result?.result === "perdida";
      if (category === "pending") return !result;
      if (category === "historical") return false;
      return true;
    });
}

function kpiDetailLabel(category) {
  return {
    all: "Oportunidades",
    won: "Ganadas",
    lost: "Perdidas",
    pending: "Pendientes",
    historical: "Historico"
  }[category] || "Oportunidades";
}

function managementResultTag(management) {
  if (management.canceled) return `<span class="tag danger">Anulada</span>`;
  if (management.notified) return `<span class="tag notice">Notificado</span>`;
  if (!management.result) return "<span></span>";
  const label = management.result === "ganado" ? "Ganado" : management.result === "anulada" ? "Anulada" : "Perdida";
  return `<span class="tag ${management.result === "ganado" ? "" : "danger"}">${label}</span>`;
}

function renderKpiDetailReport(seller, category) {
  kpiDetailDialog.classList.remove("financial-seller-dialog");
  const submenu = getOpportunitySubmenu();
  const label = kpiDetailLabel(category);
  const historicalMonthNumber = Math.max(Math.min(activeMonthNumber() - 1, 6), 0);
  const isHistorical = category === "historical";
  const items = isHistorical ? [] : kpiDetailItems(submenu.items, seller, category);
  const historicalRows = isHistorical
    ? historicalClosedRowsForSeller(seller, historicalMonthNumber)
    : [];
  const detailCount = isHistorical ? historicalRows.length : items.length;
  const detailAmount = isHistorical
    ? historicalRows.reduce((sum, item) => sum + Number(item.amount || 0), 0)
    : sumAmounts(items);
  const periodLabel = isHistorical
    ? `Enero a ${monthLabel(historicalMonthNumber)} ${activePeriodYear()}`
    : state.period;

  kpiDetailEyebrow.textContent = `KPI / ${label}`;
  kpiDetailTitle.textContent = `${seller} - ${label}`;
  kpiDetailSummary.classList.remove("tabbed");
  kpiDetailSummary.innerHTML = `
    <article>
      <span>Registros</span>
      <strong>${detailCount}</strong>
    </article>
    <article>
      <span>Monto</span>
      <strong>${formatMoney(detailAmount)}</strong>
    </article>
    <article>
      <span>Periodo</span>
      <strong>${periodLabel}</strong>
    </article>
  `;

  if (isHistorical) {
    kpiDetailReport.innerHTML = `
      <section class="kpi-report-section kpi-clean-detail">
        <div class="kpi-report-section-head">
          <div>
            <span>Detalle de registros</span>
            <strong>Ventas enero-junio que justifican el conteo</strong>
          </div>
          <strong>${detailCount} registros / ${formatMoney(detailAmount)}</strong>
        </div>
        ${historicalRows.length ? `
          <div class="kpi-sales-table modern-detail-table">
            <div class="kpi-sale-row kpi-sale-header">
              <strong>Fecha</strong>
              <strong>Empresa</strong>
              <strong>Documento</strong>
              <strong>Monto</strong>
            </div>
            ${historicalRows.map((item) => `
              <div class="kpi-sale-row">
                <span>${formatDate(item.date)}</span>
                <strong>${item.company}</strong>
                <span>${item.invoice || "—"}</span>
                <strong>${formatMoney(item.amount)}</strong>
              </div>
            `).join("")}
          </div>
        ` : `<div class="empty-state">No hay registros para ${seller} en enero-junio.</div>`}
      </section>
    `;
    kpiDetailDialog.showModal();
    return;
  }

  kpiDetailReport.innerHTML = `
    <section class="kpi-report-section kpi-clean-detail">
      <div class="kpi-report-section-head">
        <div>
          <span>Detalle de gestiones</span>
          <strong>Registros que cuadran con el conteo seleccionado</strong>
        </div>
        <strong>${detailCount} registros / ${formatMoney(detailAmount)}</strong>
      </div>
      ${items.length ? items.map((item) => {
        const managements = normalizeManagements(item)
          .slice()
          .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
        const result = closureResult(item);
        const latest = managements[managements.length - 1];
        return `
          <article class="kpi-report-card kpi-clean-card">
            <div class="kpi-report-head">
              <div>
                <strong>${item.company}</strong>
                <span>${item.seller} / ${formatMoney(item.amount)}</span>
              </div>
              <div class="kpi-report-tags">
                <span class="tag ${probabilityClass(item.probability)}">${probabilityLabel(item.probability)}</span>
                ${result ? `<span class="tag ${result.result === "ganado" ? "" : "danger"}">${result.result === "ganado" ? "Ganada" : "Perdida"}</span>` : `<span class="tag warn">Vigente</span>`}
              </div>
            </div>
            <div class="kpi-report-meta">
              <span><small>Ingreso</small><strong>${formatDateTime(item.date, item.time)}</strong></span>
              <span><small>Etapa actual</small><strong>${item.stage}</strong></span>
              <span><small>Ultima gestion</small><strong>${latest ? formatDateTime(latest.date, latest.time) : formatDateTime(item.date, item.time)}</strong></span>
            </div>
            <div class="kpi-history clean-history">
              ${managements.length ? managements.map((management) => `
                <div class="kpi-history-item">
                  <span class="kpi-history-date">
                    <strong>${formatDate(management.date)}</strong>
                    <small>${formatTime(management.time)}</small>
                  </span>
                  <span class="tag info">${management.stage}</span>
                  ${managementResultTag(management)}
                  <p>${management.comment || "Sin comentario registrado."}</p>
                </div>
              `).join("") : `
                <div class="kpi-history-item">
                  <span class="kpi-history-date">
                    <strong>${formatDate(item.date)}</strong>
                    <small>${formatTime(item.time)}</small>
                  </span>
                  <span class="tag info">${item.stage}</span>
                  <span></span>
                  <p>${item.note || "Oportunidad registrada sin gestiones adicionales."}</p>
                </div>
              `}
            </div>
          </article>
        `;
      }).join("") : `<div class="empty-state">No hay registros para ${seller} en ${label}.</div>`}
    </section>
  `;

  kpiDetailDialog.showModal();
}

function getOpportunitySubmenu() {
  return areas.comercializacion.submenus.find((item) => item.key === "resultados-oportunidades");
}

function getAreaSubmenu(areaKey, submenuKey) {
  const area = areas[areaKey];
  return Array.isArray(area?.submenus)
    ? area.submenus.find((item) => item.key === submenuKey)
    : null;
}

function getStrategicRiskSubmenu(areaKey = state.activeArea) {
  if (areaKey === adminAreaKey) return getAreaSubmenu("comercializacion", "riesgos");
  return getAreaSubmenu(areaKey, "riesgos") || getAreaSubmenu("comercializacion", "riesgos");
}

function getManagementRequestSubmenu(areaKey = state.activeArea) {
  if (areaKey === adminAreaKey) return getAreaSubmenu("comercializacion", "solicitudes");
  return getAreaSubmenu(areaKey, "solicitudes") || getAreaSubmenu("comercializacion", "solicitudes");
}

function submenuItemsByArea(submenuKey) {
  return Object.fromEntries(areaKeys.map((areaKey) => [
    areaKey,
    getAreaSubmenu(areaKey, submenuKey)?.items || []
  ]));
}

function allSubmenuItems(submenuKey) {
  return areaKeys.flatMap((areaKey) =>
    (getAreaSubmenu(areaKey, submenuKey)?.items || []).map((item) => ({ ...item, areaKey }))
  );
}

function recordsStoreHasItems(store) {
  return areaKeys.some((areaKey) => Array.isArray(store?.[areaKey]) && store[areaKey].length);
}

function mergeRecordsByArea(remote, local, normalizer) {
  return Object.fromEntries(areaKeys.map((areaKey) => {
    const byId = new Map();
    [...(Array.isArray(remote?.[areaKey]) ? remote[areaKey] : []), ...(Array.isArray(local?.[areaKey]) ? local[areaKey] : [])]
      .forEach((item, index) => byId.set(item.id || `${areaKey}-${index}`, item));
    return [areaKey, normalizer([...byId.values()], areaKey)];
  }));
}

function visibleStrategicRiskItems() {
  return allSubmenuItems("riesgos");
}

function visibleManagementRequestItems() {
  return allSubmenuItems("solicitudes");
}

function findManagementRequestSubmenu(areaKey = state.activeArea) {
  return getManagementRequestSubmenu(areaKey);
}

function legacyRecordsByArea(storageKey, demoIds) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (!Array.isArray(saved)) return {};
    const records = saved.filter((item) => !demoIds.has(item?.id));
    return records.length ? { comercializacion: records } : {};
  } catch {
    return {};
  }
}

function normalizeStrategicRisks(items, areaKey = state.activeArea) {
  return items.map((item, index) => ({
    id: item.id || `risk-${index + 1}`,
    date: item.date || todayISO(),
    owner: item.owner || areas[areaKey]?.nav || areas[state.role]?.nav || "Gerencia general",
    risk: item.risk || "",
    affectsOthers: Boolean(item.affectsOthers),
    involved: Array.isArray(item.involved) ? item.involved : [],
    status: item.status || "Notificado",
    responses: Array.isArray(item.responses) ? item.responses : []
  }));
}

function loadStrategicRisks() {
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(strategicRisksStorageKey) || "null");
  } catch {
    saved = null;
  }
  if (!saved) saved = legacyRecordsByArea(legacyStrategicRisksStorageKey, demoStrategicRiskIds);
  areaKeys.forEach((areaKey) => {
    const source = Array.isArray(saved?.[areaKey]) ? saved[areaKey] : defaultStrategicRisks;
    getStrategicRiskSubmenu(areaKey).items = normalizeStrategicRisks(source, areaKey);
  });
  saveStrategicRisks({ sync: false });

  if (apiEnabled) {
    const localStore = submenuItemsByArea("riesgos");
    apiJson("/api/strategic-risks")
      .then((remote) => {
        const merged = mergeRecordsByArea(remote || {}, localStore, normalizeStrategicRisks);
        areaKeys.forEach((areaKey) => getStrategicRiskSubmenu(areaKey).items = merged[areaKey]);
        localStorage.setItem(strategicRisksStorageKey, JSON.stringify(merged));
        saveStrategicRisks();
        if (!appShell.classList.contains("hidden")) renderDashboard();
      })
      .catch(() => {});
  }
}

function saveStrategicRisks(options = {}) {
  const payload = submenuItemsByArea("riesgos");
  localStorage.setItem(strategicRisksStorageKey, JSON.stringify(payload));
  if (apiEnabled && options.sync !== false) {
    apiJson("/api/strategic-risks", { method: "PUT", body: JSON.stringify(payload) }).catch(() => {});
  }
}

function normalizeManagementRequests(items, areaKey = state.activeArea) {
  return items.map((item, index) => ({
    id: item.id || `req-${index + 1}`,
    date: item.date || todayISO(),
    owner: item.owner || areas[areaKey]?.nav || currentRequestOwner(),
    target: item.target || "Gerencia general",
    subject: item.subject || "",
    message: item.message || "",
    status: item.status || "Enviada",
    response: item.response || "",
    sourceRiskId: item.sourceRiskId || ""
  }));
}

function loadManagementRequests() {
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(managementRequestsStorageKey) || "null");
  } catch {
    saved = null;
  }
  if (!saved) saved = legacyRecordsByArea(legacyManagementRequestsStorageKey, demoManagementRequestIds);
  areaKeys.forEach((areaKey) => {
    const source = Array.isArray(saved?.[areaKey]) ? saved[areaKey] : defaultManagementRequests;
    getManagementRequestSubmenu(areaKey).items = normalizeManagementRequests(source, areaKey);
  });
  saveManagementRequests({ sync: false });

  if (apiEnabled) {
    const localStore = submenuItemsByArea("solicitudes");
    apiJson("/api/management-requests")
      .then((remote) => {
        const merged = mergeRecordsByArea(remote || {}, localStore, normalizeManagementRequests);
        areaKeys.forEach((areaKey) => getManagementRequestSubmenu(areaKey).items = merged[areaKey]);
        localStorage.setItem(managementRequestsStorageKey, JSON.stringify(merged));
        saveManagementRequests();
        if (!appShell.classList.contains("hidden")) renderDashboard();
      })
      .catch(() => {});
  }
}

function saveManagementRequests(options = {}) {
  const payload = submenuItemsByArea("solicitudes");
  localStorage.setItem(managementRequestsStorageKey, JSON.stringify(payload));
  if (apiEnabled && options.sync !== false) {
    apiJson("/api/management-requests", { method: "PUT", body: JSON.stringify(payload) }).catch(() => {});
  }
}

function resetManagementRequestForm() {
  managementRequestForm.reset();
  managementRequestId.value = "";
  state.managementRequestAreaKey = "";
  managementRequestDate.value = todayISO();
  managementRequestTitle.textContent = "Nueva solicitud";
  saveManagementRequestBtn.textContent = "Enviar solicitud";
}

function loadOpportunities() {
  try {
    const saved = JSON.parse(localStorage.getItem(opportunitiesStorageKey) || "null");
    getOpportunitySubmenu().items = sanitizeTestOpportunities(
      Array.isArray(saved) ? normalizeOpportunities(saved) : normalizeOpportunities(defaultOpportunities)
    );
  } catch {
    getOpportunitySubmenu().items = sanitizeTestOpportunities(normalizeOpportunities(defaultOpportunities));
  }
  localStorage.setItem(opportunitiesStorageKey, JSON.stringify(getOpportunitySubmenu().items));
  if (apiEnabled) {
    apiJson("/api/opportunities")
      .then((items) => {
        getOpportunitySubmenu().items = sanitizeTestOpportunities(normalizeOpportunities(Array.isArray(items) ? items : []));
        localStorage.setItem(opportunitiesStorageKey, JSON.stringify(getOpportunitySubmenu().items));
        if (!appShell.classList.contains("hidden")) renderDashboard();
      })
      .catch(() => {});
  }
}

function normalizeOpportunities(items) {
  const sellers = commercialSellerNames({ includeInactive: true });
  return items.map((item, index) => ({
    ...item,
    time: item.time || seededTime(index),
    seller: normalizeSeller(item.seller || sellers[index % sellers.length]),
    stage: normalizeStage(item.stage || "Prospeccion"),
    contact: item.contact || "",
    phone: item.phone || "",
    segment: item.segment || "",
    location: item.location || "",
    priority: item.priority || "Media",
    nextAction: item.nextAction || "Primer seguimiento",
    agendaDate: item.agendaDate || item.date || todayISO(),
    agendaTime: item.agendaTime || "",
    agendaType: item.agendaType || "Seguimiento",
    agendaPlace: item.agendaPlace || "Por definir",
    note: item.note || item.comment || "",
    crmOpportunityId: item.crmOpportunityId || "",
    sampleCustodies: Array.isArray(item.sampleCustodies) ? item.sampleCustodies.map((custody) => ({
      id: custody.id || crypto.randomUUID(),
      quantity: Math.max(1, Number(custody.quantity || 1)),
      size: custody.size || "",
      description: custody.description || "",
      exitDate: custody.exitDate || item.date || todayISO(),
      entryDate: custody.entryDate || ""
    })) : [],
    managements: normalizeManagements({ ...item, time: item.time || seededTime(index) })
  }));
}

function normalizeSeller(name) {
  return sellerNameMap[name] || name || commercialSellerNames()[0] || "Sin vendedor";
}

function normalizeManagements(item) {
  if (Array.isArray(item.managements) && item.managements.length) {
    return item.managements.map((management, index) => ({
      ...management,
      stage: normalizeStage(management.stage),
      time: management.time || seededTime(index + 1),
      canceled: Boolean(management.canceled),
      canceledAt: management.canceledAt || "",
      canceledBy: management.canceledBy || "",
      cancelReason: management.cancelReason || ""
    }));
  }
  return [{
    id: `${item.id}-mgmt-001`,
    date: item.date,
    time: item.time || seededTime(0),
    stage: "Prospeccion",
    comment: "Ingreso inicial de la oportunidad."
  }];
}

function addMinutesToTime(time, minutesToAdd) {
  const [rawHour = "0", rawMinute = "0"] = String(time || "08:00").split(":");
  const total = Number(rawHour) * 60 + Number(rawMinute) + minutesToAdd;
  const hour = Math.floor((total % 1440) / 60);
  const minute = total % 60;
  return `${padded(hour)}:${padded(minute)}`;
}

function orderedManagements(managements) {
  return [...managements].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
}

function notifiedDemoManagements(item) {
  return [
    {
      id: `${item.id}-mgmt-001`,
      date: item.date,
      time: item.time || "09:30",
      stage: "Prospeccion",
      comment: "Ingreso inicial de la oportunidad."
    },
    {
      id: `${item.id}-mgmt-002`,
      date: "2026-07-03",
      time: "10:45",
      stage: "Calificacion",
      comment: "Se valido necesidad, presupuesto y decisor con el cliente."
    },
    {
      id: `${item.id}-mgmt-003`,
      date: "2026-07-04",
      time: "10:30",
      stage: "Propuesta",
      comment: "Propuesta final enviada y aceptada para cierre comercial."
    },
    {
      id: `${item.id}-mgmt-004`,
      date: "2026-07-04",
      time: "11:10",
      stage: closureStage,
      result: "ganado",
      comment: "Cierre ganado confirmado por el cliente."
    },
    {
      id: `${item.id}-mgmt-005`,
      date: "2026-07-04",
      time: "11:25",
      stage: closureStage,
      result: "",
      comment: "Notificacion enviada a gerencia de operaciones.",
      notified: true
    }
  ];
}

function sanitizeTestOpportunities(items) {
  const normalized = items.map((item, index) => {
    const cleanItem = {
      ...item,
      time: item.time || seededTime(index),
      seller: normalizeSeller(item.seller)
    };
    cleanItem.managements = orderedManagements(normalizeManagements(cleanItem));
    return cleanItem;
  });

  const notifiedItem = normalized.find((item) => item.managements.some((management) => management.notified))
    || normalized.find((item) => item.id === "opp-002");
  const notifiedId = notifiedItem?.id;

  return normalized.map((item) => {
    if (item.id === notifiedId) {
      return {
        ...item,
        stage: closureStage,
        managements: notifiedDemoManagements(item)
      };
    }

    let keptClosure = false;
    let keptNotification = false;
    const cleaned = item.managements
      .filter((management) => {
        if (management.notified && item.id !== notifiedId) return false;
        if (!management.canceled && isClosureStage(management.stage) && management.result) {
          if (keptClosure) return false;
          keptClosure = true;
        }
        if (management.notified) {
          if (keptNotification) return false;
          keptNotification = true;
        }
        return true;
      })
      .map((management) => ({
        ...management,
        result: management.notified ? "" : management.result
      }));

    const ordered = orderedManagements(cleaned);
    const latestClosure = [...ordered].reverse().find((management) => !management.canceled && isClosureStage(management.stage) && management.result);
    const latestManagement = [...ordered].reverse().find((management) => !management.notified && !management.canceled);
    return {
      ...item,
      stage: latestClosure ? closureStage : latestManagement?.stage || item.stage,
      managements: ordered
    };
  });
}

function syncOpportunityViews() {
  getOpportunitySubmenu().items = sanitizeTestOpportunities(normalizeOpportunities(getOpportunitySubmenu().items));
  localStorage.setItem(opportunitiesStorageKey, JSON.stringify(getOpportunitySubmenu().items));
  if (!appShell.classList.contains("hidden")) {
    renderDashboard();
  }
}

function saveOpportunities() {
  syncOpportunityViews();
  if (apiEnabled) {
    apiJson("/api/opportunities", {
      method: "PUT",
      body: JSON.stringify(getOpportunitySubmenu().items)
    })
      .then(() => {
        syncOpportunityViews();
        return syncLostCrmOpportunities();
      })
      .catch(() => {});
  }
}

function resetOpportunityForm() {
  state.opportunityFormContext = "results";
  opportunityForm.reset();
  fillOpportunityOptions();
  opportunityId.value = "";
  opportunityCrmSourceId.value = "";
  opportunityCustomerId.value = "";
  refreshOpportunityCustomerOptions();
  opportunityDate.valueAsDate = new Date();
  opportunityAgendaDate.valueAsDate = new Date();
  opportunityNextAction.value = "Primer seguimiento";
  opportunityAgendaType.value = "Seguimiento";
  opportunityAgendaPlace.value = "Por definir";
  opportunityPriority.value = "Media";
  opportunityDialogTitle.textContent = "Nueva oportunidad";
  saveOpportunityBtn.textContent = "Guardar oportunidad";
}

function closeOpportunityForm() {
  opportunityDialog.close();
  resetOpportunityForm();
}

function fillOpportunityOptions() {
  opportunityStage.innerHTML = opportunityStages.map((stage) => `<option value="${stage}">${stage}</option>`).join("");
  managementStage.innerHTML = opportunityStages.map((stage) => `<option value="${stage}">${stage}</option>`).join("");
  opportunitySeller.innerHTML = commercialSellerNames().map((seller) => `<option value="${escapeHtml(seller)}">${escapeHtml(seller)}</option>`).join("");
  opportunitySegment.innerHTML = [
    '<option value="">Seleccionar rubro</option>',
    ...opportunitySegments.map((segment) => `<option value="${escapeHtml(segment)}">${escapeHtml(segment)}</option>`)
  ].join("");
  opportunityLocation.innerHTML = elSalvadorLocationOptions();
  opportunityProbability.innerHTML = opportunityProbabilities.map(([key, label, range]) => (
    `<option value="${key}">${label} - ${range}</option>`
  )).join("");
}

function elSalvadorLocationOptions() {
  return [
    '<option value="">Seleccionar departamento y municipio</option>',
    ...Object.entries(opportunityLocationsByDepartment).map(([department, municipalities]) => (
      `<optgroup label="${escapeHtml(department)}">${municipalities.map((municipality) => {
        const value = `${department} — ${municipality}`;
        return `<option value="${escapeHtml(value)}">${escapeHtml(municipality)}</option>`;
      }).join("")}</optgroup>`
    ))
  ].join("");
}

function ensureSelectOption(select, value, label = value) {
  if (!select || !value) return;
  if (![...select.options].some((option) => option.value === value)) {
    select.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`);
  }
  select.value = value;
}

function renderNav() {
  navList.innerHTML = "";
  allowedAreas().forEach((key) => {
    const area = areas[key];
    const submenus = visibleSubmenus(key);
    const hasSubmenus = submenus.length > 0;
    const isOpen = hasSubmenus && state.openMenus.has(key);
    const button = document.createElement("button");
    button.className = `nav-item ${state.activeArea === key ? "active" : ""}`;
    button.type = "button";
    button.setAttribute("aria-expanded", hasSubmenus ? String(isOpen) : "false");
    button.innerHTML = `<span class="nav-item-label">${hasSubmenus ? `<span class="nav-caret" title="${isOpen ? "Ocultar" : "Ver"}">${isOpen ? "−" : "+"}</span>` : ""}<span>${area.nav}</span></span>`;
    button.addEventListener("click", () => {
      state.activeArea = key;
      if (hasSubmenus) {
        if (state.openMenus.has(key)) {
          state.openMenus.delete(key);
        } else {
          state.openMenus.add(key);
          if (!submenus.some((item) => item.key === state.activeSubmenu)) {
            state.activeSubmenu = submenus[0].key;
          }
        }
      }
      persistNavigationState();
      renderDashboard();
    });
    navList.appendChild(button);
    if (hasSubmenus) renderSubmenu(area, key, submenus);
  });
}

function renderSubmenu(area, areaKey, items = visibleSubmenus(areaKey)) {
  const submenu = document.createElement("div");
  submenu.className = `submenu-list ${state.openMenus.has(areaKey) ? "open" : ""}`;
  submenu.innerHTML = items.map((item) => (
    `<button class="submenu-item ${state.activeArea === areaKey && state.activeSubmenu === item.key ? "active" : ""}" type="button" data-submenu="${item.key}">${item.label}</button>`
  )).join("");
  submenu.querySelectorAll("[data-submenu]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeArea = areaKey;
      state.activeSubmenu = button.dataset.submenu;
      persistNavigationState();
      renderDashboard();
    });
  });
  navList.appendChild(submenu);
}

function renderSummary(area) {
  summaryGrid.innerHTML = area.summary.map(([label, value, meta]) => `
    <article class="summary-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <span>${meta}</span>
    </article>
  `).join("");
}

function renderResults(area) {
  resultsChart.innerHTML = area.results.map(([label, value]) => `
    <div class="bar-row">
      <span class="bar-label">${label}</span>
      <div class="bar-track"><div class="bar-fill ${levelClass(value)}" style="width:${value}%"></div></div>
      <span class="bar-value">${value}%</span>
    </div>
  `).join("");
}

function renderKpis(area) {
  kpiList.innerHTML = area.kpis.map(([name, value, meta, status]) => `
    <div class="kpi-item">
      <div class="kpi-top">
        <span class="kpi-name">${name}</span>
        <span class="tag ${status === "warn" ? "warn" : ""}">${status === "warn" ? "Revisar" : "En rango"}</span>
      </div>
      <div class="kpi-value">${value}</div>
      <div class="kpi-meta">${meta}</div>
    </div>
  `).join("");
}

function renderRisks(area) {
  riskList.innerHTML = area.risks.map(([name, owner, level, riskClass]) => `
    <div class="risk-item">
      <div class="risk-top">
        <strong>${name}</strong>
        <span class="tag ${riskClass}">${level}</span>
      </div>
      <div class="risk-meta">Responsable: ${owner}. Seguimiento activo con plan de mitigacion.</div>
    </div>
  `).join("");
}

function renderRequests(area) {
  requestTable.innerHTML = area.requests.map(([subject, target, priority, status]) => `
    <div class="request-row">
      <div><strong>${subject}</strong><small>Actualizado en ${state.period}</small></div>
      <span>${target}</span>
      <span class="tag ${priorityClass(priority)}">${priority}</span>
      <span>${status}</span>
    </div>
  `).join("");
}

const financialOrderFields = [
  ["number", "financialOrderNumber"], ["month", "financialOrderMonth"], ["year", "financialOrderYear"],
  ["date", "financialOrderDate"], ["seller", "financialOrderSeller"], ["sale", "financialOrderSale"],
  ["orderNumber", "financialOrderOrderNumber"], ["invoice", "financialOrderInvoice"],
  ["conditions", "financialOrderConditions"], ["client", "financialOrderClient"],
  ["clientType", "financialOrderClientType"], ["strategy", "financialOrderStrategy"],
  ["management", "financialOrderManagement"], ["country", "financialOrderCountry"],
  ["department", "financialOrderDepartment"]
];

function financialDepartmentOptionsMarkup() {
  const groups = new Map();
  (window.financialDepartmentLocations || []).forEach((location) => {
    const separator = location.indexOf(" - ");
    if (separator < 0) return;
    const department = location.slice(0, separator).trim();
    const municipality = location.slice(separator + 3).trim();
    if (!groups.has(department)) groups.set(department, []);
    groups.get(department).push({ location, municipality });
  });
  return `<option value="">Seleccionar departamento y municipio</option>${[...groups.entries()].map(([department, municipalities]) => (
    `<optgroup label="${escapeHtml(department)}">${municipalities.map(({ location, municipality }) => (
      `<option value="${escapeHtml(location)}">${escapeHtml(municipality)}</option>`
    )).join("")}</optgroup>`
  )).join("")}`;
}

const accountsReceivableFields = [
  ["invoiceNumber", "accountsReceivableInvoiceNumber"],
  ["referenceNumber", "accountsReceivableReferenceNumber"],
  ["customerCode", "accountsReceivableCustomerCode"],
  ["customerName", "accountsReceivableCustomerName"],
  ["description", "accountsReceivableDescription"],
  ["invoiceDate", "accountsReceivableInvoiceDate"],
  ["dueDate", "accountsReceivableDueDate"],
  ["daysOutstanding", "accountsReceivableDaysOutstanding"],
  ["invoiceAmount", "accountsReceivableInvoiceAmount"],
  ["payments", "accountsReceivablePayments"],
  ["creditNotes", "accountsReceivableCreditNotes"],
  ["balance", "accountsReceivableBalance"],
  ["seller", "accountsReceivableSeller"],
  ["projectId", "accountsReceivableProjectId"],
  ["documentNumber", "accountsReceivableDocumentNumber"],
  ["address", "accountsReceivableAddress"]
];

const purchaseOrderFields = [
  ["orderNumber", "purchaseOrderNumber"], ["invoiceType", "purchaseOrderInvoiceType"],
  ["customerCode", "purchaseOrderCustomerCode"], ["customerName", "purchaseOrderCustomerName"],
  ["description", "purchaseOrderDescription"], ["entryDate", "purchaseOrderEntryDate"],
  ["dueDate", "purchaseOrderDueDate"], ["amount", "purchaseOrderAmount"],
  ["advance", "purchaseOrderAdvance"], ["payment", "purchaseOrderPayment"],
  ["remaining", "purchaseOrderRemaining"], ["balancePaymentDate", "purchaseOrderBalancePaymentDate"],
  ["address", "purchaseOrderAddress"], ["status", "purchaseOrderStatus"],
  ["productionManager", "purchaseOrderProductionManager"]
];

function purchaseOrderIsDelivered(order) {
  return normalizeKey(order.status) === "entregado";
}

function purchaseOrderHasBalance(order) {
  return Number(order.remaining || 0) > 0.009;
}

function purchaseOrdersWithBalance() {
  return state.purchaseOrders.filter(purchaseOrderHasBalance);
}

function purchaseOrderDeadline(order) {
  if (purchaseOrderIsDelivered(order)) return { label: "Entregada", className: "delivered", days: 0 };
  if (!order.dueDate) return { label: "Sin fecha", className: "neutral", days: 0 };
  const today = new Date(`${todayISO()}T00:00:00`);
  const due = new Date(`${order.dueDate}T00:00:00`);
  const days = Math.ceil((due - today) / 86400000);
  if (days < 0) return { label: `${Math.abs(days)} d vencida`, className: "overdue", days };
  if (days <= 7) return { label: `${days} d restantes`, className: "urgent", days };
  return { label: `${days} d restantes`, className: "ontrack", days };
}

function loadPurchaseOrders() {
  if (!apiEnabled) return;
  apiJson("/api/purchase-orders")
    .then((records) => {
      state.purchaseOrders = Array.isArray(records) ? records : [];
      if (state.activeArea === "financiera" && state.activeSubmenu === "resultados-ordenes-de-pedido") renderDashboard();
    })
    .catch((error) => console.error("No se pudieron cargar las órdenes de pedido.", error));
}

function resetPurchaseOrderForm(order = null) {
  purchaseOrderForm.reset();
  purchaseOrderId.value = order?.id || "";
  const isHistorical = Boolean(order && !purchaseOrderHasBalance(order));
  purchaseOrderDialogTitle.textContent = isHistorical ? "Editar orden histórica" : order ? "Editar orden de pedido" : "Nueva orden de pedido";
  if (purchaseOrderDialogContext) {
    purchaseOrderDialogContext.classList.toggle("hidden", !isHistorical);
    purchaseOrderDialogContext.innerHTML = isHistorical
      ? `<strong>Registro liquidado.</strong> Si el saldo continúa en $0, permanecerá en Histórico. Si asignas un saldo mayor a $0, regresará automáticamente al listado activo.`
      : "";
  }
  purchaseOrderFields.forEach(([key, id]) => {
    const input = document.querySelector(`#${id}`);
    if (input) input.value = order?.[key] ?? "";
  });
  if (!order) {
    document.querySelector("#purchaseOrderEntryDate").value = todayISO();
    document.querySelector("#purchaseOrderStatus").value = "Proceso";
  }
}

function filteredPurchaseOrders() {
  let rows = purchaseOrdersWithBalance();
  if (state.purchaseOrderStatus !== "all") {
    rows = rows.filter((order) => state.purchaseOrderStatus === "delivered" ? purchaseOrderIsDelivered(order) : !purchaseOrderIsDelivered(order));
  }
  const query = state.purchaseOrderQuery;
  return query ? rows.filter((order) => Object.values(order).some((value) => searchTokenMatches(value, query))) : rows;
}

function purchaseOrderSummary(rows = state.purchaseOrders) {
  return {
    count: rows.length,
    amount: rows.reduce((sum, order) => sum + Number(order.amount || 0), 0),
    advances: rows.reduce((sum, order) => sum + Number(order.advance || 0), 0),
    payments: rows.reduce((sum, order) => sum + Number(order.payment || 0), 0),
    remaining: rows.reduce((sum, order) => sum + Number(order.remaining || 0), 0),
    inProcess: rows.filter((order) => !purchaseOrderIsDelivered(order)).length,
    overdue: rows.filter((order) => purchaseOrderDeadline(order).className === "overdue").length
  };
}

function renderPurchaseOrderList() {
  const rows = filteredPurchaseOrders();
  const totals = purchaseOrderSummary(rows);
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  state.purchaseOrderPage = Math.max(1, Math.min(state.purchaseOrderPage, pageCount));
  const start = (state.purchaseOrderPage - 1) * pageSize;
  const pagedRows = rows.slice(start, start + pageSize);
  return `<section class="purchase-orders-shell">
    <div class="purchase-orders-hero">
      <article><span>Monto</span><strong>${formatMoney(totals.amount)}</strong><small>${totals.count} órdenes según filtro actual</small></article>
      <article><span>Anticipo</span><strong>${formatMoney(totals.advances)}</strong><small>Total anticipado</small></article>
      <article><span>Abono</span><strong>${formatMoney(totals.payments)}</strong><small>Total abonado</small></article>
      <article><span>Saldo</span><strong>${formatMoney(totals.remaining)}</strong><small>${totals.inProcess} en producción · ${totals.overdue} vencidas</small></article>
    </div>
    <div class="purchase-orders-toolbar">
      <label><span>⌕</span><input data-purchase-order-search type="search" value="${escapeHtml(state.purchaseOrderQuery)}" placeholder="Buscar orden, cliente, producto o responsable..."></label>
      <div class="purchase-orders-status-tabs" role="tablist">
        ${[["all","Con saldo"],["process","En proceso"],["delivered","Entregadas"]].map(([key,label]) => `<button type="button" data-purchase-order-status="${key}" class="${state.purchaseOrderStatus === key ? "active" : ""}">${label}</button>`).join("")}
      </div>
      <button type="button" data-purchase-order-new>+ Nueva orden</button>
    </div>
    <div class="purchase-orders-list">
      ${pagedRows.map((order) => {
        const deadline = purchaseOrderDeadline(order);
        return `<article class="purchase-order-card">
          <div class="purchase-order-identity"><span>#${escapeHtml(order.orderNumber)}</span><strong>${escapeHtml(order.customerName)}</strong><small>${escapeHtml(order.description || "Sin descripción")}</small></div>
          <div class="purchase-order-dates"><small>Ingreso · ${formatDate(order.entryDate)}</small><strong>${formatDate(order.dueDate) || "Sin fecha límite"}</strong><em class="${deadline.className}">${deadline.label}</em></div>
          <div class="purchase-order-finance"><small>Saldo</small><strong>${formatMoney(order.remaining)}</strong><span>Monto original ${formatMoney(order.amount)}</span></div>
          <div class="purchase-order-owner"><small>Producción</small><strong>${escapeHtml(order.productionManager)}</strong><span>${escapeHtml(order.invoiceType || "Sin factura")}</span></div>
          <div class="purchase-order-actions"><button type="button" data-purchase-order-edit="${order.id}">Editar</button><button class="danger" type="button" data-purchase-order-delete="${order.id}">Eliminar</button></div>
        </article>`;
      }).join("") || `<div class="empty-state">No hay órdenes para este filtro.</div>`}
    </div>
    <div class="opportunity-pagination financial-orders-pagination"><span>Mostrando ${rows.length ? start + 1 : 0}-${Math.min(start + pageSize, rows.length)} de ${rows.length}</span><div><button class="ghost-btn compact-btn" data-purchase-order-page="prev" ${state.purchaseOrderPage <= 1 ? "disabled" : ""}>Anterior</button><strong>Página ${state.purchaseOrderPage} de ${pageCount}</strong><button class="ghost-btn compact-btn" data-purchase-order-page="next" ${state.purchaseOrderPage >= pageCount ? "disabled" : ""}>Siguiente</button></div></div>
  </section>`;
}

function renderPurchaseOrderDelivery() {
  const rows = purchaseOrdersWithBalance()
    .sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)) || String(a.orderNumber).localeCompare(String(b.orderNumber), "es", { numeric: true }));
  const totals = purchaseOrderSummary(rows);
  const deliveredWithBalance = rows.filter(purchaseOrderIsDelivered).length;
  return `<section class="purchase-orders-insight"><div class="purchase-orders-hero"><article><span>Monto</span><strong>${formatMoney(totals.amount)}</strong><small>${rows.length} órdenes con saldo · ${totals.inProcess} en producción</small></article><article><span>Anticipo</span><strong>${formatMoney(totals.advances)}</strong><small>Total anticipado</small></article><article><span>Abono</span><strong>${formatMoney(totals.payments)}</strong><small>Total abonado</small></article><article><span>Saldo</span><strong>${formatMoney(totals.remaining)}</strong><small>${totals.overdue} vencidas · ${deliveredWithBalance} entregadas con saldo</small></article></div><div class="purchase-orders-insight-head"><div><span>Agenda operativa</span><h4>Entregas con saldo</h4></div><small>Conciliado con Listado / Con saldo · ordenado por fecha límite</small></div><div class="purchase-orders-timeline">${rows.map((order) => { const deadline = purchaseOrderDeadline(order); const deliveryLabel = purchaseOrderIsDelivered(order) ? "Entregada con saldo" : deadline.label; return `<article><time>${formatDate(order.dueDate)}</time><i class="${deadline.className}"></i><div><strong>${escapeHtml(order.customerName)}</strong><small>#${escapeHtml(order.orderNumber)} · ${escapeHtml(order.description)}</small></div><span class="${deadline.className}">${deliveryLabel}</span><strong>${formatMoney(order.amount)}</strong></article>`; }).join("") || `<div class="empty-state">No hay órdenes con saldo pendiente.</div>`}</div></section>`;
}

function purchaseOrderMonthLabel(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  return new Intl.DateTimeFormat("es-SV", { month: "long", year: "numeric", timeZone: "UTC" })
    .format(new Date(Date.UTC(year, month - 1, 1)))
    .replace(/^./, (letter) => letter.toUpperCase());
}

function purchaseOrderMonthlyMatrix() {
  const pending = state.purchaseOrders.filter((order) => Number(order.remaining || 0) > 0.009 && /^\d{4}-\d{2}/.test(order.entryDate || ""));
  if (!pending.length) return [];
  const firstMonth = pending.map((order) => order.entryDate.slice(0, 7)).sort()[0];
  const currentMonth = todayISO().slice(0, 7);
  const [firstYear, firstNumber] = firstMonth.split("-").map(Number);
  const [currentYear, currentNumber] = currentMonth.split("-").map(Number);
  const cursor = new Date(Date.UTC(firstYear, firstNumber - 1, 1));
  const limit = new Date(Date.UTC(currentYear, currentNumber - 1, 1));
  const months = [];
  while (cursor <= limit) {
    const monthKey = `${cursor.getUTCFullYear()}-${String(cursor.getUTCMonth() + 1).padStart(2, "0")}`;
    const rows = pending.filter((order) => order.entryDate.slice(0, 7) <= monthKey);
    if (rows.length) months.push({ monthKey, ...purchaseOrderSummary(rows) });
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }
  return months;
}

function purchaseOrdersForMonth(monthKey) {
  return state.purchaseOrders
    .filter((order) => purchaseOrderHasBalance(order) && /^\d{4}-\d{2}/.test(order.entryDate || "") && order.entryDate.slice(0, 7) <= monthKey)
    .sort((a, b) => String(a.entryDate).localeCompare(String(b.entryDate)) || String(a.orderNumber).localeCompare(String(b.orderNumber), "es", { numeric: true }));
}

function openPurchaseOrderMonthDetail(monthKey) {
  const rows = purchaseOrdersForMonth(monthKey);
  const totals = purchaseOrderSummary(rows);
  purchaseOrderMonthTitle.textContent = purchaseOrderMonthLabel(monthKey);
  purchaseOrderMonthSummary.innerHTML = [
    ["Ordenes", totals.count, "con saldo"],
    ["Monto", formatMoney(totals.amount), "comprometido"],
    ["Anticipo", formatMoney(totals.advances), "anticipado"],
    ["Abono", formatMoney(totals.payments), "abonado"],
    ["Saldo", formatMoney(totals.remaining), "pendiente"]
  ].map(([label, value, detail]) => `<article><span>${label}</span><strong>${value}</strong><small>${detail}</small></article>`).join("");
  purchaseOrderMonthList.innerHTML = rows.map((order) => {
    const deadline = purchaseOrderDeadline(order);
    return `<article class="purchase-order-month-row">
      <div class="purchase-order-month-identity"><span>#${escapeHtml(order.orderNumber)}</span><strong>${escapeHtml(order.customerName)}</strong><small>${escapeHtml(order.description || "Sin descripcion")}</small></div>
      <div class="purchase-order-month-dates"><small>Ingreso ${formatDate(order.entryDate)}</small><strong>${formatDate(order.dueDate) || "Sin fecha limite"}</strong><em class="${deadline.className}">${deadline.label}</em></div>
      <div class="purchase-order-month-owner"><small>Produccion</small><strong>${escapeHtml(order.productionManager || "Sin asignar")}</strong><span>${escapeHtml(order.invoiceType || "Sin factura")}</span></div>
      <div class="purchase-order-month-values"><span><small>Monto</small><strong>${formatMoney(order.amount)}</strong></span><span><small>Anticipo</small><strong>${formatMoney(order.advance)}</strong></span><span><small>Abono</small><strong>${formatMoney(order.payment)}</strong></span><span class="balance"><small>Saldo</small><strong>${formatMoney(order.remaining)}</strong></span></div>
      <button class="purchase-order-month-edit" type="button" data-purchase-order-month-edit="${order.id}" aria-label="Editar orden ${escapeHtml(order.orderNumber)}">Editar</button>
    </article>`;
  }).join("") || `<div class="empty-state">No existen ordenes con saldo para este mes.</div>`;
  purchaseOrderMonthList.querySelectorAll("[data-purchase-order-month-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      const order = state.purchaseOrders.find((item) => item.id === button.dataset.purchaseOrderMonthEdit);
      if (!order) return;
      purchaseOrderMonthDialog.close();
      resetPurchaseOrderForm(order);
      purchaseOrderDialog.showModal();
    });
  });
  purchaseOrderMonthDialog.showModal();
}

function renderPurchaseOrderMatrix() {
  const months = purchaseOrderMonthlyMatrix();
  const latest = months.at(-1);
  const maxBalance = Math.max(...months.map((month) => month.remaining), 1);
  return `<section class="purchase-orders-matrix-view">
    <div class="purchase-orders-matrix-head">
      <div><span>Matriz de liquidación</span><h4>Saldos pendientes por mes</h4><small>Cada orden se arrastra desde su mes inicial mientras conserve saldo.</small></div>
      <div><small>Saldo vigente</small><strong>${formatMoney(latest?.remaining || 0)}</strong><span>${latest?.count || 0} órdenes por liquidar</span></div>
    </div>
    <div class="purchase-orders-matrix-scroll">
      <div class="purchase-orders-matrix-row header"><span>Mes</span><span>Órdenes</span><span>Monto</span><span>Anticipo</span><span>Abono</span><span>Saldo</span></div>
      ${months.map((month) => `<article class="purchase-orders-matrix-row is-interactive" data-purchase-order-month="${month.monthKey}" role="button" tabindex="0" aria-label="Ver ordenes con saldo de ${purchaseOrderMonthLabel(month.monthKey)}">
        <div><i style="--matrix-progress:${((month.remaining / maxBalance) * 100).toFixed(2)}%"></i><strong>${purchaseOrderMonthLabel(month.monthKey)}</strong></div>
        <span><b>${month.count}</b><small>con saldo</small></span>
        <span><b>${formatMoney(month.amount)}</b><small>monto</small></span>
        <span><b>${formatMoney(month.advances)}</b><small>anticipo</small></span>
        <span><b>${formatMoney(month.payments)}</b><small>abono</small></span>
        <span class="balance"><b>${formatMoney(month.remaining)}</b><small>pendiente</small></span>
      </article>`).join("") || `<div class="empty-state">No existen órdenes con saldo pendiente.</div>`}
    </div>
    <p class="purchase-orders-matrix-note">Solo se incluyen órdenes con saldo mayor a $0. Las órdenes liquidadas se omiten automáticamente.</p>
  </section>`;
}

function renderPurchaseOrderProduction() {
  const owners = new Map();
  state.purchaseOrders.filter(purchaseOrderHasBalance).forEach((order) => { const key = order.productionManager || "Sin asignar"; const item = owners.get(key) || { name:key,count:0,open:0,amount:0,remaining:0 }; item.count++; item.open += purchaseOrderIsDelivered(order) ? 0 : 1; item.amount += Number(order.amount || 0); item.remaining += Number(order.remaining || 0); owners.set(key,item); });
  const rows = [...owners.values()].sort((a,b) => b.open - a.open || b.amount - a.amount);
  const max = Math.max(...rows.map((row) => row.amount), 1);
  return `<section class="purchase-orders-insight"><div class="purchase-orders-insight-head"><div><span>Capacidad y cartera</span><h4>Control por responsable</h4></div><small>${rows.length} responsables</small></div><div class="purchase-orders-production">${rows.map((row,index) => `<article style="--production-width:${((row.amount/max)*100).toFixed(2)}%;--production-hue:${164 + index*18}"><div><strong>${escapeHtml(row.name)}</strong><small>${row.open} activas · ${row.count} totales</small></div><i><b></b></i><span>${formatMoney(row.amount)}<small>Saldo ${formatMoney(row.remaining)}</small></span></article>`).join("")}</div></section>`;
}

function renderPurchaseOrderHistory() {
  const query = state.purchaseOrderQuery;
  let rows = state.purchaseOrders.filter((order) => !purchaseOrderHasBalance(order));
  if (query) rows = rows.filter((order) => Object.values(order).some((value) => searchTokenMatches(value, query)));
  const totals = purchaseOrderSummary(rows);
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  state.purchaseOrderPage = Math.max(1, Math.min(state.purchaseOrderPage, pageCount));
  const start = (state.purchaseOrderPage - 1) * pageSize;
  const pagedRows = rows.slice(start, start + pageSize);
  return `<section class="purchase-orders-shell purchase-orders-history">
    <div class="purchase-orders-history-head"><div><span>Archivo financiero</span><h4>Órdenes liquidadas</h4><small>Registros conservados automáticamente al alcanzar saldo $0.</small></div><strong>${rows.length}<small>órdenes históricas</small></strong></div>
    <div class="purchase-orders-toolbar history-toolbar"><label><span>⌕</span><input data-purchase-order-search type="search" value="${escapeHtml(state.purchaseOrderQuery)}" placeholder="Buscar orden, cliente, producto o responsable..."></label><div class="history-total"><small>Monto histórico</small><strong>${formatMoney(totals.amount)}</strong></div></div>
    <div class="purchase-orders-list">
      ${pagedRows.map((order) => `<article class="purchase-order-card historical">
        <div class="purchase-order-identity"><span>#${escapeHtml(order.orderNumber)}</span><strong>${escapeHtml(order.customerName)}</strong><small>${escapeHtml(order.description || "Sin descripción")}</small></div>
        <div class="purchase-order-dates"><small>Ingreso · ${formatDate(order.entryDate)}</small><strong>${formatDate(order.balancePaymentDate || order.dueDate) || "Sin fecha de liquidación"}</strong><em class="delivered">Liquidada</em></div>
        <div class="purchase-order-finance"><small>Monto histórico</small><strong>${formatMoney(order.amount)}</strong><span>Saldo ${formatMoney(order.remaining)}</span></div>
        <div class="purchase-order-owner"><small>Producción</small><strong>${escapeHtml(order.productionManager)}</strong><span>${escapeHtml(order.invoiceType || "Sin factura")}</span></div>
        <div class="purchase-order-actions purchase-order-history-actions">
          <span class="purchase-order-history-badge">Histórico</span>
          <button type="button" data-purchase-order-edit="${order.id}">Editar</button>
          <button class="danger" type="button" data-purchase-order-delete="${order.id}">Eliminar</button>
        </div>
      </article>`).join("") || `<div class="empty-state">No hay órdenes liquidadas para esta búsqueda.</div>`}
    </div>
    <div class="opportunity-pagination financial-orders-pagination"><span>Mostrando ${rows.length ? start + 1 : 0}-${Math.min(start + pageSize, rows.length)} de ${rows.length}</span><div><button class="ghost-btn compact-btn" data-purchase-order-page="prev" ${state.purchaseOrderPage <= 1 ? "disabled" : ""}>Anterior</button><strong>Página ${state.purchaseOrderPage} de ${pageCount}</strong><button class="ghost-btn compact-btn" data-purchase-order-page="next" ${state.purchaseOrderPage >= pageCount ? "disabled" : ""}>Siguiente</button></div></div>
  </section>`;
}

function renderPurchaseOrders() {
  if (state.purchaseOrderView === "history") return renderPurchaseOrderHistory();
  if (state.purchaseOrderView === "matrix") return renderPurchaseOrderMatrix();
  if (state.purchaseOrderView === "delivery") return renderPurchaseOrderDelivery();
  if (state.purchaseOrderView === "production") return renderPurchaseOrderProduction();
  return renderPurchaseOrderList();
}

function formatControlSalesMoney(cents) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(cents || 0) / 100);
}

function formatControlSalesDateInput(value) {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function controlSalesDisplayDateToIso(value) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(String(value || "").trim())) return String(value).trim();
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(value || "").trim());
  if (!match) return "";
  const [, day, month, year] = match;
  const iso = `${year}-${month}-${day}`;
  const parsed = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== iso ? "" : iso;
}

function loadControlSalesPeriod() {
  try {
    const saved = JSON.parse(localStorage.getItem(controlSalesPeriodStorageKey) || "{}");
    if (/^\d{4}$/.test(String(saved.year || ""))) state.controlSalesPeriodYear = String(saved.year);
    if (/^(0[1-9]|1[0-2])$/.test(String(saved.month || ""))) state.controlSalesPeriodMonth = String(saved.month);
  } catch { /* Conserva el periodo actual si no existe una selección válida. */ }
}

function saveControlSalesPeriod() {
  localStorage.setItem(controlSalesPeriodStorageKey, JSON.stringify({
    year: state.controlSalesPeriodYear,
    month: state.controlSalesPeriodMonth
  }));
}

function loadControlSales() {
  if (!apiEnabled) return Promise.resolve();
  return apiJson("/api/control-sales")
    .then((payload) => {
      state.controlSales = Array.isArray(payload.items) ? payload.items : [];
      state.controlSalesCounts = payload.counts || { orders: state.controlSales.length, details: 0 };
      if (
        (state.activeArea === "operaciones" && state.activeSubmenu === "resultados-control-ventas")
        || (state.activeArea === "comercializacion" && state.activeSubmenu === "resultados-pedidos")
        || (state.activeArea === "comercializacion" && state.activeSubmenu === "autorizacion-pedidos")
      ) renderDashboard();
    })
    .catch((error) => console.error("No se pudo cargar Control de Ventas.", error));
}

function productionMonday(value = new Date()) {
  const date = value instanceof Date ? new Date(value) : new Date(`${value}T12:00:00`);
  const day = date.getDay() || 7;
  date.setDate(date.getDate() - day + 1);
  return date.toISOString().slice(0, 10);
}

function loadProductionSchedule() {
  if (!apiEnabled) return Promise.resolve();
  const savedWeek = localStorage.getItem(productionWeekStorageKey) || "";
  if (!state.productionWeekStart) state.productionWeekStart = /^\d{4}-\d{2}-\d{2}$/.test(savedWeek) ? savedWeek : productionMonday();
  return apiJson("/api/production-schedule").then((items) => {
    state.productionSchedule = Array.isArray(items) ? items : [];
    const weekEndDate = new Date(`${state.productionWeekStart}T12:00:00`);
    weekEndDate.setDate(weekEndDate.getDate() + 6);
    const weekEnd = weekEndDate.toISOString().slice(0, 10);
    const weekHasProduction = state.productionSchedule.some((item) => item.productionDate <= weekEnd && (item.productionEndDate || item.productionDate) >= state.productionWeekStart);
    if (!savedWeek && !weekHasProduction && state.productionSchedule.length) {
      const latest = [...state.productionSchedule].sort((a, b) => String(b.productionDate).localeCompare(String(a.productionDate)))[0];
      state.productionWeekStart = productionMonday(latest.productionDate);
      localStorage.setItem(productionWeekStorageKey, state.productionWeekStart);
    }
    if (state.activeArea === "operaciones" && state.activeSubmenu === "produccion-semanal") renderDashboard();
  }).catch((error) => console.error("No se pudo cargar la agenda de producción.", error));
}

function ensureProductionDialog() {
  if (document.querySelector("#productionScheduleDialog")) return;
  document.body.insertAdjacentHTML("beforeend", `<dialog id="productionScheduleDialog" class="wide-dialog production-schedule-dialog"><form id="productionScheduleForm">
    <input type="hidden" id="productionScheduleId">
    <header><div><small>Producción</small><h3>Agendar producción</h3></div><button type="button" data-production-close aria-label="Cerrar">×</button></header>
    <section class="production-availability"><header><h4>Semana</h4><nav><button type="button" data-production-calendar-prev aria-label="Semana anterior">‹</button><strong id="productionCalendarRange"></strong><button type="button" data-production-calendar-next aria-label="Semana siguiente">›</button></nav></header><div id="productionAvailabilityColumns"></div></section>
    <section class="production-schedule-fields"><label>Fecha de inicio<input id="productionScheduleDate" type="date" required></label><label>Fecha fin<input id="productionScheduleEndDate" type="date" required></label><label>Línea de producción<select id="productionScheduleLine" required><option>Línea 1</option><option>Línea 2</option></select></label></section>
    <section class="production-picker"><header><h4>Selección</h4><strong id="productionSelectedCount"></strong></header><div id="productionScheduleItems"></div></section>
    <p id="productionScheduleError" class="production-schedule-error hidden"></p>
    <footer><button type="button" data-production-close>Cancelar</button><button type="submit" class="primary-btn">Guardar grupo</button></footer>
  </form></dialog>`);
  const dialog = document.querySelector("#productionScheduleDialog");
  dialog.querySelectorAll("[data-production-close]").forEach((button) => button.addEventListener("click", () => dialog.close()));
  dialog.querySelector("#productionScheduleForm").addEventListener("submit", saveProductionScheduleFromDialog);
  dialog.querySelector("[data-production-calendar-prev]").addEventListener("click", () => moveProductionAvailabilityWeek(-7));
  dialog.querySelector("[data-production-calendar-next]").addEventListener("click", () => moveProductionAvailabilityWeek(7));
  dialog.querySelector("#productionScheduleDate").addEventListener("change", (event) => { dialog.productionCalendarAnchor = productionMonday(event.target.value); renderProductionAvailabilityCalendar(); });
  dialog.querySelector("#productionScheduleEndDate").addEventListener("change", renderProductionAvailabilityCalendar);
  dialog.querySelector("#productionScheduleLine").addEventListener("change", renderProductionAvailabilityCalendar);
}

function moveProductionAvailabilityWeek(days) {
  const dialog = document.querySelector("#productionScheduleDialog");
  const date = new Date(`${dialog.productionCalendarAnchor || productionMonday()}T12:00:00`);
  date.setDate(date.getDate() + days);
  dialog.productionCalendarAnchor = productionMonday(date);
  renderProductionAvailabilityCalendar();
}

function renderProductionAvailabilityCalendar() {
  const dialog = document.querySelector("#productionScheduleDialog");
  if (!dialog) return;
  const start = new Date(`${dialog.productionCalendarAnchor || productionMonday()}T12:00:00`);
  const selectedDate = document.querySelector("#productionScheduleDate")?.value || "";
  const selectedEndDate = document.querySelector("#productionScheduleEndDate")?.value || selectedDate;
  const selectedLine = document.querySelector("#productionScheduleLine")?.value || "Línea 1";
  const dates = Array.from({ length:7 }, (_, index) => { const date = new Date(start); date.setDate(date.getDate() + index); return date.toISOString().slice(0, 10); });
  const label = (value, options) => new Intl.DateTimeFormat("es-SV", { ...options, timeZone:"UTC" }).format(new Date(`${value}T12:00:00Z`));
  document.querySelector("#productionCalendarRange").textContent = `${label(dates[0], { day:"numeric", month:"short" })} — ${label(dates[6], { day:"numeric", month:"short" })}`;
  document.querySelector("#productionAvailabilityColumns").innerHTML = dates.map((date) => {
    const dayAssignments = state.productionSchedule.filter((item) => date >= item.productionDate && date <= (item.productionEndDate || item.productionDate));
    const dateSelected = date >= selectedDate && date <= selectedEndDate;
    return `<article class="production-day-column${dateSelected ? " has-selection" : ""}"><header><small>${label(date, { weekday:"short" })}</small><strong>${label(date, { day:"2-digit" })}</strong><span>${label(date, { month:"short" })}</span></header><div>${["Línea 1", "Línea 2"].map((line) => {
      const assignments = dayAssignments.filter((item) => item.line === line);
      const selected = dateSelected && line === selectedLine;
      return `<section class="production-capacity-slot${assignments.length ? " occupied" : " available"}${selected ? " selected" : ""}"><button type="button" class="production-slot-select" data-production-slot-date="${date}" data-production-slot-line="${line}"><b>${escapeHtml(line.replace("Línea ", "L"))}</b><em>${assignments.length ? assignments.length : "Libre"}</em></button><div>${assignments.map((item) => { const first = item.items?.[0] || {}; const quantity = (item.items || []).reduce((total, row) => total + (Number(String(row.quantity || "0").replace(",", ".")) || 0), 0); return `<button type="button" class="production-slot-order" data-production-view-order="${escapeHtml(first.orderId || "")}" title="Ver detalle de la orden"><strong>${escapeHtml(first.client || "Producción")}</strong><span>${escapeHtml(first.product || "Producto")}</span><b>${quantity}</b></button>`; }).join("")}</div></section>`;
    }).join("")}</div></article>`;
  }).join("");
  dialog.querySelectorAll("[data-production-slot-date]").forEach((button) => button.addEventListener("click", () => {
    document.querySelector("#productionScheduleDate").value = button.dataset.productionSlotDate;
    document.querySelector("#productionScheduleEndDate").value = button.dataset.productionSlotDate;
    document.querySelector("#productionScheduleLine").value = button.dataset.productionSlotLine;
    renderProductionAvailabilityCalendar();
  }));
  dialog.querySelectorAll("[data-production-view-order]").forEach((button) => button.addEventListener("click", () => {
    const orderId = button.dataset.productionViewOrder;
    if (!orderId) return;
    dialog.close();
    openControlSalesMatrixDetail(orderId).catch((error) => alert(error.message || "No se pudo abrir la orden."));
  }));
}

function openProductionScheduleDialog(assignment = null, sourceItems = []) {
  ensureProductionDialog();
  const dialog = document.querySelector("#productionScheduleDialog");
  const items = assignment?.items?.length ? assignment.items : sourceItems;
  dialog.productionItems = items;
  document.querySelector("#productionScheduleId").value = assignment?.id || "";
  document.querySelector("#productionScheduleDate").value = assignment?.productionDate || state.productionWeekStart || productionMonday();
  document.querySelector("#productionScheduleEndDate").value = assignment?.productionEndDate || assignment?.productionDate || state.productionWeekStart || productionMonday();
  document.querySelector("#productionScheduleLine").value = assignment?.line || "Línea 1";
  document.querySelector("#productionScheduleItems").innerHTML = items.map((item) => `<article class="production-selected-row"><div><small>${escapeHtml(item.orderNumber)}</small><strong>${escapeHtml(item.client)}</strong></div><span><strong>${escapeHtml(item.product)}</strong><small>${escapeHtml(item.size || "Sin talla")}</small></span><b>${escapeHtml(item.quantity)}</b></article>`).join("");
  document.querySelector("#productionSelectedCount").textContent = `${items.length} seleccionados`;
  dialog.productionCalendarAnchor = productionMonday(document.querySelector("#productionScheduleDate").value);
  document.querySelector("#productionScheduleError").classList.add("hidden"); renderProductionAvailabilityCalendar(); dialog.showModal();
}

async function saveProductionScheduleFromDialog(event) {
  event.preventDefault();
  const id = document.querySelector("#productionScheduleId").value;
  const items = document.querySelector("#productionScheduleDialog").productionItems || [];
  const productionDate = document.querySelector("#productionScheduleDate").value;
  const productionEndDate = document.querySelector("#productionScheduleEndDate").value;
  const payload = { productionDate, productionEndDate, line:document.querySelector("#productionScheduleLine").value, status:"Programado", notes:"", items, updatedBy:state.currentUser?.name || "Sistema Gerencial" };
  const error = document.querySelector("#productionScheduleError");
  try {
    if (productionEndDate < productionDate) throw new Error("La fecha fin no puede ser anterior a la fecha de inicio.");
    await apiJson(id ? `/api/production-schedule/${encodeURIComponent(id)}` : "/api/production-schedule", { method:id ? "PUT" : "POST", body:JSON.stringify(payload) });
    state.productionWeekStart = productionMonday(productionDate);
    localStorage.setItem(productionWeekStorageKey, state.productionWeekStart);
    document.querySelector("#productionScheduleDialog").close();
    await loadProductionSchedule();
    const sourceOrderId = items[0]?.orderId;
    if (sourceOrderId && document.querySelector("#controlSalesMatrixDetailDialog")?.open) await openControlSalesMatrixDetail(sourceOrderId);
  } catch (failure) { error.textContent = failure.message || "No se pudo guardar el grupo."; error.classList.remove("hidden"); }
}

function renderProductionSchedule() {
  const weekStart = state.productionWeekStart || productionMonday();
  const start = new Date(`${weekStart}T12:00:00`);
  const dates = Array.from({ length:7 }, (_, index) => { const date = new Date(start); date.setDate(date.getDate() + index); return date.toISOString().slice(0, 10); });
  const weekEnd = dates[6];
  const label = (value, options) => new Intl.DateTimeFormat("es-SV", { ...options, timeZone:"UTC" }).format(new Date(`${value}T12:00:00Z`));
  const visible = state.productionSchedule.filter((item) => item.productionDate <= weekEnd && (item.productionEndDate || item.productionDate) >= weekStart);
  const quantity = (item) => (item.items || []).reduce((total, row) => total + (Number(String(row.quantity || "0").replace(",", ".")) || 0), 0);
  const dateIndex = (value) => Math.round((new Date(`${value}T12:00:00`) - start) / 86400000);
  const lineRows = (line) => {
    const assignments = visible.filter((item) => item.line === line);
    if (!assignments.length) return `<div class="production-gantt-empty" style="grid-column:1 / 8">Sin producción programada</div>`;
    return assignments.map((item, rowIndex) => {
      const first = item.items?.[0] || {};
      const startColumn = Math.max(0, dateIndex(item.productionDate)) + 1;
      const endColumn = Math.min(6, dateIndex(item.productionEndDate || item.productionDate)) + 2;
      const visibleDays = endColumn - startColumn;
      const productLimit = visibleDays <= 2 ? 4 : 2;
      const displayedItems = (item.items || []).slice(0, productLimit);
      const extraProducts = Math.max(0, (item.items?.length || 0) - displayedItems.length);
      return `<button type="button" class="production-gantt-bar duration-${Math.min(visibleDays, 3)} line-${line.endsWith("2") ? "two" : "one"}" style="grid-column:${startColumn} / ${endColumn};grid-row:${rowIndex + 1}" data-production-gantt-order="${escapeHtml(first.orderId || "")}" title="Abrir detalle de Control de Ventas"><span class="production-gantt-identity"><small>${escapeHtml(first.orderNumber || "Orden")}</small><strong>${escapeHtml(first.client || "Producción")}</strong></span><span class="production-gantt-products">${displayedItems.map((productItem) => `<em><b>${escapeHtml(productItem.quantity || "0")}</b><span>${escapeHtml(productItem.product || "Producto")}</span>${productItem.size ? `<small>${escapeHtml(productItem.size)}</small>` : ""}</em>`).join("")}${extraProducts ? `<i>+${extraProducts} productos</i>` : ""}</span><b class="production-gantt-quantity">${quantity(item)}<small>unidades</small></b></button>`;
    }).join("");
  };
  return `<section class="production-gantt-module">
    <header class="production-gantt-toolbar"><div><small>Agenda operativa</small><h3>Producción de la semana</h3></div><nav><button type="button" data-production-week-prev aria-label="Semana anterior">‹</button><button type="button" class="production-gantt-today" data-production-week-today>Hoy</button><strong>${label(weekStart, { day:"numeric", month:"short" })} — ${label(weekEnd, { day:"numeric", month:"short", year:"numeric" })}</strong><button type="button" data-production-week-next aria-label="Semana siguiente">›</button></nav></header>
    <div class="production-gantt-scroll"><div class="production-gantt">
      <div class="production-gantt-corner">Línea</div>${dates.map((date) => `<div class="production-gantt-day${date === new Date().toISOString().slice(0, 10) ? " today" : ""}"><small>${label(date, { weekday:"short" })}</small><b>${label(date, { day:"2-digit" })}</b></div>`).join("")}
      ${["Línea 1", "Línea 2"].map((line) => `<div class="production-gantt-line-label"><b>${escapeHtml(line.replace("Línea ", "L"))}</b><span>${escapeHtml(line)}</span></div><div class="production-gantt-lane">${dates.map(() => "<i></i>").join("")}${lineRows(line)}</div>`).join("")}
    </div></div>
    <footer class="production-gantt-legend"><span><i class="line-one"></i>Línea 1</span><span><i class="line-two"></i>Línea 2</span><small>Toca una barra para ver la orden completa.</small></footer>
  </section>`;
}

function wireProductionSchedule() {
  const moveWeek = (days) => {
    const date = new Date(`${state.productionWeekStart || productionMonday()}T12:00:00`);
    date.setDate(date.getDate() + days);
    state.productionWeekStart = productionMonday(date);
    localStorage.setItem(productionWeekStorageKey, state.productionWeekStart);
    renderDashboard();
  };
  document.querySelector("[data-production-week-prev]")?.addEventListener("click", () => moveWeek(-7));
  document.querySelector("[data-production-week-next]")?.addEventListener("click", () => moveWeek(7));
  document.querySelector("[data-production-week-today]")?.addEventListener("click", () => { state.productionWeekStart = productionMonday(); localStorage.setItem(productionWeekStorageKey, state.productionWeekStart); renderDashboard(); });
  document.querySelectorAll("[data-production-gantt-order]").forEach((button) => button.addEventListener("click", () => {
    const orderId = button.dataset.productionGanttOrder;
    if (orderId) openControlSalesMatrixDetail(orderId).catch((error) => alert(error.message || "No se pudo abrir la orden."));
  }));
}

function controlSalesIsConfirmed(order) {
  // Las ventas históricas importadas no participaron en el flujo de firmas.
  // Toda orden nueva requiere los dos vistos buenos antes de contabilizarse.
  return order?.source === "importado" || controlSalesOrderHasAuthorizedSignatures(order);
}

function normalizeOrderLinkNumber(value) {
  return String(value || "").replace(/^OP-/i, "").replace(/[^0-9A-Z]/gi, "").replace(/^0+(?=\d)/, "").toUpperCase();
}

function linkedFinancialOrderForControlSale(order) {
  const linkedId = String(order?.financialOrderId || "");
  if (linkedId) {
    const byId = state.financialOrders.find((item) => String(item.id) === linkedId);
    if (byId) return byId;
  }
  const controlNumber = normalizeOrderLinkNumber(order?.number);
  if (!controlNumber) return null;
  return state.financialOrders.find((item) => {
    const financialNumber = normalizeOrderLinkNumber(item.orderNumber || item.number);
    return financialNumber && financialNumber === controlNumber;
  }) || null;
}

function controlSalesEffectiveDate(order) {
  return String(linkedFinancialOrderForControlSale(order)?.date || order?.date || "").slice(0, 10);
}

function controlSalesFilteredRows() {
  const selectedPeriod = `${state.controlSalesPeriodYear}-${state.controlSalesPeriodMonth}`;
  return state.controlSales.filter((order) => {
    if (order.archived || !controlSalesIsConfirmed(order)) return false;
    return controlSalesEffectiveDate(order).slice(0, 7) === selectedPeriod;
  }).sort((a, b) => controlSalesEffectiveDate(b).localeCompare(controlSalesEffectiveDate(a)) || String(b.number).localeCompare(String(a.number), "es", { numeric: true }));
}

function renderControlSales() {
  const rows = controlSalesFilteredRows();
  const years = [...new Set([
    state.controlSalesPeriodYear,
    ...state.controlSales.map((order) => controlSalesEffectiveDate(order).slice(0, 4)).filter((year) => /^\d{4}$/.test(year))
  ])].sort((a, b) => Number(b) - Number(a));
  const pageSize = 15;
  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  state.controlSalesPage = Math.min(Math.max(state.controlSalesPage, 1), pages);
  const start = (state.controlSalesPage - 1) * pageSize;
  const visible = rows.slice(start, start + pageSize);
  const total = rows.reduce((sum, order) => sum + Number(order.totalCents || 0), 0);
  return `<section class="control-sales-shell">
    <header class="control-sales-period-summary">
      <div class="control-sales-period-total"><small>Total del periodo</small><strong>${formatControlSalesMoney(total)}</strong><span>${rows.length === 1 ? "1 orden" : `${rows.length} órdenes`}</span></div>
      <div class="control-sales-month-panel">
        <div><small>Periodo mensual</small><strong>Selecciona el mes a consultar</strong><span>La selección se conservará hasta que la cambies.</span></div>
        <label><span>Año</span><select data-control-sales-period-year>${years.map((year) => `<option value="${year}" ${state.controlSalesPeriodYear === year ? "selected" : ""}>${year}</option>`).join("")}</select></label>
        <label><span>Mes</span><select data-control-sales-period-month>${Array.from({ length: 12 }, (_, index) => {
          const value = String(index + 1).padStart(2, "0");
          return `<option value="${value}" ${state.controlSalesPeriodMonth === value ? "selected" : ""}>${monthLabel(index + 1)}</option>`;
        }).join("")}</select></label>
      </div>
    </header>
    <div class="control-sales-summary-wrap">
      <table class="control-sales-summary-table">
        <thead><tr><th>N.º de orden</th><th>Vendedor</th><th>Fecha</th><th>Cliente</th><th>Productos</th><th>Total</th></tr></thead>
        <tbody>${visible.map((order) => `<tr data-control-sales-matrix-view="${escapeHtml(order.id)}" tabindex="0" title="Ver detalle de la venta">
          <th><strong>${escapeHtml(formatOrderCorrelative(order.number))}</strong><small>${order.source === "importado" ? `ID ${escapeHtml(order.externalId)}` : "Pedido heredado"}</small></th>
          <td>${escapeHtml(controlSalesResponsibleSeller(order))}</td>
          <td>${formatDate(controlSalesEffectiveDate(order))}</td>
          <td>${escapeHtml(order.client || "—")}</td>
          <td><span class="control-sales-product-count">${order.details?.length || 0}</span></td>
          <td class="money">${formatControlSalesMoney(order.totalCents || 0)}</td>
        </tr>`).join("")}</tbody>
      </table>
      ${visible.length ? "" : `<div class="empty-state">No hay órdenes para el mes seleccionado.</div>`}
    </div>
    <footer class="control-sales-pagination"><span>Mostrando ${rows.length ? start + 1 : 0}-${Math.min(start + pageSize, rows.length)} de ${rows.length}</span><div><button type="button" data-control-sales-page="prev" ${state.controlSalesPage <= 1 ? "disabled" : ""}>Anterior</button><strong>Página ${state.controlSalesPage} de ${pages}</strong><button type="button" data-control-sales-page="next" ${state.controlSalesPage >= pages ? "disabled" : ""}>Siguiente</button></div></footer>
  </section>`;
}

function ensureControlSalesDialogs() {
  if (document.querySelector("#controlSalesDialog")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <dialog id="controlSalesDialog" class="wide-dialog control-sales-dialog"><form id="controlSalesForm" method="dialog">
      <header><div><p class="eyebrow">Operaciones</p><h3 id="controlSalesDialogTitle">Nueva orden</h3></div><button type="button" data-control-sales-close>×</button></header>
      <input type="hidden" id="controlSalesId"><input type="hidden" id="controlSalesFinancialOrderId"><input type="hidden" id="controlSalesSourceOpportunityId"><input type="hidden" id="controlSalesSourceQuotationId">
      <section class="control-sales-source-picker">
        <div class="control-sales-source-heading"><div><span>Pedido de origen</span><strong>Selecciona por correlativo o cliente</strong></div><small>Pedidos pendientes y oportunidades ganadas sin cotización ni orden.</small></div>
        <div id="controlSalesFinancialOrderSelected"></div>
        <details id="controlSalesFinancialOrderPicker" class="control-sales-source-dropdown">
          <summary><span><b>Elegir pedido u oportunidad ganada</b><small id="controlSalesFinancialOrderCount">0 orígenes</small></span><i aria-hidden="true">⌄</i></summary>
          <div class="control-sales-source-dropdown-panel">
            <label class="control-sales-source-search"><span>⌕</span><input id="controlSalesFinancialOrderSearch" type="search" autocomplete="off" placeholder="Buscar pedido, oportunidad, cliente o vendedor…"></label>
            <div class="control-sales-source-row-head" aria-hidden="true"><span>Fecha</span><span>Pedido</span><span>Cliente</span><span>Vendedor</span><span>Venta</span><span></span></div>
            <div id="controlSalesFinancialOrderResults" class="control-sales-source-results"></div>
          </div>
        </details>
      </section>
      <aside id="controlSalesOpportunityReference" class="control-sales-opportunity-reference hidden" aria-live="polite"></aside>
      <section class="control-sales-form-head"><label>Número de orden<input id="controlSalesNumber" required></label><label>Fecha<input id="controlSalesDate" type="date" required></label><label>Vendedor<input id="controlSalesSeller" required></label><label>Cliente<input id="controlSalesClient" required></label><label>Estado<select id="controlSalesOrderStatus"><option>Activa</option><option>En proceso</option><option>Completada</option></select></label></section>
      <details class="control-sales-proforma-block" open>
        <summary><span><b>Datos para proforma</b><small>Información comercial, fiscal, entrega y pago</small></span><i aria-hidden="true">⌄</i></summary>
        <div class="control-sales-proforma-grid">
          <label>Nombre comercial<input id="controlSalesCommercialName" autocomplete="organization"></label>
          <label>Razón social<input id="controlSalesLegalName"></label>
          <label>Giro<input id="controlSalesBusinessActivity"></label>
          <label>Encargado<input id="controlSalesContactName" autocomplete="name"></label>
          <label class="span-2">Dirección<input id="controlSalesAddress" autocomplete="street-address"></label>
          <label>Teléfono<input id="controlSalesPhone" type="tel" autocomplete="tel"></label>
          <label>Email<input id="controlSalesEmail" type="email" autocomplete="email"></label>
          <label>NIT<input id="controlSalesTaxId"></label>
          <label>Número de registro<input id="controlSalesRegistrationNumber"></label>
          <label>Tipo de contribuyente<input id="controlSalesTaxpayerType" list="controlSalesTaxpayerTypes"><datalist id="controlSalesTaxpayerTypes"><option value="Gran contribuyente"><option value="Mediano contribuyente"><option value="Pequeño contribuyente"><option value="No contribuyente"></datalist></label>
          <label>Fecha de entrega <small>Opcional · Operaciones</small><input id="controlSalesDeliveryDate" type="date"></label>
          <label>Condición de pago<select id="controlSalesPaymentTerms"><option>50% anticipo, 50% previo a la entrega del pedido</option><option>50% anticipo, 50% crédito a 15 días</option><option>50% anticipo, 50% crédito a 30 días</option><option>Crédito de 100% a 15 días</option><option>Crédito de 100% a 30 días</option><option>100% previo a la entrega del pedido</option></select></label>
          <label class="control-sales-strategy-field">Tipo de estrategia<select id="controlSalesStrategy"><option value="">Seleccionar estrategia</option><option>Retención</option><option>Expansión</option><option>Atracción</option><option>Recuperación</option></select></label>
          <label>Código de cliente<input id="controlSalesCustomerCode"></label>
          <label class="control-sales-perception-toggle"><input id="controlSalesPerceptionEnabled" type="checkbox"><span><b>Percepción 1%</b><small>Aplicar sobre el subtotal</small></span></label>
          <label class="span-4">Observaciones generales<textarea id="controlSalesGeneralNotes" rows="3"></textarea></label>
        </div>
      </details>
      <fieldset class="control-sales-tax-mode"><legend>Tipo de comprobante</legend><div class="control-sales-tax-options"><label><input type="radio" name="controlSalesDocumentType" value="CF" checked><span class="control-sales-tax-card"><b>CF</b><small>Precio final · sin IVA detallado</small><i aria-hidden="true">✓</i></span></label><label><input type="radio" name="controlSalesDocumentType" value="CCF"><span class="control-sales-tax-card"><b>CCF</b><small>Crédito fiscal · agrega 13% de IVA</small><i aria-hidden="true">✓</i></span></label></div></fieldset>
      <section class="control-sales-lines"><div class="control-sales-lines-title"><div><span>Detalle de productos</span><strong>Líneas dinámicas</strong></div><button type="button" data-control-sales-add-line>+ Agregar línea</button></div><div id="controlSalesLines"></div></section>
      <section class="control-sales-proforma-totals">
        <article><span>Subtotal</span><strong id="controlSalesSubtotal">$0.00</strong></article>
        <article><span>IVA 13%</span><strong id="controlSalesVatTotal">$0.00</strong></article>
        <article><span>Percepción 1%</span><strong id="controlSalesPerceptionTotal">$0.00</strong></article>
        <article><span>Total proforma</span><strong id="controlSalesProformaTotal">$0.00</strong></article>
      </section>
      <section id="controlSalesReconciliation" class="control-sales-reconciliation" data-state="empty">
        <article><span>Monto del pedido</span><strong id="controlSalesExpectedTotal">$0.00</strong><small>Valor a liquidar</small></article>
        <article><span>Total detallado</span><strong id="controlSalesDetailedTotal">$0.00</strong><small>Según CF o CCF</small></article>
        <article><span>Diferencia</span><strong id="controlSalesVariance">$0.00</strong><small id="controlSalesReconciliationMessage">Selecciona un pedido para conciliar.</small></article>
      </section>
      <details class="control-sales-proforma-block control-sales-financial-annex" open>
        <summary><span><b>Registro financiero del pedido</b><small data-financial-annex-help>Anexo al formulario heredado · se conserva dentro del mismo pedido</small></span><i>⌄</i></summary>
        <div class="control-sales-proforma-grid">
          <label>Número (automático)<input id="controlSalesFinancialNumber" readonly></label>
          <label>Mes<input id="controlSalesFinancialMonth" required></label>
          <label>Año<input id="controlSalesFinancialYear" type="number" required></label>
          <label>Fecha de ingreso<input id="controlSalesFinancialDate" type="date" required></label>
          <label>Vendedor<input id="controlSalesFinancialSeller" required></label>
          <label>Venta<input id="controlSalesFinancialSale" type="number" step="0.01" min="0.01" readonly required></label>
          <label>Nº de orden<input id="controlSalesFinancialOrderNumber" required></label>
          <label>Factura<select id="controlSalesFinancialInvoice">
            <option value="">Seleccionar factura</option>
            <option>CF</option>
            <option>CCF</option>
            <option>CE</option>
          </select></label>
          <label>Condiciones<input id="controlSalesFinancialConditions"></label>
          <label class="span-2">Cliente<input id="controlSalesFinancialClient" required></label>
          <label>Tipo de cliente<select id="controlSalesFinancialClientType">
            <option value="">Seleccionar tipo de cliente</option>
            <option>Empresa Privada</option>
            <option>Gobierno</option>
            <option>Instituciones Educativas</option>
            <option>ONG</option>
            <option>Ventas Detalle</option>
          </select></label>
          <label>Estrategia<input id="controlSalesFinancialStrategy"></label>
          <label>Gestión<select id="controlSalesFinancialManagement">
            <option>C. AYC</option>
            <option>C. ONLINE</option>
          </select></label>
          <label>País<input id="controlSalesFinancialCountry"></label>
          <label>Departamento<select id="controlSalesFinancialDepartment">${financialDepartmentOptionsMarkup()}</select></label>
        </div>
      </details>
      <p id="controlSalesSaveStatus" class="control-sales-save-status hidden" role="status" aria-live="polite"></p>
      <footer><div><span>Total consolidado</span><strong id="controlSalesFormTotal">$0.00</strong><small id="controlSalesFooterReconciliation">Selecciona un pedido para conciliar.</small></div><button type="button" class="ghost-btn" data-control-sales-close>Cancelar</button><button type="button" class="control-sales-print-btn" data-control-sales-print-draft>Vista previa / Imprimir</button><button type="submit" class="primary-btn">Guardar orden</button></footer>
    </form></dialog>
    <dialog id="controlSalesDetailDialog" class="wide-dialog control-sales-detail-dialog"><section id="controlSalesDetailContent"></section></dialog>
    <dialog id="controlSalesMatrixDetailDialog" class="wide-dialog control-sales-matrix-dialog"><section id="controlSalesMatrixDetailContent"></section></dialog>`);
  const formDialog = document.querySelector("#controlSalesDialog");
  const form = document.querySelector("#controlSalesForm");
  formDialog.addEventListener("close", () => {
    const returnOpportunityId = formDialog.dataset.returnToManagementOpportunityId;
    if (!returnOpportunityId) return;
    delete formDialog.dataset.returnToManagementOpportunityId;
    if (!managementDialog.open || managementOpportunityId.value !== returnOpportunityId) return;
    const managementItem = currentManagementItem();
    if (managementItem) renderManagementQuotations(managementItem);
  });
  formDialog.addEventListener("click", (event) => {
    if (event.target.matches("[data-control-sales-close]")) formDialog.close();
    if (event.target.matches("[data-control-sales-add-line]")) {
      document.querySelector("#controlSalesLines").insertAdjacentHTML("beforeend", controlSalesLineTemplate());
      updateControlSalesFormTotal();
    }
    if (event.target.matches("[data-control-sales-print-draft]")) {
      printControlSalesProforma(controlSalesDraftFromForm());
    }
    if (event.target.matches("[data-control-sales-remove-line]")) {
      const lines = document.querySelectorAll("#controlSalesLines .control-sales-line");
      if (lines.length <= 1) return alert("La orden debe conservar al menos una línea.");
      event.target.closest(".control-sales-line").remove();
      updateControlSalesFormTotal();
    }
    if (event.target.closest("[data-control-sales-source-id]")) {
      const source = event.target.closest("[data-control-sales-source-id]");
      selectControlSalesFinancialOrder(source.dataset.controlSalesSourceId);
    }
    if (event.target.closest("[data-control-sales-opportunity-id]")) {
      const source = event.target.closest("[data-control-sales-opportunity-id]");
      selectControlSalesWonOpportunity(source.dataset.controlSalesOpportunityId);
    }
    if (event.target.matches("[data-control-sales-source-clear]")) {
      document.querySelector("#controlSalesSourceOpportunityId").value = "";
      document.querySelector("#controlSalesSourceQuotationId").value = "";
      document.querySelector("#controlSalesOpportunityReference").classList.add("hidden");
      setControlSalesFinancialOrderSelection(null);
      const search = document.querySelector("#controlSalesFinancialOrderSearch");
      search.value = "";
      document.querySelector("#controlSalesFinancialOrderPicker").open = true;
      search.focus();
      renderControlSalesFinancialOrderResults("");
    }
  });
  formDialog.addEventListener("input", (event) => {
    if (event.target.closest(".control-sales-line")) updateControlSalesFormTotal();
    if (event.target.matches("#controlSalesNumber, #controlSalesDate, #controlSalesSeller, #controlSalesClient")) syncControlSalesFinancialData();
    if (event.target.matches("#controlSalesFinancialOrderSearch")) {
      renderControlSalesFinancialOrderResults(event.target.value);
    }
  });
  formDialog.addEventListener("change", (event) => {
    if (event.target.matches('input[name="controlSalesDocumentType"], #controlSalesPerceptionEnabled')) updateControlSalesFormTotal();
    if (event.target.matches("#controlSalesDate")) syncControlSalesFinancialData();
  });
  document.querySelector("#controlSalesFinancialOrderPicker").addEventListener("toggle", (event) => {
    if (event.target.open) {
      const search = document.querySelector("#controlSalesFinancialOrderSearch");
      requestAnimationFrame(() => search?.focus({ preventScroll: true }));
    }
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const details = [...document.querySelectorAll("#controlSalesLines .control-sales-line")].map((line) => ({
      id: line.dataset.lineId, product: line.querySelector("[data-line-product]").value.trim(),
      size: line.querySelector("[data-line-size]").value.trim(), quantity: normalizeControlSalesDecimal(line.querySelector("[data-line-quantity]").value),
      unitPrice: line.querySelector("[data-line-price]").value, vat: line.querySelector("[data-line-vat]").value || "0",
      notes: line.querySelector("[data-line-notes]").value.trim()
    }));
    const id = document.querySelector("#controlSalesId").value;
    syncControlSalesFinancialData();
    const submit = form.querySelector('button[type="submit"]');
    const saveStatus = document.querySelector("#controlSalesSaveStatus");
    submit.disabled = true;
    saveStatus.classList.add("hidden");
    saveStatus.dataset.tone = "success";
    try {
      const linkedFinancialOrder = await saveControlSalesFinancialData(document.querySelector("#controlSalesFinancialOrderId").value);
      document.querySelector("#controlSalesFinancialOrderId").value = linkedFinancialOrder.id;
      if (formDialog.dataset.financialCompletionOnly === "true") {
        await loadControlSales();
        if (state.activeArea === "comercializacion" && state.activeSubmenu === "resultados-pedidos") {
          renderCommercialSubmenu(areas.comercializacion);
        }
        saveStatus.innerHTML = `<span aria-hidden="true">✓</span><div><strong>Registro financiero guardado</strong><small>El primer visto bueno se conservó. Ya puedes cerrar y firmar la orden.</small></div>`;
        saveStatus.classList.remove("hidden");
        submit.textContent = "Registro financiero guardado";
        return;
      }
      const payload = { financialOrderId:linkedFinancialOrder.id, sourceOpportunityId:document.querySelector("#controlSalesSourceOpportunityId").value, sourceQuotationId:document.querySelector("#controlSalesSourceQuotationId").value, number:document.querySelector("#controlSalesNumber").value.trim(), date:document.querySelector("#controlSalesDate").value, seller:document.querySelector("#controlSalesSeller").value.trim(), client:document.querySelector("#controlSalesClient").value.trim(), status:document.querySelector("#controlSalesOrderStatus").value, documentType:form.querySelector('input[name="controlSalesDocumentType"]:checked')?.value || "CF", proformaData:collectControlSalesProformaData(), details, updatedBy:state.currentUser?.name || "Sistema Gerencial" };
      const response = await apiJson(id ? `/api/control-sales/${encodeURIComponent(id)}` : "/api/control-sales", { method:id ? "PUT" : "POST", body:JSON.stringify(payload) });
      const savedOrder = response.item;
      const completedDirectFlow = formDialog.dataset.directOrderFlow === "true";
      document.querySelector("#controlSalesId").value = savedOrder.id;
      document.querySelector("#controlSalesDialogTitle").textContent = `Editar pedido #${savedOrder.number}`;
      submit.textContent = "Guardar cambios";
      await loadControlSales();
      await loadQuotations();
      if (state.activeArea === "comercializacion" && state.activeSubmenu === "resultados-pedidos") {
        renderCommercialSubmenu(areas.comercializacion);
      }
      if (completedDirectFlow) {
        state.financialOrdersView = "notifications";
        saveFinancialOrderFilters();
        formDialog.close();
        if (state.activeArea === "comercializacion" && state.activeSubmenu === "resultados-pedidos") {
          renderCommercialSubmenu(areas.comercializacion);
        }
        return;
      }
      if (savedOrder.sourceOpportunityId) {
        const sourceOpportunity = getOpportunitySubmenu().items.find((item) => (
          [item.id, item.crmOpportunityId, item.sourceOpportunityId]
            .map((value) => String(value || ""))
            .includes(String(savedOrder.sourceOpportunityId))
        ));
        if (sourceOpportunity) {
          sourceOpportunity.orderHandoff = {
            ...(sourceOpportunity.orderHandoff || {}),
            status: "converted",
            orderId: savedOrder.id,
            quotationId: savedOrder.sourceQuotationId || "",
            convertedAt: new Date().toISOString()
          };
          saveOpportunities();
          if (managementDialog.open && managementOpportunityId.value === String(sourceOpportunity.id)) {
            renderManagementQuotations(sourceOpportunity);
            updateClosureControls();
          }
        }
      }
      if (formDialog.dataset.orderFormatOnly === "true" && state.activeSubmenu === "crm-seguimiento") {
        renderCommercialSubmenu(areas.comercializacion);
      }
      saveStatus.innerHTML = `<span aria-hidden="true">✓</span><div><strong>${id ? "Cambios guardados" : "Pedido guardado"} correctamente</strong><small>Puedes continuar editando o imprimir el pedido.</small></div>`;
      saveStatus.classList.remove("hidden");
    } catch (error) {
      saveStatus.innerHTML = `<span aria-hidden="true">!</span><div><strong>No se pudieron guardar los cambios</strong><small>Revisa los campos e inténtalo nuevamente.</small></div>`;
      saveStatus.classList.remove("hidden");
      saveStatus.dataset.tone = "error";
      alert("No fue posible guardar la orden. Verifica los campos, precios y que el número no esté repetido.");
    } finally { submit.disabled = false; }
  });
  const detailDialog = document.querySelector("#controlSalesDetailDialog");
  detailDialog.addEventListener("click", (event) => {
    if (event.target.matches("[data-control-sales-detail-close]")) detailDialog.close();
    if (event.target.matches("[data-control-sales-detail-print]")) {
      const order = detailDialog.controlSalesOrder
        || state.controlSales.find((item) => item.id === event.target.dataset.controlSalesDetailPrint);
      if (order) printControlSalesProforma(order);
    }
    if (event.target.matches("[data-control-sales-detail-edit]")) {
      const order = state.controlSales.find((item) => item.id === event.target.dataset.controlSalesDetailEdit);
      const formatOnly = detailDialog.dataset.orderFormatOnly === "true";
      detailDialog.close();
      if (order) openControlSalesForm(order, null, null, formatOnly);
    }
    if (event.target.matches("[data-control-sales-detail-archive]")) {
      const order = state.controlSales.find((item) => item.id === event.target.dataset.controlSalesDetailArchive);
      if (!order || !confirm(`¿Anular el pedido #${order.number}? El cierre ganado se conservará.`)) return;
      const button = event.target;
      button.disabled = true;
      apiJson(`/api/control-sales/${encodeURIComponent(order.id)}`, {
        method: "PATCH",
        body: JSON.stringify({ archived: true, reason: "Anulado desde histórico de ganadas", updatedBy: state.currentUser?.name })
      }).then(() => loadControlSales()).then(() => {
        detailDialog.close();
        if (state.activeSubmenu === "crm-seguimiento") renderCommercialSubmenu(areas.comercializacion);
      }).catch(() => {
        button.disabled = false;
        alert("No se pudo anular el pedido.");
      });
    }
  });
}

function normalizeControlSalesDecimal(value) {
  return String(value ?? "").trim().replace(/\s+/g, "").replace(",", ".");
}

function parseControlSalesDecimal(value) {
  const parsed = Number(normalizeControlSalesDecimal(value));
  return Number.isFinite(parsed) ? parsed : 0;
}

const CONTROL_SALES_PROFORMA_FIELDS = {
  commercialName: "controlSalesCommercialName",
  legalName: "controlSalesLegalName",
  businessActivity: "controlSalesBusinessActivity",
  contactName: "controlSalesContactName",
  phone: "controlSalesPhone",
  address: "controlSalesAddress",
  email: "controlSalesEmail",
  taxId: "controlSalesTaxId",
  registrationNumber: "controlSalesRegistrationNumber",
  taxpayerType: "controlSalesTaxpayerType",
  deliveryDate: "controlSalesDeliveryDate",
  paymentTerms: "controlSalesPaymentTerms",
  strategy: "controlSalesStrategy",
  customerCode: "controlSalesCustomerCode",
  generalNotes: "controlSalesGeneralNotes"
};

const CONTROL_SALES_FINANCIAL_FIELDS = {
  number: "controlSalesFinancialNumber",
  month: "controlSalesFinancialMonth",
  year: "controlSalesFinancialYear",
  date: "controlSalesFinancialDate",
  seller: "controlSalesFinancialSeller",
  sale: "controlSalesFinancialSale",
  orderNumber: "controlSalesFinancialOrderNumber",
  invoice: "controlSalesFinancialInvoice",
  conditions: "controlSalesFinancialConditions",
  client: "controlSalesFinancialClient",
  clientType: "controlSalesFinancialClientType",
  strategy: "controlSalesFinancialStrategy",
  management: "controlSalesFinancialManagement",
  country: "controlSalesFinancialCountry",
  department: "controlSalesFinancialDepartment"
};

function collectControlSalesFinancialData() {
  const data = Object.fromEntries(Object.entries(CONTROL_SALES_FINANCIAL_FIELDS).map(([key, id]) => [
    key,
    document.querySelector(`#${id}`)?.value.trim() || ""
  ]));
  data.sale = Number(data.sale || 0);
  return data;
}

function inheritedFinancialValue(currentValue, inheritedValue) {
  const emptyMarkers = new Set(["", "none", "null", "undefined", "n/a", "na"]);
  const current = String(currentValue ?? "").trim();
  if (!emptyMarkers.has(normalizeKey(current))) return current;
  const inherited = String(inheritedValue ?? "").trim();
  return emptyMarkers.has(normalizeKey(inherited)) ? "" : inherited;
}

function fillControlSalesFinancialData(data = {}, order = null) {
  const date = data.date || order?.date || todayISO();
  const [year, monthNumber] = String(date).split("-").map(Number);
  const defaults = {
    number: data.number || order?.number || nextFinancialOrderNumber(),
    month: data.month || monthLabel(monthNumber || new Date().getMonth() + 1),
    year: data.year || year || new Date().getFullYear(),
    date,
    seller: data.seller || order?.seller || "",
    sale: data.sale ?? (Number(order?.totalCents || 0) / 100),
    orderNumber: data.orderNumber || order?.number || "",
    invoice: data.invoice || "",
    conditions: data.conditions || order?.proformaData?.paymentTerms || "",
    client: data.client || order?.client || "",
    clientType: inheritedFinancialValue(data.clientType, order?.proformaData?.taxpayerType),
    strategy: inheritedFinancialValue(data.strategy, order?.proformaData?.strategy),
    management: data.management || "C. AYC",
    country: data.country || "El Salvador",
    department: data.department || ""
  };
  Object.entries(CONTROL_SALES_FINANCIAL_FIELDS).forEach(([key, id]) => {
    const field = document.querySelector(`#${id}`);
    if (field) field.value = defaults[key] ?? "";
  });
}

function syncControlSalesFinancialData() {
  const date = document.querySelector("#controlSalesDate")?.value || todayISO();
  const [year, monthNumber] = date.split("-").map(Number);
  const values = {
    date,
    year: year || new Date().getFullYear(),
    month: monthLabel(monthNumber || new Date().getMonth() + 1),
    seller: document.querySelector("#controlSalesSeller")?.value || "",
    client: document.querySelector("#controlSalesClient")?.value || "",
    sale: (controlSalesDraftFromForm().totalCents / 100).toFixed(2),
    orderNumber: document.querySelector("#controlSalesNumber")?.value || ""
  };
  Object.entries(values).forEach(([key, value]) => {
    const field = document.querySelector(`#${CONTROL_SALES_FINANCIAL_FIELDS[key]}`);
    if (field) field.value = value;
  });
}

async function saveControlSalesFinancialData(existingId = "") {
  const payload = collectControlSalesFinancialData();
  const existing = state.financialOrders.find((item) => String(item.id) === String(existingId));
  const now = new Date().toISOString();
  const pending = existing
    ? { ...existing, ...payload, updatedAt: now, updatedBy: state.currentUser?.name || "Sistema Gerencial" }
    : { id: crypto.randomUUID(), source: "manual", createdAt: now, createdBy: state.currentUser?.name || "Sistema Gerencial", updatedAt: now, updatedBy: state.currentUser?.name || "Sistema Gerencial", ...payload };
  let saved = pending;
  if (apiEnabled) {
    const response = await apiJson(existing ? `/api/financial-orders/${encodeURIComponent(existing.id)}` : "/api/financial-orders", {
      method: existing ? "PUT" : "POST",
      body: JSON.stringify(existing ? pending : { ...pending, autoNumber: true })
    });
    saved = response.item;
  }
  const index = state.financialOrders.findIndex((item) => item.id === saved.id);
  if (index >= 0) state.financialOrders[index] = saved;
  else state.financialOrders.unshift(saved);
  saveFinancialOrders();
  return saved;
}

function collectControlSalesProformaData() {
  const data = Object.fromEntries(Object.entries(CONTROL_SALES_PROFORMA_FIELDS).map(([key, id]) => [
    key,
    document.querySelector(`#${id}`)?.value.trim() || ""
  ]));
  data.perceptionEnabled = Boolean(document.querySelector("#controlSalesPerceptionEnabled")?.checked);
  if (document.querySelector("#controlSalesDialog")?.dataset.directOrderFlow === "true") data.workflow = "direct-final-only";
  return data;
}

function fillControlSalesProformaData(data = {}, order = null) {
  Object.entries(CONTROL_SALES_PROFORMA_FIELDS).forEach(([key, id]) => {
    const field = document.querySelector(`#${id}`);
    if (field) field.value = data[key] || (key === "commercialName" ? order?.client || "" : "");
  });
  const perception = document.querySelector("#controlSalesPerceptionEnabled");
  if (perception) perception.checked = Boolean(data.perceptionEnabled);
}

function controlSalesLinkedFinancialOrderIds(currentOrderId = "") {
  return new Set(state.controlSales
    .filter((order) => order.id !== currentOrderId)
    .map((order) => String(order.financialOrderId || ""))
    .filter(Boolean));
}

const QUOTATIONS_STORAGE_KEY = "sistemaGerencial.cotizaciones.v1";

async function loadQuotations() {
  if (apiEnabled) {
    try {
      const items = await apiJson("/api/quotations");
      state.quotations = Array.isArray(items) ? items : [];
      return state.quotations;
    } catch (error) { console.warn("No fue posible cargar las cotizaciones", error); }
  }
  try { state.quotations = JSON.parse(localStorage.getItem(QUOTATIONS_STORAGE_KEY) || "[]"); }
  catch { state.quotations = []; }
  return state.quotations;
}

function controlSalesResponsibleSeller(order = {}) {
  const financialOrder = state.financialOrders?.find((item) => String(item.id || "") === String(order.financialOrderId || ""));
  const opportunities = getOpportunitySubmenu().items;
  const sourceIds = new Set([
    order.sourceOpportunityId,
    financialOrder?.sourceOpportunityId,
    financialOrder?.crmOpportunityId
  ].map((value) => String(value || "")).filter(Boolean));
  const opportunity = opportunities.find((item) => (
    [item.id, item.crmOpportunityId, item.sourceOpportunityId]
      .map((value) => String(value || ""))
      .some((value) => value && sourceIds.has(value))
  ));
  if (opportunity?.seller) return opportunity.seller;

  // Algunas ordenes historicas no conservaron el identificador de la oportunidad.
  // En esos casos recuperamos al vendedor comercial por el cliente de origen.
  const clientKey = normalizeBusinessMatch(order.client || financialOrder?.client || "");
  const clientMatches = clientKey
    ? opportunities
      .filter((item) => normalizeBusinessMatch(item.company || item.client || "") === clientKey && item.seller)
      .sort((a, b) => {
        const wonDifference = Number(closureResult(b)?.result === "ganado") - Number(closureResult(a)?.result === "ganado");
        if (wonDifference) return wonDifference;
        const dateA = closureResult(a)?.date || a.updatedAt || a.date || "";
        const dateB = closureResult(b)?.date || b.updatedAt || b.date || "";
        return String(dateB).localeCompare(String(dateA));
      })
    : [];
  if (clientMatches[0]?.seller) return clientMatches[0].seller;

  return financialOrder?.seller || order.seller || "Sin vendedor";
}

function approvalControlSalesOrders() {
  return state.controlSales
    .filter((order) => !order.archived && order.sourceOpportunityId)
    .sort((a, b) => String(b.createdAt || b.date).localeCompare(String(a.createdAt || a.date)));
}

function isDirectOrderFlow(order = {}) {
  return order?.proformaData?.workflow === "direct-final-only"
    || String(order?.sourceOpportunityId || "").startsWith("direct-order:");
}

function commercialPendingApprovalOrders() {
  return approvalControlSalesOrders().filter((order) => !isDirectOrderFlow(order) && order.commercialApprovalStatus !== "Autorizada");
}

function financePendingApprovalOrders() {
  return approvalControlSalesOrders().filter((order) => (
    (isDirectOrderFlow(order) || order.commercialApprovalStatus === "Autorizada" || Boolean(order.commercialApprovedAt))
    && !controlSalesOrderHasAuthorizedSignatures(order)
  ));
}

const FINANCIAL_ORDER_REQUIRED_FIELDS = {
  number: "Número",
  month: "Mes",
  year: "Año",
  date: "Fecha de ingreso",
  seller: "Vendedor",
  sale: "Venta",
  orderNumber: "N.º de orden",
  client: "Cliente"
};

function financialRecordForControlOrder(order) {
  return state.financialOrders.find((item) => String(item.id) === String(order?.financialOrderId || "")) || null;
}

function missingFinancialOrderFields(order) {
  const record = financialRecordForControlOrder(order);
  if (!record) return Object.values(FINANCIAL_ORDER_REQUIRED_FIELDS);
  return Object.entries(FINANCIAL_ORDER_REQUIRED_FIELDS)
    .filter(([key]) => key === "sale" ? Number(record.sale || 0) <= 0 : !String(record[key] ?? "").trim())
    .map(([, label]) => label);
}

function savedQuotationRows() {
  return [...state.quotations]
    .sort((a, b) => String(b.number).localeCompare(String(a.number), "es", { numeric: true }));
}

function canManageQuotation(quotation) {
  if (state.currentUser?.role !== "operativos") return true;
  const opportunity = crmOpportunityForQuotation(quotation.opportunityId);
  return Boolean(opportunity && canManageCrmOpportunity(opportunity));
}

function availableQuotationOpportunities() {
  const crmRows = state.crmData?.opportunities || [];
  const crmById = new Map(crmRows.map((opportunity) => [String(opportunity.id), opportunity]));
  const managementRows = getOpportunitySubmenu().items
    .filter((item) => !closureResult(item))
    .map((item) => quotationOpportunityFromManagementItem(item, crmById));
  const managementCrmIds = new Set(managementRows
    .map((opportunity) => String(opportunity.crmOpportunityId || opportunity.id || ""))
    .filter(Boolean));
  const sellerRows = crmRows
    .filter((opportunity) => !opportunity.cancelledAt && !opportunity.cancellationReason)
    .filter((opportunity) => normalizeKey(opportunity.status || "Vigente") !== "ganada")
    .filter((opportunity) => !isCrmArchivedOpportunity(opportunity))
    .filter((opportunity) => !managementCrmIds.has(String(opportunity.id)))
    .map((opportunity) => ({ ...opportunity, _quotationSource: "seller" }));
  const unique = new Map();
  [...managementRows, ...sellerRows]
    .filter(canManageQuotationOpportunity)
    .forEach((opportunity) => unique.set(String(opportunity.id), opportunity));
  return [...unique.values()]
    .sort((a, b) => String(a.company || "").localeCompare(String(b.company || ""), "es"));
}

function quotationOpportunityFromManagementItem(item = {}, crmById = null) {
  const source = item.crmOpportunityId
    ? (crmById?.get(String(item.crmOpportunityId)) || state.crmData?.opportunities?.find((opportunity) => String(opportunity.id) === String(item.crmOpportunityId)))
    : null;
  return {
    ...(source || {}),
    id: source?.id || item.id,
    crmOpportunityId: item.crmOpportunityId || source?.id || "",
    resultOpportunityId: item.id || "",
    company: item.company || source?.company || "Oportunidad sin nombre",
    seller: item.seller || source?.seller || crmOwnerName(source?.ownerId),
    contact: item.contact || source?.contact || "",
    phone: item.phone || source?.phone || "",
    location: item.location || source?.location || "",
    segment: item.segment || source?.segment || source?.product || "",
    product: source?.product || item.segment || item.product || "",
    estimatedAmount: Number(item.amount ?? source?.estimatedAmount ?? 0),
    stageId: item.stage || source?.stageId || "Oportunidad Gerencia",
    _quotationSource: "management"
  };
}

function canManageQuotationOpportunity(opportunity = {}) {
  if (state.currentUser?.role !== "operativos" || isAdminUser()) return true;
  if (opportunity.ownerId) return canManageCrmOpportunity(opportunity);
  const linkedSellerId = crmLinkedSellerId();
  const linkedSeller = (state.crmData?.sellers || state.crmData?.users || []).find((seller) => String(seller.id) === String(linkedSellerId));
  return Boolean(linkedSeller && crmIdentityKey(opportunity.seller) === crmIdentityKey(linkedSeller.name));
}

function quotationOpportunitySellerName(opportunity = {}) {
  return crmOwnerName(opportunity.ownerId) || opportunity.seller || "Sin vendedor asignado";
}

function quotationOpportunitySource(opportunity = {}) {
  const isManagement = opportunity._quotationSource === "management"
    || Boolean(opportunity.migratedToResults)
    || opportunityMigratedFromCrm(opportunity.id);
  return isManagement
    ? { key: "management", label: "Oportunidad Gerencia" }
    : { key: "seller", label: "Oportunidad Vendedores" };
}

function openQuotationOpportunityPicker() {
  const opportunities = availableQuotationOpportunities();
  if (!opportunities.length) {
    alert("No hay oportunidades vigentes disponibles en tu cartera para crear una cotización.");
    return;
  }
  document.querySelector("#quotationOpportunityPicker")?.remove();
  document.body.insertAdjacentHTML("beforeend", `
    <dialog id="quotationOpportunityPicker" class="quotation-opportunity-picker">
      <section>
        <header>
          <div><span>Nueva cotización</span><h3>Seleccionar oportunidad vigente</h3><p>Busca y elige la oportunidad que dará origen a la cotización.</p></div>
          <button type="button" data-quotation-picker-close aria-label="Cerrar">×</button>
        </header>
        <label class="quotation-opportunity-picker__search"><span aria-hidden="true">⌕</span><input type="search" data-quotation-picker-search placeholder="Buscar empresa, vendedor, producto o etapa..." autocomplete="off"></label>
        <div class="quotation-opportunity-picker__summary"><strong data-quotation-picker-count>${opportunities.length}</strong><span>oportunidades vigentes disponibles</span></div>
        <div class="quotation-opportunity-picker__list" data-quotation-picker-list></div>
        <footer><button type="button" data-quotation-picker-close>Cancelar</button></footer>
      </section>
    </dialog>`);
  const dialog = document.querySelector("#quotationOpportunityPicker");
  const search = dialog.querySelector("[data-quotation-picker-search]");
  const searchBox = search.closest("label");
  const list = dialog.querySelector("[data-quotation-picker-list]");
  const count = dialog.querySelector("[data-quotation-picker-count]");
  const summary = count.closest(".quotation-opportunity-picker__summary");
  const footer = dialog.querySelector("footer");
  const heading = dialog.querySelector("header h3");
  const description = dialog.querySelector("header p");
  const renderPreview = (opportunity) => {
    const seller = quotationOpportunitySellerName(opportunity);
    const source = quotationOpportunitySource(opportunity);
    searchBox.hidden = true;
    summary.hidden = true;
    footer.hidden = true;
    heading.textContent = "Confirmar oportunidad";
    description.textContent = "Verifica los datos antes de iniciar la cotización.";
    list.innerHTML = `
      <section class="quotation-opportunity-preview">
        <div class="quotation-opportunity-preview__hero">
          <div><span>Cliente / oportunidad</span><h4>${escapeHtml(opportunity.company || "Oportunidad sin nombre")}</h4><p>${escapeHtml(opportunity.product || "Producto pendiente")}</p><em class="quotation-opportunity-source" data-source="${source.key}"><i></i>${source.label}</em></div>
          <strong>${formatMoney(opportunity.estimatedAmount || 0)}</strong>
        </div>
        <div class="quotation-opportunity-preview__grid">
          <article><small>Vendedor responsable</small><strong>${escapeHtml(seller)}</strong></article>
          <article><small>Etapa actual</small><strong>${escapeHtml(opportunity.stage?.name || opportunity.stageId || "Sin etapa")}</strong></article>
          <article><small>Estado</small><strong>${escapeHtml(opportunity.status || "Vigente")}</strong></article>
          <article><small>Probabilidad de cierre</small><strong>${Number(opportunity.closePercent || 0)}%</strong></article>
          <article><small>Contacto</small><strong>${escapeHtml(opportunity.contact || "Sin contacto registrado")}</strong></article>
          <article><small>Teléfono</small><strong>${escapeHtml(opportunity.phone || "Sin teléfono registrado")}</strong></article>
          <article><small>Segmento</small><strong>${escapeHtml(opportunity.segment || "Sin segmento")}</strong></article>
          <article><small>Fecha estimada de cierre</small><strong>${opportunity.deadline ? formatDate(opportunity.deadline) : "Sin fecha registrada"}</strong></article>
        </div>
        <div class="quotation-opportunity-preview__notice"><span aria-hidden="true">✓</span><p>La cotización heredará esta oportunidad y el vendedor indicado. Podrás revisar los datos comerciales antes de guardarla.</p></div>
        <div class="quotation-opportunity-preview__actions">
          <button type="button" data-quotation-preview-back>← Volver a la lista</button>
          <button type="button" class="primary" data-quotation-preview-confirm="${escapeHtml(opportunity.id)}">Crear cotización para esta oportunidad</button>
        </div>
      </section>`;
    list.querySelector("[data-quotation-preview-back]")?.addEventListener("click", () => {
      renderOptions();
      search.focus();
    });
    list.querySelector("[data-quotation-preview-confirm]")?.addEventListener("click", (event) => {
      const opportunityId = event.currentTarget.dataset.quotationPreviewConfirm;
      const selectedOpportunity = opportunities.find((item) => String(item.id) === String(opportunityId));
      dialog.close();
      openQuotationDialog(opportunityId, "", selectedOpportunity || null);
    });
  };
  const renderOptions = () => {
    searchBox.hidden = false;
    summary.hidden = false;
    footer.hidden = false;
    heading.textContent = "Seleccionar oportunidad vigente";
    description.textContent = "Busca y revisa la oportunidad que dará origen a la cotización.";
    const tokens = normalizeKey(search.value).split(/\s+/).filter(Boolean);
    const visible = opportunities.filter((opportunity) => {
      const seller = quotationOpportunitySellerName(opportunity);
      const source = quotationOpportunitySource(opportunity);
      const index = normalizeKey(`${opportunity.company || ""} ${seller} ${opportunity.product || ""} ${opportunity.stage?.name || opportunity.stageId || ""} ${opportunity.status || "Vigente"} ${source.label}`);
      return tokens.every((token) => index.includes(token));
    });
    count.textContent = String(visible.length);
    list.innerHTML = visible.length ? visible.map((opportunity) => {
      const source = quotationOpportunitySource(opportunity);
      return `
      <button type="button" class="quotation-opportunity-option" data-quotation-picker-preview="${escapeHtml(opportunity.id)}" aria-label="Vista preliminar de ${escapeHtml(opportunity.company || "la oportunidad")}">
        <span class="quotation-opportunity-option__main"><strong>${escapeHtml(opportunity.company || "Oportunidad sin nombre")}</strong><small>${escapeHtml(opportunity.product || "Producto pendiente")}</small><em class="quotation-opportunity-source" data-source="${source.key}"><i></i>${source.label}</em></span>
        <span><small>Vendedor</small><strong>${escapeHtml(quotationOpportunitySellerName(opportunity))}</strong></span>
        <span><small>Etapa</small><strong>${escapeHtml(opportunity.stage?.name || opportunity.stageId || "Sin etapa")}</strong></span>
        <span class="quotation-opportunity-option__amount"><small>Monto</small><strong>${formatMoney(opportunity.estimatedAmount || 0)}</strong></span>
        <i aria-hidden="true" title="Vista preliminar">⌕</i>
      </button>`;
    }).join("") : `<div class="quotation-opportunity-picker__empty"><strong>Sin coincidencias</strong><span>Prueba con otro nombre, vendedor, producto, etapa u origen.</span></div>`;
    list.querySelectorAll("[data-quotation-picker-preview]").forEach((button) => button.addEventListener("click", () => {
      const opportunity = opportunities.find((item) => String(item.id) === String(button.dataset.quotationPickerPreview));
      if (opportunity) renderPreview(opportunity);
    }));
  };
  dialog.querySelectorAll("[data-quotation-picker-close]").forEach((button) => button.addEventListener("click", () => dialog.close()));
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  search.addEventListener("input", renderOptions);
  renderOptions();
  dialog.showModal();
  search.focus();
}

function renderQuotationsModule() {
  const queryTokens = normalizeKey(state.quotationModuleQuery).split(/\s+/).filter(Boolean);
  const rows = [...state.quotations]
    .filter(canManageQuotation)
    .filter((quotation) => {
      if (!queryTokens.length) return true;
      const productText = (quotation.lines || []).map((line) => `${line.description || ""} ${line.size || ""} ${line.notes || ""} ${line.quantity || ""} ${line.unitPriceCents || ""}`).join(" ");
      const searchIndex = normalizeKey(`${quotation.number || ""} ${quotation.client || ""} ${quotation.company || ""} ${quotation.customerData?.commercialName || ""} ${quotation.customerData?.legalName || ""} ${quotation.customerData?.taxId || ""} ${quotation.seller || ""} ${quotation.status || ""} ${quotation.date || ""} ${formatDate(quotation.date)} ${quotation.validity || ""} ${quotation.totalCents || ""} ${formatControlSalesMoney(quotation.totalCents || 0)} ${productText}`);
      return queryTokens.every((token) => searchIndex.includes(token));
    })
    .sort((a, b) => String(b.updatedAt || b.date || "").localeCompare(String(a.updatedAt || a.date || "")));
  const hasAvailableOpportunities = availableQuotationOpportunities().length > 0;
  const visibleTotal = rows.reduce((sum, quotation) => sum + Number(quotation.totalCents || 0), 0);
  const pageCount = Math.max(1, Math.ceil(rows.length / quotationModulePageSize));
  state.quotationModulePage = Math.min(Math.max(Number(state.quotationModulePage) || 1, 1), pageCount);
  const pageStart = (state.quotationModulePage - 1) * quotationModulePageSize;
  const pageEnd = pageStart + quotationModulePageSize;
  const visibleStart = rows.length ? pageStart + 1 : 0;
  const pagedRows = rows.slice(pageStart, pageEnd);
  const emptyRowCount = quotationModulePageSize - pagedRows.length;
  return `
    <section class="quotations-module" aria-label="Módulo de cotizaciones">
      <header class="quotations-module__toolbar">
        <label class="quotations-module__search"><span aria-hidden="true">⌕</span><input type="search" data-quotation-module-search value="${escapeHtml(state.quotationModuleQuery)}" placeholder="Buscar cliente, vendedor, estado, fecha o producto..."></label>
        <div class="quotations-module__total"><small>TOTAL</small><strong>${formatControlSalesMoney(visibleTotal)}</strong></div>
        <button type="button" class="quotations-module__new" data-quotation-module-create ${hasAvailableOpportunities ? "" : "disabled"}><span aria-hidden="true">＋</span>Nuevo registro</button>
      </header>
      <div class="quotation-table-head">
        <strong>Fecha</strong>
        <strong>Cliente</strong>
        <strong>Vendedor</strong><strong>Detalle</strong><strong>Total</strong><strong>Acciones</strong>
      </div>
      <div class="quotation-table-body">
        ${pagedRows.map((quotation) => {
          const linkedOrder = quotationLinkedOrder(quotation);
          return `
          <article class="quotation-table-row ${linkedOrder ? "has-order" : "quotation-only"}">
            <span>${formatDate(quotation.date)}</span>
            <div class="quotation-table-row__client"><strong>${escapeHtml(quotation.customerData?.commercialName || quotation.client || "Sin cliente")}</strong><span class="quotation-record__status" data-status="${linkedOrder ? "orden-creada" : "solo-cotizacion"}">${linkedOrder ? `OP #${escapeHtml(linkedOrder.number || "—")} creada` : "Solo cotización"}</span></div>
            <span>${escapeHtml(quotation.seller || "Sin vendedor")}</span>
            <span class="quotation-table-row__detail"><strong>${(quotation.lines || []).length} ${(quotation.lines || []).length === 1 ? "línea" : "líneas"}</strong><small>${escapeHtml((quotation.lines || [])[0]?.description || "Sin descripción")}</small></span>
            <strong class="quotation-table-row__amount">${formatControlSalesMoney(quotation.totalCents || 0)}</strong>
            <div class="quotation-record__actions">
              <button type="button" class="quotation-action view-quotation" data-quotation-module-view="${escapeHtml(quotation.id)}" aria-label="Ver cotización" title="Ver cotización"><span aria-hidden="true">👁</span></button>
              <button type="button" class="quotation-action view-order" ${linkedOrder ? `data-quotation-module-order="${escapeHtml(linkedOrder.id)}"` : "disabled"} aria-label="${linkedOrder ? "Ver orden de pedido" : "Orden de pedido pendiente"}" title="${linkedOrder ? "Ver orden de pedido" : "Aún no existe una orden de pedido"}"><span class="quotation-action__op" aria-hidden="true">OP</span></button>
              <button type="button" class="quotation-action edit" data-quotation-module-open="${escapeHtml(quotation.id)}" data-opportunity-id="${escapeHtml(quotation.opportunityId || "")}" aria-label="Editar cotización" title="Editar cotización"><span aria-hidden="true">✏️</span></button>
              <button type="button" class="quotation-action danger" data-quotation-module-delete="${escapeHtml(quotation.id)}" aria-label="Eliminar cotización" ${linkedOrder || quotation.status === "Convertida" ? "disabled title=\"Una cotización con orden de pedido no se puede eliminar\"" : "title=\"Eliminar\""}><span aria-hidden="true">🗑️</span></button>
            </div>
          </article>`;
        }).join("")}
        ${Array.from({ length: emptyRowCount }, (_, index) => `<div class="quotation-table-row quotation-table-row--placeholder${!rows.length && index === 0 ? " has-message" : ""}" aria-hidden="true">${!rows.length && index === 0 ? `<span>No hay cotizaciones que coincidan con esta vista.</span>` : ""}</div>`).join("")}
      </div>
      <div class="opportunity-pagination quotation-pagination" aria-label="Paginación de cotizaciones"><span>Mostrando ${visibleStart}-${Math.min(pageEnd, rows.length)} de ${rows.length}</span><div><button class="ghost-btn compact-btn" type="button" data-quotation-module-page="prev" ${state.quotationModulePage <= 1 ? "disabled" : ""}>Anterior</button><strong>Página ${state.quotationModulePage} de ${pageCount}</strong><button class="ghost-btn compact-btn" type="button" data-quotation-module-page="next" ${state.quotationModulePage >= pageCount ? "disabled" : ""}>Siguiente</button></div></div>
    </section>`;
}

function quotationLinkedOrder(quotation = {}) {
  return state.controlSales.find((order) => (
    !order.archived && (
      String(order.id || "") === String(quotation.convertedOrderId || "")
      || String(order.sourceQuotationId || "") === String(quotation.id || "")
    )
  )) || null;
}

function wireQuotationsModule() {
  opportunityTable.querySelector("[data-quotation-module-search]")?.addEventListener("input", (event) => {
    state.quotationModuleQuery = event.target.value;
    state.quotationModulePage = 1;
    renderCommercialSubmenu(areas.comercializacion);
    const input = opportunityTable.querySelector("[data-quotation-module-search]");
    input?.focus();
    input?.setSelectionRange(input.value.length, input.value.length);
  });
  opportunityTable.querySelectorAll("[data-quotation-module-page]").forEach((button) => button.addEventListener("click", () => {
    state.quotationModulePage += button.dataset.quotationModulePage === "next" ? 1 : -1;
    renderCommercialSubmenu(areas.comercializacion);
  }));
  opportunityTable.querySelector("[data-quotation-module-create]")?.addEventListener("click", () => {
    openQuotationOpportunityPicker();
  });
  opportunityTable.querySelectorAll("[data-quotation-module-open]").forEach((button) => button.addEventListener("click", () => (
    openQuotationDialog(button.dataset.opportunityId, button.dataset.quotationModuleOpen)
  )));
  opportunityTable.querySelectorAll("[data-quotation-module-view]").forEach((button) => button.addEventListener("click", () => {
    const quotation = state.quotations.find((item) => String(item.id) === String(button.dataset.quotationModuleView));
    if (quotation) printQuotation(quotation);
  }));
  opportunityTable.querySelectorAll("[data-quotation-module-order]").forEach((button) => button.addEventListener("click", () => {
    openControlSalesDetail(button.dataset.quotationModuleOrder, true);
  }));
  opportunityTable.querySelectorAll("[data-quotation-module-delete]").forEach((button) => button.addEventListener("click", async () => {
    const quotation = state.quotations.find((item) => item.id === button.dataset.quotationModuleDelete);
    if (!quotation || !confirm(`¿Eliminar la cotización de ${quotation.client || "este cliente"}?`)) return;
    try {
      if (apiEnabled) await apiJson(`/api/quotations/${encodeURIComponent(quotation.id)}`, { method:"DELETE" });
      state.quotations = state.quotations.filter((item) => item.id !== quotation.id);
      persistLocalQuotations();
      renderCommercialSubmenu(areas.comercializacion);
    } catch (error) { alert(error.message || "No se pudo eliminar la cotización."); }
  }));
}

function formatOrderCorrelative(number) {
  const raw = String(number || "").trim();
  if (!raw) return "OP-PENDIENTE";
  if (/^OP-/i.test(raw)) return raw.toUpperCase();
  if (/^\d+$/.test(raw)) return `OP-${raw.padStart(4, "0")}`;
  return raw;
}

function formatCommercialApprovalDateTime(value) {
  if (!value) return "Fecha no disponible";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return formatDate(value);
  return new Intl.DateTimeFormat("es-SV", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/El_Salvador"
  }).format(date);
}

function commercialApprovalFolio(order) {
  const orderNumber = String(formatOrderCorrelative(order?.number)).replace(/[^A-Z0-9]/gi, "");
  const timestamp = String(order?.commercialApprovedAt || order?.updatedAt || "").replace(/\D/g, "").slice(0, 14);
  return `KMI-GC-${orderNumber}-${timestamp || "REGISTRADA"}`;
}

function commercialApprovalSignatureMarkup(order, compact = false) {
  if (order?.commercialApprovalStatus !== "Autorizada" && !order?.commercialApprovedAt) return "";
  return `<section class="commercial-electronic-signature${compact ? " is-compact" : ""}" aria-label="Firma electrónica de Gerencia de Comercialización">
    <span class="commercial-electronic-signature__seal" aria-hidden="true">✓</span>
    <div class="commercial-electronic-signature__copy">
      <small>Firma electrónica validada</small>
      <strong>${escapeHtml(order.commercialApprovedBy || "Gerencia de Comercialización")}</strong>
      <span>${escapeHtml(formatCommercialApprovalDateTime(order.commercialApprovedAt || order.updatedAt))}</span>
    </div>
    <code>${escapeHtml(commercialApprovalFolio(order))}</code>
  </section>`;
}

function financeApprovalFolio(order) {
  const orderNumber = String(formatOrderCorrelative(order?.number)).replace(/[^A-Z0-9]/gi, "");
  const timestamp = String(order?.financeApprovedAt || order?.updatedAt || "").replace(/\D/g, "").slice(0, 14);
  return `KMI-GF-${orderNumber}-${timestamp || "REGISTRADA"}`;
}

function financeApprovalSignatureMarkup(order, compact = false) {
  if (order?.financeApprovalStatus !== "Aprobada" && !order?.financeApprovedAt) return "";
  return `<section class="commercial-electronic-signature finance-electronic-signature${compact ? " is-compact" : ""}" aria-label="Firma electrónica de Gerencia Financiera">
    <span class="commercial-electronic-signature__seal" aria-hidden="true">✓</span>
    <div class="commercial-electronic-signature__copy">
      <small>Segundo visto bueno · firma electrónica validada</small>
      <strong>${escapeHtml(order.financeApprovedBy || "Gerencia Financiera")}</strong>
      <span>${escapeHtml(formatCommercialApprovalDateTime(order.financeApprovedAt || order.updatedAt))}</span>
    </div>
    <code>${escapeHtml(financeApprovalFolio(order))}</code>
  </section>`;
}

async function updateControlSalesApproval(orderId, stage, status, note = "") {
  const result = await apiJson(`/api/control-sales/${encodeURIComponent(orderId)}/${stage}-approval`, {
    method: "PATCH",
    body: JSON.stringify({ status, note, updatedBy: state.currentUser?.name || "Sistema Gerencial" })
  });
  const updated = result.item;
  const index = state.controlSales.findIndex((order) => order.id === updated.id);
  if (index >= 0) state.controlSales[index] = updated;
  else state.controlSales.push(updated);
  return updated;
}

function renderCommercialOrderAuthorization() {
  const allOrders = approvalControlSalesOrders();
  const pending = commercialPendingApprovalOrders();
  const authorized = allOrders.filter((order) => order.commercialApprovalStatus === "Autorizada");
  const query = normalizeKey(state.commercialApprovalQuery);
  const visibleRows = allOrders.filter((order) => !query || normalizeKey(`${order.number} ${order.client} ${controlSalesResponsibleSeller(order)} ${order.commercialApprovalStatus || "Pendiente"}`).includes(query));
  return `
    <section class="commercial-approval" aria-label="Autorización comercial de pedidos">
      <header class="commercial-approval__hero">
        <div><span>Flujo comercial</span><h3>Autorización de pedidos</h3><p>Primer visto bueno de las órdenes antes de notificarlas a Financiera.</p></div>
        <div class="commercial-approval__metrics">
          <article><small>Pendientes</small><strong>${pending.length}</strong></article>
          <article><small>Autorizados</small><strong>${authorized.length}</strong></article>
        </div>
      </header>
      <label class="commercial-approval__search"><span>⌕</span><input type="search" data-commercial-approval-search value="${escapeHtml(state.commercialApprovalQuery)}" placeholder="Buscar cliente, vendedor o estado..."></label>
      <div class="commercial-approval__notice"><strong>Primer visto bueno</strong><span>Al autorizar, la orden se notificará a Financiera / Pedidos para su segundo visto bueno.</span></div>
      <div class="commercial-approval__list">
        ${visibleRows.map((order) => {
          const isAuthorized = order.commercialApprovalStatus === "Autorizada";
          return `
            <article class="commercial-approval__row">
              <div class="commercial-approval__identity"><small>ORDEN DE PEDIDO</small><strong>${escapeHtml(formatOrderCorrelative(order.number))}</strong><span>${formatDate(order.date)}</span></div>
              <div class="commercial-approval__client"><strong>${escapeHtml(order.client)}</strong><span>${escapeHtml(controlSalesResponsibleSeller(order))}</span></div>
              <div class="commercial-approval__amount"><small>Total</small><strong>${formatControlSalesMoney(order.totalCents || 0)}</strong></div>
              <span class="commercial-approval__status" data-status="${normalizeKey(order.commercialApprovalStatus || "Pendiente")}">${escapeHtml(order.commercialApprovalStatus || "Pendiente")}</span>
              <div class="commercial-approval__actions">
                <button type="button" data-commercial-order-view="${escapeHtml(order.id)}">Ver</button>
                ${isAuthorized
                  ? `<button type="button" class="primary" data-commercial-order-print="${escapeHtml(order.id)}">Imprimir</button>`
                  : `<button type="button" data-commercial-order-edit="${escapeHtml(order.id)}">Editar</button>
                     <button type="button" class="secondary" data-commercial-order-return="${escapeHtml(order.id)}">Devolver</button>
                     <button type="button" class="primary" data-commercial-order-approve="${escapeHtml(order.id)}">✓ Firmar y autorizar</button>`}
              </div>
          </article>`;
        }).join("") || `<div class="empty-state">No hay pedidos en el histórico de autorización comercial.</div>`}
      </div>
    </section>`;
}

function wireCommercialOrderAuthorization() {
  opportunityTable.querySelector("[data-commercial-approval-search]")?.addEventListener("input", (event) => {
    state.commercialApprovalQuery = event.target.value;
    renderCommercialSubmenu(areas.comercializacion);
    const input = opportunityTable.querySelector("[data-commercial-approval-search]");
    input?.focus(); input?.setSelectionRange(input.value.length, input.value.length);
  });
  opportunityTable.querySelectorAll("[data-commercial-order-view]").forEach((button) => button.addEventListener("click", () => openControlSalesDetail(button.dataset.commercialOrderView)));
  opportunityTable.querySelectorAll("[data-commercial-order-print]").forEach((button) => button.addEventListener("click", () => {
    const order = state.controlSales.find((item) => item.id === button.dataset.commercialOrderPrint);
    if (order) printControlSalesProforma(order);
  }));
  opportunityTable.querySelectorAll("[data-commercial-order-edit]").forEach((button) => button.addEventListener("click", () => {
    const order = state.controlSales.find((item) => item.id === button.dataset.commercialOrderEdit);
    if (order) openControlSalesForm(order);
  }));
  opportunityTable.querySelectorAll("[data-commercial-order-approve]").forEach((button) => button.addEventListener("click", async () => {
    if (!confirm("¿Confirmas el primer visto bueno y la autorización comercial de esta orden?")) return;
    try { await updateControlSalesApproval(button.dataset.commercialOrderApprove, "commercial", "Autorizada"); renderCommercialSubmenu(areas.comercializacion); }
    catch (error) { alert(error.message || "No se pudo autorizar la orden."); }
  }));
  opportunityTable.querySelectorAll("[data-commercial-order-return]").forEach((button) => button.addEventListener("click", async () => {
    const note = prompt("Indica qué debe corregirse antes de autorizar:");
    if (note === null || !note.trim()) return;
    try { await updateControlSalesApproval(button.dataset.commercialOrderReturn, "commercial", "Devuelta", note.trim()); renderCommercialSubmenu(areas.comercializacion); }
    catch (error) { alert(error.message || "No se pudo devolver la orden."); }
  }));
}

function persistLocalQuotations() { localStorage.setItem(QUOTATIONS_STORAGE_KEY, JSON.stringify(state.quotations)); }
function crmOpportunityForQuotation(id) { return crmData().opportunities.find((item) => String(item.id) === String(id)); }
function crmCustomerForQuotation(opportunity) {
  const customers = crmData().customers || [];
  return customers.find((item) => String(item.id) === String(opportunity?.customerId))
    || customers.find((item) => normalizeKey(item.commercialName || item.name) === normalizeKey(opportunity?.company)) || {};
}

function quotationLineTemplate(line = {}) {
  const id = line.id || crypto.randomUUID();
  if (line.type === "title") {
    const title = line.title || line.description || "";
    return `<div class="quotation-line quotation-title-line" data-quotation-line-id="${escapeHtml(id)}" data-quotation-line-type="title"><label class="quotation-title-field">Título del grupo<input data-quotation-title required value="${escapeHtml(title)}" placeholder="Ej. Uniformes administrativos"></label><small>No afecta cantidades ni totales; se imprimirá como separador.</small><button type="button" class="quotation-remove-line" data-quotation-remove-line aria-label="Quitar línea de título">×</button></div>`;
  }
  const price = line.unitPriceCents == null ? "" : (Number(line.unitPriceCents) / 100).toFixed(2);
  const notes = String(line.notes || "");
  const hasNotes = Boolean(notes.trim());
  return `<div class="quotation-line${hasNotes ? " has-detail" : ""}" data-quotation-line-id="${escapeHtml(id)}"><label class="quotation-product">Descripción<input data-quotation-description required value="${escapeHtml(line.description || line.product || "")}" placeholder="Producto, confección o servicio"></label><label>Talla<input data-quotation-size value="${escapeHtml(line.size || "")}" placeholder="Opcional"></label><label>Cantidad<input data-quotation-quantity required type="number" min="0.01" step="0.01" value="${escapeHtml(line.quantity || "1")}"></label><label>Precio unitario<input data-quotation-price type="number" min="0" step="0.01" value="${price}" placeholder="Pendiente"></label><output data-quotation-line-total>${formatControlSalesMoney(line.lineTotalCents || 0)}</output><div class="quotation-notes"><span class="quotation-field-label">Detalle</span><button type="button" class="quotation-detail-toggle${hasNotes ? " is-open" : ""}" data-quotation-detail-toggle aria-expanded="${hasNotes}"><span data-quotation-detail-label>${hasNotes ? "Detalle agregado" : "Agregar detalle"}</span><span class="quotation-detail-chevron" aria-hidden="true">⌄</span></button></div><button type="button" class="quotation-remove-line" data-quotation-remove-line aria-label="Quitar línea">×</button><div class="quotation-detail-panel" data-quotation-detail-panel${hasNotes ? "" : " hidden"}><label>Comentario extenso<textarea data-quotation-notes rows="4" placeholder="Color, tela, bordado, especificaciones u observaciones…">${escapeHtml(notes)}</textarea></label></div></div>`;
}

function refreshQuotationTitlePositionMenu(preferredPosition = "") {
  const menu = document.querySelector("#quotationTitlePosition");
  const container = document.querySelector("#quotationLines");
  if (!menu || !container) return;
  const rows = [...container.children];
  const current = preferredPosition !== "" ? String(preferredPosition) : menu.value;
  const productRows = rows.filter((row) => row.dataset.quotationLineType !== "title");
  const options = [`<option value="end">Al final, después de todas las líneas</option>`];
  productRows.forEach((row, index) => {
    const id = row.dataset.quotationLineId;
    const label = row.querySelector("[data-quotation-description]")?.value.trim() || `Producto ${index + 1} sin completar`;
    options.push(`<option value="before:${escapeHtml(id)}">Antes del producto ${index + 1} · ${escapeHtml(label)}</option>`);
    options.push(`<option value="after:${escapeHtml(id)}">Después del producto ${index + 1} · ${escapeHtml(label)}</option>`);
  });
  menu.innerHTML = options.join("");
  menu.value = Array.from(menu.options).some((option) => option.value === current) ? current : "end";
}

function setQuotationPanelExpanded(panel, expanded) {
  if (!panel) return;
  const trigger = panel.querySelector("[data-quotation-panel-toggle]");
  const content = panel.querySelector(".quotation-collapsible-content");
  if (!trigger || !content) return;
  trigger.setAttribute("aria-expanded", String(expanded));
  panel.classList.toggle("is-expanded", expanded);
  if (expanded) content.removeAttribute("hidden");
  else content.setAttribute("hidden", "");
}

function ensureQuotationDialog() {
  if (document.querySelector("#quotationDialog")) return;
  document.body.insertAdjacentHTML("beforeend", `<dialog id="quotationDialog" class="wide-dialog quotation-dialog"><form id="quotationForm">
    <header><div><p class="eyebrow">Comercialización · Cotizaciones</p><h3 id="quotationDialogTitle">Nueva cotización</h3><span id="quotationDialogSubtitle"></span></div><button type="button" data-quotation-close>×</button></header>
    <div class="quotation-dialog-body">
    <input type="hidden" id="quotationId"><input type="hidden" id="quotationOpportunityId">
    <section id="quotationHistory" class="quotation-history"></section>
    <div class="quotation-step-heading"><span>1</span><div><b>Datos básicos</b><small>Fecha, vigencia y estado de la cotización.</small></div></div>
    <section class="quotation-form-grid quotation-main-fields quotation-clean-section"><input id="quotationNumber" type="hidden"><label class="quotation-field-editable">Fecha<input id="quotationDate" type="date" required></label><label class="quotation-field-editable">Vigencia<select id="quotationValidDays" required><option value="30">30 días</option></select></label><label class="quotation-field-editable">Estado<select id="quotationStatus"><option>Borrador</option><option>Enviada</option><option>Aprobada</option><option>Rechazada</option><option>Vencida</option><option value="Convertida" disabled>Convertida (pedido creado)</option></select></label></section>
    <section class="quotation-customer quotation-collapsible quotation-clean-section"><button type="button" class="quotation-collapsible-trigger" data-quotation-panel-toggle aria-expanded="false" aria-controls="quotationCustomerFields"><span><b>Datos heredados del cliente y vendedor</b><small>Se cargan desde la oportunidad. Ábrelos únicamente si necesitas corregirlos.</small></span><i aria-hidden="true">⌄</i></button><div id="quotationCustomerFields" class="quotation-form-grid quotation-collapsible-content quotation-inherited-fields" hidden><label>Cliente / nombre comercial<input id="quotationCommercialName" required></label><label>Razón social<input id="quotationLegalName"></label><label>Contacto<input id="quotationContactName"></label><label>Teléfono<input id="quotationPhone"></label><label>Email del cliente<input id="quotationEmail" type="email"></label><label class="span-2">Dirección<input id="quotationAddress"></label><label>Giro<input id="quotationBusinessActivity"></label><label>NIT<input id="quotationTaxId"></label><label>Número de registro<input id="quotationRegistrationNumber"></label><label>Tipo de contribuyente<input id="quotationTaxpayerType"></label><label>Código de cliente<input id="quotationCustomerCode"></label><label>Tipo de estrategia<select id="quotationStrategy"><option value="">Seleccionar</option><option>Retención</option><option>Expansión</option><option>Atracción</option><option>Recuperación</option></select></label><label>Vendedor<input id="quotationSeller" required></label><label>Teléfono del vendedor<input id="quotationSellerPhone"></label><label>Email del vendedor<input id="quotationSellerEmail" type="email"></label></div></section>
    <section class="quotation-lines quotation-clean-section quotation-editable-fields"><div class="quotation-section-title"><div><span>2 · Detalle económico</span><h4>Productos y servicios</h4></div><div class="quotation-line-actions"><label>Insertar línea de título<select id="quotationTitlePosition" aria-label="Ubicación de la línea de título"><option value="end">Al final, después de todas las líneas</option></select></label><button type="button" class="quotation-title-add-btn" data-quotation-add-title>+ Línea de título</button><button type="button" data-quotation-add-line>+ Agregar línea</button></div></div><div id="quotationLines"></div></section>
    <section class="quotation-totals">
      <div class="quotation-totals-comparison"><article class="quotation-reference"><span>Monto original de la oportunidad</span><strong id="quotationReference" data-reference-cents="0">$0.00</strong></article><article class="quotation-variation" id="quotationVariationCard" data-variation="neutral"><span id="quotationVariationLabel">Saldo pendiente por cotizar</span><strong id="quotationVariation">$0.00</strong><small>Calculado contra el subtotal acumulado de las líneas</small></article></div>
      <div class="quotation-totals-breakdown"><section class="quotation-vat-control"><span class="quotation-vat-copy"><b>Tratamiento fiscal</b><small>Selecciona cómo presentar el total.</small></span><button id="quotationVatMode" class="quotation-vat-segmented" type="button" role="switch" aria-checked="true" data-apply-vat="true"><span data-vat-choice="false">Sin IVA</span><span data-vat-choice="true">IVA 13%</span></button></section><article><span>Subtotal</span><strong id="quotationSubtotal">$0.00</strong></article><article id="quotationVatCard"><span>IVA 13%</span><strong id="quotationVat">$0.00</strong></article><article class="quotation-grand-total"><span>Total cotización · nuevo valor oportunidad</span><strong id="quotationTotal">$0.00</strong></article></div>
    </section>
    <section class="quotation-terms-panel quotation-collapsible quotation-clean-section"><button type="button" class="quotation-collapsible-trigger" data-quotation-panel-toggle aria-expanded="false" aria-controls="quotationTermsFields"><span><b>3 · Condiciones de la oferta</b><small>Selecciona pago y entrega; ajusta las observaciones solo cuando corresponda.</small></span><i aria-hidden="true">⌄</i></button><section id="quotationTermsFields" class="quotation-terms quotation-collapsible-content quotation-editable-fields" hidden><label class="quotation-field-editable">Forma de pago<select id="quotationPaymentTerms" required><option>50% anticipo, 50% previo a la entrega del pedido</option><option>50% anticipo, 50% crédito a 15 días</option><option>50% anticipo, 50% crédito a 30 días</option><option>Crédito de 100% a 15 días</option><option>Crédito de 100% a 30 días</option><option>100% previo a la entrega del pedido</option></select></label><label class="quotation-field-editable">Tiempo de entrega<select id="quotationDeliveryTerms" required><option>30 días hábiles posterior a la orden de compra</option><option>60 días hábiles posterior a la orden de compra</option><option>90 días hábiles posterior a la orden de compra</option></select></label><label class="quotation-field-secondary">Garantía<textarea id="quotationWarrantyNote" rows="2"></textarea></label><label class="quotation-field-secondary">Condiciones comerciales<textarea id="quotationCommercialNotes" rows="2"></textarea></label><label class="span-2 quotation-field-secondary">Tallas especiales<input id="quotationSpecialSizesNote"></label></section></section>
    <p id="quotationSaveStatus" class="quotation-save-status hidden" role="status"></p>
    </div>
    <footer><button type="button" class="quotation-crud-action quotation-delete-action hidden" data-quotation-delete>Eliminar</button><button type="button" class="quotation-crud-action quotation-print-action" data-quotation-preview aria-label="Vista previa e imprimir" title="Vista previa e imprimir">🖨️</button><button type="button" class="quotation-crud-action quotation-edit-btn" data-quotation-edit>Editar</button><button type="submit" class="quotation-crud-action primary-btn">Guardar</button><button type="button" class="quotation-crud-action primary-btn hidden" data-quotation-direct-convert>Guardar y crear nota de pedido</button><button type="button" class="quotation-crud-action quotation-new-action" data-quotation-new>Nuevo</button></footer>
  </form></dialog>`);
  const dialog = document.querySelector("#quotationDialog");

  dialog.addEventListener("close", () => {
    const returnOpportunityId = dialog.dataset.returnToManagementOpportunityId;
    if (!returnOpportunityId) return;
    delete dialog.dataset.returnToManagementOpportunityId;
    if (!managementDialog.open || managementOpportunityId.value !== returnOpportunityId) return;
    const managementItem = currentManagementItem();
    if (managementItem) renderManagementQuotations(managementItem);
  });

  // Los paneles editables usan listeners propios para no depender del
  // manejador general del modal (que también procesa acciones asíncronas).
  dialog.querySelectorAll("[data-quotation-panel-toggle]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const panel = trigger.closest(".quotation-collapsible");
      setQuotationPanelExpanded(panel, trigger.getAttribute("aria-expanded") !== "true");
    });
  });

  dialog.addEventListener("click", async (event) => {
    if (event.target.matches("[data-quotation-close]")) dialog.close();
    if (event.target.matches("[data-quotation-add-line]")) { document.querySelector("#quotationLines").insertAdjacentHTML("beforeend", quotationLineTemplate()); refreshQuotationTitlePositionMenu(); updateQuotationTotals(); }
    if (event.target.matches("[data-quotation-add-title]")) {
      const container = document.querySelector("#quotationLines");
      const placement = document.querySelector("#quotationTitlePosition").value || "end";
      const [direction, targetId = ""] = placement.split(":");
      const targetRow = [...container.children].find((row) => row.dataset.quotationLineId === targetId);
      if (placement === "end" || !targetRow) container.insertAdjacentHTML("beforeend", quotationLineTemplate({ type:"title" }));
      else targetRow.insertAdjacentHTML(direction === "before" ? "beforebegin" : "afterend", quotationLineTemplate({ type:"title" }));
      const insertedRow = placement === "end" || !targetRow
        ? container.lastElementChild
        : direction === "before" ? targetRow.previousElementSibling : targetRow.nextElementSibling;
      refreshQuotationTitlePositionMenu("end");
      insertedRow?.querySelector("[data-quotation-title]")?.focus();
    }
    if (event.target.matches("[data-quotation-remove-line]")) {
      const line = event.target.closest(".quotation-line");
      const isTitle = line?.dataset.quotationLineType === "title";
      const productCount = document.querySelectorAll('.quotation-line:not([data-quotation-line-type="title"])').length;
      if (!isTitle && productCount <= 1) return alert("La cotización debe conservar al menos una línea de producto.");
      line?.remove();
      refreshQuotationTitlePositionMenu();
      updateQuotationTotals();
    }
    const detailToggle = event.target.closest("[data-quotation-detail-toggle]");
    if (detailToggle) {
      const line = detailToggle.closest(".quotation-line");
      const panel = line?.querySelector("[data-quotation-detail-panel]");
      const expanded = detailToggle.getAttribute("aria-expanded") === "true";
      detailToggle.setAttribute("aria-expanded", String(!expanded));
      detailToggle.classList.toggle("is-open", !expanded);
      if (panel) {
        panel.hidden = expanded;
        panel.classList.toggle("hidden", expanded);
      }
      if (!expanded) line?.querySelector("[data-quotation-notes]")?.focus();
      return;
    }
    const history = event.target.closest("[data-quotation-history-id]"); if (history) {
      const selectedQuote = state.quotations.find((item) => item.id === history.dataset.quotationHistoryId);
      dialog.dataset.quotationCreationAuthorized = "false";
      populateQuotationForm(selectedQuote, crmOpportunityForQuotation(document.querySelector("#quotationOpportunityId").value));
      renderQuotationHistory(document.querySelector("#quotationOpportunityId").value, selectedQuote?.id || "");
    }
    if (event.target.closest("[data-quotation-delete]")) { await deleteQuotationFromForm(); return; }
    if (event.target.closest("[data-quotation-preview]")) printQuotation(quotationDraftFromForm());
    if (event.target.closest("[data-quotation-direct-convert]")) {
      const savedQuote = await saveQuotationFromForm("Aprobada");
      if (!savedQuote) return;
      const directOpportunity = dialog.directOrderOpportunity;
      dialog.close();
      openControlSalesForm(null, null, directOpportunity, false, savedQuote, false, true);
      return;
    }
    if (event.target.closest("[data-quotation-new]")) {
      const currentId = document.querySelector("#quotationId").value;
      if (currentId && !confirm("¿Iniciar una nueva cotización? Los cambios no guardados de la cotización seleccionada se descartarán.")) return;
      const opportunityId = document.querySelector("#quotationOpportunityId").value;
      let opportunity = crmOpportunityForQuotation(opportunityId);
      if (!opportunity) {
        const win = crmResultWinHistory().find((item) => String(item.id) === String(opportunityId));
        if (win) opportunity = { id:win.id, company:win.company, seller:win.seller, estimatedAmount:win.amount, segment:win.segment || "", product:win.product || "", stageId:"Cierre ganado" };
      }
      if (!opportunity) return alert("No se encontró la oportunidad comercial para crear la cotización.");
      dialog.dataset.quotationCreationAuthorized = "true";
      populateQuotationForm(null, opportunity);
      renderQuotationHistory(opportunityId, "");
      const status = document.querySelector("#quotationSaveStatus");
      status.textContent = "Nueva cotización habilitada. Completa el detalle y presiona Guardar para crearla.";
      status.dataset.tone = "success";
      status.classList.remove("hidden");
      document.querySelector("[data-quotation-description]")?.focus();
      return;
    }
    if (event.target.matches("[data-quotation-edit]")) {
      setQuotationPanelExpanded(dialog.querySelector(".quotation-customer"), true);
      const status = document.querySelector("#quotationSaveStatus");
      status.textContent = "Edición activa. Realiza los cambios y presiona Guardar.";
      status.dataset.tone = "success";
      status.classList.remove("hidden");
      const firstField = document.querySelector("#quotationCommercialName");
      firstField?.focus();
      firstField?.select();
    }
  });
  dialog.addEventListener("input", (event) => {
    const line = event.target.closest(".quotation-line");
    if (!line) return;
    if (event.target.matches("[data-quotation-notes]")) {
      const hasDetail = Boolean(event.target.value.trim());
      line.classList.toggle("has-detail", hasDetail);
      const label = line.querySelector("[data-quotation-detail-label]");
      if (label) label.textContent = hasDetail ? "Detalle agregado" : "Agregar detalle";
    }
    if (event.target.matches("[data-quotation-description], [data-quotation-title]")) refreshQuotationTitlePositionMenu();
    updateQuotationTotals();
  });
  dialog.addEventListener("click", (event) => {
    const vatChoice = event.target.closest("[data-vat-choice]");
    if (!vatChoice) return;
    const vatMode = vatChoice.closest("#quotationVatMode");
    if (!vatMode) return;
    const applyVat = vatChoice.dataset.vatChoice === "true";
    vatMode.dataset.applyVat = String(applyVat);
    vatMode.setAttribute("aria-checked", String(applyVat));
    updateQuotationTotals();
  });
  document.querySelector("#quotationForm").addEventListener("submit", async (event) => { event.preventDefault(); await saveQuotationFromForm(); });
}

function quotationDraftFromForm() {
  const lines = [...document.querySelectorAll("#quotationLines .quotation-line")].map((line) => {
    if (line.dataset.quotationLineType === "title") {
      const title = line.querySelector("[data-quotation-title]").value.trim();
      return { id:line.dataset.quotationLineId, type:"title", title, description:title, size:"", quantity:"0", unitPrice:0, unitPriceCents:0, lineTotalCents:0, notes:"" };
    }
    const quantity = Number(line.querySelector("[data-quotation-quantity]").value || 0);
    const unitPrice = Number(line.querySelector("[data-quotation-price]").value || 0);
    return { id:line.dataset.quotationLineId, description:line.querySelector("[data-quotation-description]").value.trim(), size:line.querySelector("[data-quotation-size]").value.trim(), quantity:String(quantity), unitPrice, unitPriceCents:Math.round(unitPrice * 100), lineTotalCents:Math.round(quantity * unitPrice * 100), notes:line.querySelector("[data-quotation-notes]").value.trim() };
  });
  const subtotalCents = lines.reduce((sum, line) => sum + line.lineTotalCents, 0);
  const applyVat = document.querySelector("#quotationVatMode")?.dataset.applyVat !== "false";
  const vatCents = applyVat ? Math.round(subtotalCents * .13) : 0;
  return { id:document.querySelector("#quotationId").value, opportunityId:document.querySelector("#quotationOpportunityId").value, number:document.querySelector("#quotationNumber").value, date:document.querySelector("#quotationDate").value, validDays:Number(document.querySelector("#quotationValidDays").value || 30), seller:document.querySelector("#quotationSeller").value.trim(), client:document.querySelector("#quotationCommercialName").value.trim(), status:document.querySelector("#quotationStatus").value,
    customerData:{ commercialName:document.querySelector("#quotationCommercialName").value.trim(), legalName:document.querySelector("#quotationLegalName").value.trim(), contactName:document.querySelector("#quotationContactName").value.trim(), phone:document.querySelector("#quotationPhone").value.trim(), email:document.querySelector("#quotationEmail").value.trim(), address:document.querySelector("#quotationAddress").value.trim(), businessActivity:document.querySelector("#quotationBusinessActivity").value.trim(), taxId:document.querySelector("#quotationTaxId").value.trim(), registrationNumber:document.querySelector("#quotationRegistrationNumber").value.trim(), taxpayerType:document.querySelector("#quotationTaxpayerType").value.trim(), customerCode:document.querySelector("#quotationCustomerCode").value.trim(), strategy:document.querySelector("#quotationStrategy").value, sellerPhone:document.querySelector("#quotationSellerPhone").value.trim(), sellerEmail:document.querySelector("#quotationSellerEmail").value.trim(), sellerRole:"Ejecutivo/a de ventas" },
    paymentTerms:document.querySelector("#quotationPaymentTerms").value.trim(), deliveryTerms:document.querySelector("#quotationDeliveryTerms").value.trim(), warrantyNote:document.querySelector("#quotationWarrantyNote").value.trim(), commercialNotes:document.querySelector("#quotationCommercialNotes").value.trim(), specialSizesNote:document.querySelector("#quotationSpecialSizesNote").value.trim(), applyVat, subtotalCents, vatCents, totalCents:subtotalCents + vatCents, lines, updatedBy:state.currentUser?.name || "Sistema Gerencial" };
}

function updateQuotationTotals() {
  const draft = quotationDraftFromForm();
  draft.lines.filter((line) => line.type !== "title").forEach((line, index) => { const output = document.querySelectorAll("[data-quotation-line-total]")[index]; if (output) output.textContent = formatControlSalesMoney(line.lineTotalCents); });
  document.querySelector("#quotationSubtotal").textContent = formatControlSalesMoney(draft.subtotalCents);
  document.querySelector("#quotationVat").textContent = formatControlSalesMoney(draft.vatCents);
  document.querySelector("#quotationVatCard")?.classList.toggle("is-disabled", !draft.applyVat);
  document.querySelector("#quotationTotal").textContent = formatControlSalesMoney(draft.totalCents);
  const referenceCents = Number(document.querySelector("#quotationReference")?.dataset.referenceCents || 0);
  const pendingBalanceCents = referenceCents - draft.subtotalCents;
  const variationCard = document.querySelector("#quotationVariationCard");
  const variationLabel = document.querySelector("#quotationVariationLabel");
  const variationValue = document.querySelector("#quotationVariation");
  const variation = draft.subtotalCents <= 0 ? "neutral" : pendingBalanceCents > 0 ? "positive" : pendingBalanceCents < 0 ? "negative" : "neutral";
  if (variationCard) variationCard.dataset.variation = variation;
  if (variationLabel) variationLabel.textContent = draft.subtotalCents <= 0 ? "Saldo pendiente por cotizar" : pendingBalanceCents > 0 ? "Saldo pendiente por cotizar" : pendingBalanceCents < 0 ? "Excedente sobre la oportunidad" : "Monto original cubierto";
  if (variationValue) variationValue.textContent = draft.subtotalCents <= 0 ? formatControlSalesMoney(referenceCents) : formatControlSalesMoney(Math.abs(pendingBalanceCents));
}

function validateQuotationPricesForFinalAction(draft, action = "continuar") {
  const productLines = draft.lines.filter((line) => line.type !== "title");
  const pendingIndex = productLines.findIndex((line) => Number(line.unitPriceCents || 0) <= 0);
  if (pendingIndex < 0) return true;
  const status = document.querySelector("#quotationSaveStatus");
  const message = `Completa el precio unitario de la línea ${pendingIndex + 1} antes de ${action}. Puedes conservarla sin precio mientras esté en Borrador.`;
  if (status) {
    status.textContent = message;
    status.dataset.tone = "error";
    status.classList.remove("hidden");
  }
  const field = document.querySelectorAll("[data-quotation-price]")[pendingIndex];
  field?.focus();
  alert(message);
  return false;
}

function renderQuotationHistory(opportunityId, activeQuoteId = "") {
  const quotes = state.quotations.filter((item) => String(item.opportunityId) === String(opportunityId)).sort((a,b) => String(b.updatedAt || b.date).localeCompare(String(a.updatedAt || a.date)));
  const history = document.querySelector("#quotationHistory");
  const selectedId = String(activeQuoteId || document.querySelector("#quotationId")?.value || "");
  history.classList.toggle("is-empty", !quotes.length);
  history.innerHTML = `<div><span>Historial</span><strong>${quotes.length} ${quotes.length === 1 ? "cotización" : "cotizaciones"}</strong></div>${quotes.length ? `<nav>${quotes.map((quote) => { const selected = String(quote.id) === selectedId; return `<button type="button" class="${selected ? "is-selected" : ""}" data-quotation-history-id="${escapeHtml(quote.id)}" ${selected ? 'aria-current="true"' : ""}><b>Cotización</b><span>${formatDate(quote.date)} · ${formatControlSalesMoney(quote.totalCents)}</span><em data-status="${escapeHtml(quote.status)}">${escapeHtml(quote.status)}</em>${selected ? `<mark>Seleccionada</mark>` : ""}</button>`; }).join("")}</nav>` : `<p>La primera cotización se agregará aquí al guardar.</p>`}`;
}

function populateQuotationForm(quote, opportunity = null, customerOverride = null) {
  const customer = quote?.customerData || customerOverride || crmCustomerForQuotation(opportunity);
  const seller = (crmData().sellers || []).find((item) => item.id === opportunity?.ownerId) || {};
  const values = {
    quotationId:quote?.id || "", quotationNumber:quote?.number || "", quotationDate:quote?.date || todayISO(), quotationValidDays:quote?.validDays || 30, quotationStatus:quote?.status || "Borrador",
    quotationCommercialName:customer.commercialName || customer.name || quote?.client || opportunity?.company || "", quotationLegalName:customer.legalName || "", quotationContactName:customer.contactName || customer.manager || opportunity?.contact || "", quotationPhone:customer.phone || opportunity?.phone || "", quotationEmail:customer.email || "", quotationAddress:customer.address || opportunity?.location || "", quotationBusinessActivity:customer.businessActivity || customer.businessLine || opportunity?.segment || "", quotationTaxId:customer.taxId || customer.nit || "", quotationRegistrationNumber:customer.registrationNumber || customer.nrc || "", quotationTaxpayerType:customer.taxpayerType || "", quotationCustomerCode:customer.customerCode || customer.code || "", quotationStrategy:customer.strategy || opportunity?.strategy || "", quotationSeller:quote?.seller || seller.name || opportunity?.seller || state.currentUser?.name || "", quotationSellerPhone:customer.sellerPhone || seller.phone || "", quotationSellerEmail:customer.sellerEmail || seller.email || state.currentUser?.email || "",
    quotationPaymentTerms:quote?.paymentTerms || "50% anticipo, 50% previo a la entrega del pedido", quotationDeliveryTerms:quote?.deliveryTerms || "30 días hábiles posterior a la orden de compra", quotationWarrantyNote:quote?.warrantyNote || "Todos nuestros productos están garantizados y elaborados con altos estándares de calidad.", quotationCommercialNotes:quote?.commercialNotes || "Precios unitarios no incluyen IVA", quotationSpecialSizesNote:quote?.specialSizesNote || "Tallas especiales arriba de XXL tienen costo adicional"
  };
  const legacyQuotationValues = {
    quotationPaymentTerms:{ "50% de anticipo - 50% contra entrega":"50% anticipo, 50% previo a la entrega del pedido" }
  };
  Object.entries(values).forEach(([id,value]) => {
    const field = document.querySelector(`#${id}`);
    if (!field) return;
    const normalizedValue = legacyQuotationValues[id]?.[String(value)] || value;
    if (field.tagName === "SELECT" && normalizedValue !== "" && !Array.from(field.options).some((option) => option.value === String(normalizedValue))) {
      field.add(new Option(String(normalizedValue), String(normalizedValue)));
    }
    field.value = normalizedValue ?? "";
  });
  const vatMode = document.querySelector("#quotationVatMode");
  if (vatMode) {
    const applyVat = quote ? Number(quote.vatCents || 0) > 0 : true;
    vatMode.dataset.applyVat = String(applyVat);
    vatMode.setAttribute("aria-checked", String(applyVat));
  }
  document.querySelector("#quotationLines").innerHTML = (quote?.lines?.length ? quote.lines : [{ description:"", quantity:"1" }]).map(quotationLineTemplate).join("");
  refreshQuotationTitlePositionMenu();
  const referenceAmount = Number(opportunity?.quotationReferenceAmount ?? opportunity?.estimatedAmount ?? 0);
  const referenceOutput = document.querySelector("#quotationReference");
  referenceOutput.textContent = formatMoney(referenceAmount);
  referenceOutput.dataset.referenceCents = String(Math.round(referenceAmount * 100));
  document.querySelector("#quotationDialogTitle").textContent = quote ? "Editar cotización" : "Nueva cotización";
  document.querySelector("[data-quotation-delete]")?.classList.toggle("hidden", !quote?.id);
  setQuotationPanelExpanded(document.querySelector(".quotation-customer"), false);
  setQuotationPanelExpanded(document.querySelector(".quotation-terms-panel"), true);
  updateQuotationTotals();
}

async function openQuotationDialog(opportunityId, quoteId = "", opportunityOverride = null, customerOverride = null, directOrderFlow = false) {
  ensureQuotationDialog(); await loadQuotations();
  let opportunity = opportunityOverride || crmOpportunityForQuotation(opportunityId);
  if (!opportunity) {
    const managementItem = getOpportunitySubmenu().items.find((item) => (
      String(item.id) === String(opportunityId) || String(item.crmOpportunityId || "") === String(opportunityId)
    ));
    if (managementItem) opportunity = quotationOpportunityFromManagementItem(managementItem);
  }
  if (!opportunity) {
    const win = crmResultWinHistory().find((item) => String(item.id) === String(opportunityId));
    if (win) opportunity = { id:win.id, company:win.company, seller:win.seller, estimatedAmount:win.amount, segment:win.segment || "", product:win.product || "", stageId:"Cierre ganado" };
  }
  if (!opportunity) return alert("No se encontró la oportunidad comercial.");
  const quote = quoteId ? state.quotations.find((item) => String(item.id) === String(quoteId)) : null;
  const dialog = document.querySelector("#quotationDialog");
  dialog.dataset.directOrderFlow = directOrderFlow ? "true" : "false";
  dialog.directOrderOpportunity = directOrderFlow ? opportunity : null;
  dialog.directOrderCustomer = directOrderFlow ? customerOverride : null;
  dialog.dataset.quotationCreationAuthorized = quoteId ? "false" : "true";
  document.querySelector("#quotationOpportunityId").value = opportunity.id;
  document.querySelector("#quotationDialogSubtitle").textContent = `${opportunity.company} · ${opportunity.stage?.name || opportunity.stageId || "Oportunidad"}`;
  renderQuotationHistory(opportunity.id, quote?.id || ""); populateQuotationForm(quote, opportunity, customerOverride);
  dialog.querySelector("[data-quotation-direct-convert]")?.classList.toggle("hidden", !directOrderFlow);
  dialog.querySelector('button[type="submit"]')?.classList.toggle("hidden", directOrderFlow);
  dialog.querySelector("[data-quotation-new]")?.classList.toggle("hidden", directOrderFlow);
  const status = document.querySelector("#quotationSaveStatus"); status.classList.add("hidden"); status.textContent = ""; status.dataset.tone = "success";
  dialog.showModal();
}

async function saveQuotationFromForm(forcedStatus = "", openPreview = false) {
  const form = document.querySelector("#quotationForm");
  const customerPanel = form?.querySelector(".quotation-customer");
  const missingInheritedField = customerPanel
    ? Array.from(customerPanel.querySelectorAll("[required]")).some((field) => !String(field.value || "").trim())
    : false;
  if (missingInheritedField) setQuotationPanelExpanded(customerPanel, true);
  if (!form.reportValidity()) return null;
  const draft = quotationDraftFromForm(); if (forcedStatus) draft.status = forcedStatus;
  const dialog = document.querySelector("#quotationDialog");
  const creationAuthorized = dialog?.dataset.quotationCreationAuthorized === "true";
  if (!draft.id && !creationAuthorized) {
    const blockedStatus = document.querySelector("#quotationSaveStatus");
    blockedStatus.textContent = "No se creó otra cotización. Selecciona una cotización existente o presiona Nuevo para habilitar una nueva.";
    blockedStatus.dataset.tone = "error";
    blockedStatus.classList.remove("hidden");
    alert(blockedStatus.textContent);
    return null;
  }
  const referenceCents = Number(document.querySelector("#quotationReference")?.dataset.referenceCents || 0);
  const amountDifferenceCents = draft.totalCents - referenceCents;
  if (["Enviada", "Aprobada", "Convertida"].includes(draft.status)
    && !validateQuotationPricesForFinalAction(draft, "cambiar el estado de la cotización")) return null;
  const status = document.querySelector("#quotationSaveStatus");
  try {
    let saved;
    if (apiEnabled) {
      const response = await apiJson(draft.id ? `/api/quotations/${encodeURIComponent(draft.id)}` : "/api/quotations", { method:draft.id ? "PUT" : "POST", body:JSON.stringify(draft) });
      saved = response.item;
      await loadQuotations();
      const opportunityItems = await apiJson("/api/opportunities");
      getOpportunitySubmenu().items = sanitizeTestOpportunities(normalizeOpportunities(Array.isArray(opportunityItems) ? opportunityItems : []));
      localStorage.setItem(opportunitiesStorageKey, JSON.stringify(getOpportunitySubmenu().items));
      state.crmData = await apiJson("/api/crm/bootstrap");
    }
    else { const now = new Date().toISOString(); saved = { ...draft, id:draft.id || crypto.randomUUID(), number:draft.number || `Q-${crypto.randomUUID()}`, status:draft.status, updatedAt:now, createdAt:draft.createdAt || now }; const index = state.quotations.findIndex((item) => item.id === saved.id); if (index >= 0) state.quotations[index] = saved; else state.quotations.unshift(saved); persistLocalQuotations(); }
    const linkedOpportunity = state.crmData?.opportunities?.find((item) => String(item.id) === String(saved.opportunityId));
    if (linkedOpportunity && Number(saved.totalCents || 0) > 0) {
      if (linkedOpportunity.quotationReferenceAmount == null) linkedOpportunity.quotationReferenceAmount = Number(linkedOpportunity.estimatedAmount || 0);
      linkedOpportunity.estimatedAmount = Number(saved.totalCents) / 100;
      linkedOpportunity.estimatedAmountLabel = formatMoney(linkedOpportunity.estimatedAmount);
    }
    const resultOpportunity = getOpportunitySubmenu().items.find((item) => (
      [item.id, item.crmOpportunityId].map((value) => String(value || "")).includes(String(saved.opportunityId))
      && (!item.quotationId || String(item.quotationId) === String(saved.id))
    ));
    if (resultOpportunity && Number(saved.totalCents || 0) > 0) resultOpportunity.amount = Number(saved.totalCents) / 100;
    if (dialog) dialog.dataset.quotationCreationAuthorized = "false";
    renderQuotationHistory(saved.opportunityId, saved.id); populateQuotationForm(saved, linkedOpportunity || crmOpportunityForQuotation(saved.opportunityId));
    const changeDirection = amountDifferenceCents > 0 ? "aumentó" : amountDifferenceCents < 0 ? "disminuyó" : "se mantuvo";
    const changeDetail = draft.totalCents <= 0
      ? `El borrador quedó sin valor; la oportunidad conserva su monto original de ${formatControlSalesMoney(referenceCents)}.`
      : amountDifferenceCents === 0
      ? `El monto de la oportunidad ${changeDirection} en ${formatControlSalesMoney(draft.totalCents)}.`
      : `El monto de la oportunidad ${changeDirection} ${formatControlSalesMoney(Math.abs(amountDifferenceCents))}: de ${formatControlSalesMoney(referenceCents)} a ${formatControlSalesMoney(draft.totalCents)}.`;
    status.textContent = `Cotización guardada. ${changeDetail}`;
    status.dataset.tone = "success";
    status.classList.remove("hidden");
    if (state.activeArea === "comercializacion" && state.activeSubmenu === "cotizaciones") {
      renderCommercialSubmenu(areas.comercializacion);
    }
    alert(changeDetail);
    if (openPreview) printQuotation(saved); return saved;
  } catch (error) { status.textContent = error.message || "No se pudo guardar la cotización."; status.classList.remove("hidden"); status.dataset.tone = "error"; return null; }
}

async function deleteQuotationFromForm() {
  const id = document.querySelector("#quotationId").value; if (!id || !confirm("¿Eliminar esta cotización?")) return;
  try { if (apiEnabled) await apiJson(`/api/quotations/${encodeURIComponent(id)}`, { method:"DELETE" }); state.quotations = state.quotations.filter((item) => item.id !== id); persistLocalQuotations(); document.querySelector("#quotationDialog").close(); renderCommercialSubmenu(areas.comercializacion); }
  catch (error) { alert(error.message || "No se pudo eliminar la cotización."); }
}

function printQuotation(quote) {
  const printableLines = (quote.lines || []).filter((line) => line.type === "title"
    ? String(line.title || line.description || "").trim()
    : String(line.description || "").trim() && Number(line.quantity || 0) > 0);
  if (!printableLines.some((line) => line.type !== "title")) return alert("Agrega al menos una línea completa de producto a la cotización.");
  const popup = window.open("", "_blank", "width=980,height=900");
  if (!popup) return alert("Habilita las ventanas emergentes para ver la cotización.");
  const data = quote.customerData || {}; const value = (item) => escapeHtml(String(item || ""));
  const logoUrl = new URL("assets/arte-color-uniformes-logo.png", window.location.href).href;
  const qrUrl = new URL("assets/arte-color-uniformes-qr.jpg", window.location.href).href;
  const longDate = quote.date
    ? new Intl.DateTimeFormat("es-SV", { day:"numeric", month:"long", year:"numeric", timeZone:"UTC" }).format(new Date(`${quote.date}T12:00:00Z`))
    : "Fecha pendiente";
  const rows = printableLines.map((line) => {
    if (line.type === "title") {
      return `<tr class="quote-title-row"><td colspan="4" style="width:auto!important">${value(line.title || line.description)}</td></tr>`;
    }
    const detail = String(line.notes || "").trim();
    const description = String(line.description || "").trim();
    const productDescription = [description, line.size ? `Talla: ${line.size}` : ""].filter(Boolean).join(" · ");
    const printableDescription = detail
      ? `<span class="quote-line-detail">${value(detail)}</span><span class="quote-line-product">${value(productDescription)}</span>`
      : value(productDescription);
    return `<tr><td class="qty">${value(line.quantity)}</td><td>${printableDescription}</td><td class="money">${formatControlSalesMoney(line.unitPriceCents)}</td><td class="money">${formatControlSalesMoney(line.lineTotalCents)}</td></tr>`;
  }).join("");
  const emailHref = `mailto:${encodeURIComponent(data.email || "")}?subject=${encodeURIComponent("Cotización - Arte y Color Uniformes")}&body=${encodeURIComponent(`Estimado/a ${data.contactName || quote.client}:\n\nAdjuntamos la cotización. La oferta tiene una vigencia de ${quote.validDays || 30} días.\n\nSaludos,\n${quote.seller}`)}`;
  const vatRow = Number(quote.vatCents || 0) > 0
    ? `<tr><td class="total-label">IVA 13%</td><td class="money">${formatControlSalesMoney(quote.vatCents)}</td></tr>`
    : "";
  popup.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Cotización</title><style>
    @page{size:Letter;margin:12mm 17mm 12mm}*{box-sizing:border-box}html{background:#dfe5ec}body{margin:0;color:#111;font:12px Arial,Helvetica,sans-serif}.sheet{position:relative;width:216mm;min-height:279mm;margin:12px auto;background:#fff;padding:12mm 17mm 10mm;overflow:visible}.letterhead{height:33mm;display:flex;justify-content:flex-end;align-items:flex-start}.brand-logo{display:block;width:78mm;height:30mm;object-fit:contain;object-position:right center}.city-date{text-align:right;margin:-3mm 8mm 10mm 0;font-size:13px}.recipient{margin:0 0 8mm}.recipient strong{display:block;font-size:14px;margin-bottom:3px}.recipient span{display:block;font-size:13px}.intro{font-size:13px;margin:0 0 2mm}.quote-number{position:absolute;left:17mm;top:13mm;color:#17794f;font-weight:800;letter-spacing:.08em}.quote-number small{display:block;color:#667085;font-size:9px;text-transform:uppercase;letter-spacing:.14em;margin-bottom:3px}.quote-table{width:100%;border-collapse:collapse;table-layout:fixed}.quote-table th,.quote-table td{border:1px solid #111}.quote-table th{padding:6px 5px;background:#bdbdbd;text-align:center;font-weight:800}.quote-table th:nth-child(1){width:9%}.quote-table th:nth-child(3){width:17%}.quote-table th:nth-child(4){width:16%}.quote-table td{padding:4px 7px;vertical-align:middle;line-height:1.22}.quote-table .qty{text-align:center;font-weight:700}.quote-table .money{text-align:right;white-space:nowrap}.quote-table .quote-title-row td{padding:7px 9px;background:#d9dde3!important;box-shadow:inset 0 0 0 1000px #d9dde3!important;color:#111!important;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.04em;print-color-adjust:exact!important;-webkit-print-color-adjust:exact!important}.quote-line-detail,.quote-line-product{display:block}.quote-line-detail{white-space:pre-wrap;margin-bottom:3px}.quote-line-product{color:#3d4652;font-weight:700}.quote-conclusion{break-inside:avoid;page-break-inside:avoid}.quote-totals{width:33%;margin-left:auto;border-collapse:collapse}.quote-totals td{height:8mm;border:1px solid #111;padding:4px 7px;font-weight:700}.quote-totals .total-label{text-align:left}.quote-totals .money{text-align:right;white-space:nowrap}.quote-totals tr:last-child td{font-size:13px;font-weight:900}.guarantee{clear:both;display:block;padding-top:2mm;font-size:12px;font-weight:800;margin:0 0 8mm}.terms{font-size:12px;line-height:1.55}.terms p{margin:2px 0}.terms strong{font-weight:800}.signature{margin-top:12mm;line-height:1.45}.signature .closing-word{margin-bottom:7mm}.signature strong,.signature span,.signature a{display:block}.signature a{color:#0645d6}.footer-brand{position:absolute;left:17mm;right:17mm;bottom:5mm;display:grid;grid-template-columns:1fr auto;grid-template-areas:"contact qr" "motto motto";align-items:end;column-gap:10mm;row-gap:2mm;color:#626b77;font-size:9px}.footer-contact{grid-area:contact;display:grid;grid-template-columns:1fr 1fr;gap:4px 12px}.footer-contact span{white-space:nowrap}.footer-qr{grid-area:qr;display:flex;align-items:center;gap:3mm;color:#17794f;font-weight:800;white-space:nowrap}.footer-qr img{display:block;width:16mm;height:16mm;object-fit:contain}.motto{grid-area:motto;width:100%;text-align:center;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap}.actions{position:fixed;z-index:10;top:14px;right:14px;display:flex;gap:8px;background:#182d4e;padding:8px;border-radius:12px;box-shadow:0 12px 30px #182d4e44}.actions button,.actions a{border:0;border-radius:8px;padding:10px 13px;background:#238760;color:white;text-decoration:none;font-weight:800;cursor:pointer}.actions button:last-child{background:white;color:#18233d}@media(max-width:850px){.sheet{margin:0;transform-origin:top left}.actions{position:sticky;justify-content:center;border-radius:0}}@media print{html,body{background:#fff;print-color-adjust:exact;-webkit-print-color-adjust:exact}.actions{display:none}.sheet{margin:0;width:auto;height:auto;min-height:0;padding:0;box-shadow:none}.brand-logo,.footer-qr img,.quote-table th,.quote-title-row td{print-color-adjust:exact!important;-webkit-print-color-adjust:exact!important}.quote-table thead{display:table-header-group}.quote-table tbody tr{break-inside:avoid;page-break-inside:avoid}.quote-conclusion{break-inside:avoid;page-break-inside:avoid}.footer-brand{position:static;margin-top:12mm}}
    .footer-contact{grid-template-columns:max-content max-content;column-gap:8mm;justify-content:start}
    .footer-brand{row-gap:4mm}
  </style></head><body><main class="sheet"><header class="letterhead"><img class="brand-logo" src="${value(logoUrl)}" alt="Arte y Color Uniformes"></header><p class="city-date">San Salvador, ${value(longDate)}</p><section class="recipient"><strong>${value(String(quote.client || "Cliente").toUpperCase())}</strong><span>${data.contactName ? `Atención: ${value(data.contactName)}` : "Presente"}</span></section><p class="intro">En atención a su solicitud y de la manera más atenta le presentamos la siguiente cotización:</p><table class="quote-table"><thead><tr><th>CANT.</th><th>DESCRIPCIÓN</th><th>PRECIO<br>UNITARIO</th><th>TOTAL</th></tr></thead><tbody>${rows}</tbody></table><section class="quote-conclusion"><table class="quote-totals"><tbody><tr><td class="total-label">SUBTOTAL</td><td class="money">${formatControlSalesMoney(quote.subtotalCents)}</td></tr>${vatRow}<tr><td class="total-label">TOTAL</td><td class="money">${formatControlSalesMoney(quote.totalCents)}</td></tr></tbody></table><p class="guarantee">*${value(quote.warrantyNote || "Todos nuestros productos están garantizados y elaborados con altos estándares de calidad.")}</p><section class="terms"><p><strong>${value(quote.commercialNotes || "Condiciones según oferta comercial")}</strong></p><p><b>Vigencia de oferta:</b> ${value(quote.validDays || 30)} días</p><p><b>Tiempo de entrega:</b> ${value(quote.deliveryTerms)}</p><p><b>Forma de Pago:</b> ${value(quote.paymentTerms)}</p><p><strong>${value(quote.specialSizesNote)}</strong></p></section><section class="signature"><p class="closing-word">Atentamente,</p><strong>${value(quote.seller)}</strong><span>${value(data.sellerRole || "Ejecutivo/a de ventas")}</span>${data.sellerPhone ? `<span>${value(data.sellerPhone)}</span>` : ""}${data.sellerEmail ? `<a href="mailto:${value(data.sellerEmail)}">${value(data.sellerEmail)}</a>` : ""}</section></section><footer class="footer-brand"><div class="footer-contact"><span>Arte y Color Uniformes</span><span>+503 2277-2032</span><span>arteycolor.bordados@gmail.com</span><span>+503 7202-8137</span></div><div class="footer-qr"><span>Catálogo digital</span><img src="${value(qrUrl)}" alt="Código QR de Arte y Color Uniformes"></div><div class="motto">Innovación, calidad y responsabilidad garantizada</div></footer></main><nav class="actions"><button onclick="window.print()">Imprimir / Guardar PDF</button><a href="${value(emailHref)}">Preparar correo</a><button onclick="window.close()">Cerrar</button></nav></body></html>`);
  popup.document.close();
  const quotationQrLabel = popup.document.querySelector(".footer-qr span");
  if (quotationQrLabel) quotationQrLabel.textContent = "Página web";
}

const CONTROL_SALES_FINANCIAL_ORDER_CUTOFF = "2026-07-01";

function isControlSalesEligibleFinancialOrder(order) {
  const orderDate = String(order?.date || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(orderDate)
    && orderDate >= CONTROL_SALES_FINANCIAL_ORDER_CUTOFF;
}

function controlSalesFinancialOrderLabel(order) {
  return `#${order.number || "—"} · ${order.client || "Sin cliente"} · ${order.seller || "Sin vendedor"}`;
}

function controlSalesPendingWonOpportunitySources() {
  return pendingWonOrderOpportunities().filter((item) => {
    const identities = new Set([item.id, item.crmOpportunityId, item.sourceOpportunityId].filter(Boolean).map(String));
    const hasQuotation = state.quotations.some((quotation) => identities.has(String(quotation.opportunityId || "")));
    const hasOrder = state.controlSales.some((order) => !order.archived && identities.has(String(order.sourceOpportunityId || "")));
    return !hasQuotation && !hasOrder;
  });
}

function renderControlSalesFinancialOrderResults(query = "") {
  const container = document.querySelector("#controlSalesFinancialOrderResults");
  if (!container) return;
  const currentOrderId = document.querySelector("#controlSalesId")?.value || "";
  const selectedId = document.querySelector("#controlSalesFinancialOrderId")?.value || "";
  const linkedIds = controlSalesLinkedFinancialOrderIds(currentOrderId);
  const terms = normalizeKey(query).split(/\s+/).filter(Boolean);
  const availableOrders = state.financialOrders
    .filter(isControlSalesEligibleFinancialOrder)
    .filter((order) => !linkedIds.has(String(order.id)) && String(order.id) !== selectedId)
    .filter((order) => {
      if (!terms.length) return true;
      const haystack = normalizeKey([order.number, order.client, order.seller, order.orderNumber].join(" "));
      return terms.every((term) => haystack.includes(term));
    })
    .sort((a, b) => String(a.date || "9999-12-31").localeCompare(String(b.date || "9999-12-31"))
      || Number(a.number || 0) - Number(b.number || 0));
  const availableWins = controlSalesPendingWonOpportunitySources()
    .filter((item) => {
      if (!terms.length) return true;
      const haystack = normalizeKey([item.company, item.seller, item.segment, closureResult(item)?.date].join(" "));
      return terms.every((term) => haystack.includes(term));
    })
    .sort((a, b) => String(closureResult(a)?.date || a.date || "").localeCompare(String(closureResult(b)?.date || b.date || "")));
  const availableCount = availableOrders.length + availableWins.length;
  const count = document.querySelector("#controlSalesFinancialOrderCount");
  if (count) count.textContent = `${availableCount} ${availableCount === 1 ? "origen" : "orígenes"}`;
  container.innerHTML = availableCount
    ? `${availableOrders.map((order) => `<button type="button" class="control-sales-source-option" data-control-sales-source-id="${escapeHtml(order.id)}"><time datetime="${escapeHtml(order.date || "")}">${formatDate(order.date) || "Sin fecha"}</time><b>#${escapeHtml(order.number || "—")}</b><span title="${escapeHtml(order.client || "Sin cliente")}">${escapeHtml(order.client || "Sin cliente")}</span><small title="${escapeHtml(order.seller || "Sin vendedor")}">${escapeHtml(order.seller || "Sin vendedor")}</small><strong>${formatMoney(order.sale || 0)}</strong><i>Seleccionar</i></button>`).join("")}${availableWins.map((item) => {
      const result = closureResult(item);
      return `<button type="button" class="control-sales-source-option is-won-opportunity" data-control-sales-opportunity-id="${escapeHtml(item.id)}"><time datetime="${escapeHtml(result?.date || item.date || "")}">${formatDate(result?.date || item.date) || "Sin fecha"}</time><b>GANADA</b><span title="${escapeHtml(item.company || "Sin cliente")}">${escapeHtml(item.company || "Sin cliente")}</span><small title="${escapeHtml(item.seller || "Sin vendedor")}">${escapeHtml(item.seller || "Sin vendedor")}</small><strong>${formatMoney(item.amount || 0)}</strong><i>Seleccionar</i></button>`;
    }).join("")}`
    : `<p class="control-sales-source-empty">${terms.length ? "No hay pedidos ni oportunidades ganadas que coincidan con la búsqueda." : "No hay pedidos u oportunidades ganadas pendientes de ingresar."}</p>`;
}

function setControlSalesFinancialOrderSelection(order) {
  const hidden = document.querySelector("#controlSalesFinancialOrderId");
  const selected = document.querySelector("#controlSalesFinancialOrderSelected");
  const number = document.querySelector("#controlSalesNumber");
  const seller = document.querySelector("#controlSalesSeller");
  const client = document.querySelector("#controlSalesClient");
  if (!hidden || !selected) return;
  hidden.value = order?.id || "";
  [number, seller, client].forEach((input) => { input.readOnly = Boolean(order); });
  if (!order) {
    number.value = "";
    seller.value = "";
    client.value = "";
    selected.innerHTML = "";
    updateControlSalesReconciliation();
    return;
  }
  number.value = order.number || "";
  seller.value = controlSalesResponsibleSeller(order);
  client.value = order.client || "";
  const commercialName = document.querySelector("#controlSalesCommercialName");
  if (commercialName && !commercialName.value.trim()) commercialName.value = order.client || "";
  selected.innerHTML = `<article class="control-sales-source-selected"><div><span>Pedido seleccionado</span><strong>${escapeHtml(controlSalesFinancialOrderLabel(order))}</strong><small>Los datos de origen quedan vinculados y protegidos contra duplicados.</small></div><em>Listo para detalle</em><button type="button" data-control-sales-source-clear>Cambiar</button></article>`;
  document.querySelector("#controlSalesFinancialOrderResults").innerHTML = "";
  document.querySelector("#controlSalesFinancialOrderSearch").value = "";
  document.querySelector("#controlSalesFinancialOrderPicker").open = false;
  updateControlSalesReconciliation();
}

function selectControlSalesFinancialOrder(orderId) {
  const order = state.financialOrders.find((item) => String(item.id) === String(orderId));
  if (order) {
    document.querySelector("#controlSalesSourceOpportunityId").value = order.sourceOpportunityId || "";
    document.querySelector("#controlSalesSourceQuotationId").value = "";
    document.querySelector("#controlSalesOpportunityReference").classList.add("hidden");
    setControlSalesFinancialOrderSelection(order);
  }
}

function selectControlSalesWonOpportunity(opportunityId) {
  const item = getOpportunitySubmenu().items.find((opportunity) => String(opportunity.id) === String(opportunityId));
  if (!item || !controlSalesPendingWonOpportunitySources().some((opportunity) => String(opportunity.id) === String(item.id))) return;
  const result = closureResult(item);
  setControlSalesFinancialOrderSelection(null);
  document.querySelector("#controlSalesFinancialOrderId").value = "";
  document.querySelector("#controlSalesSourceOpportunityId").value = item.id;
  document.querySelector("#controlSalesSourceQuotationId").value = "";
  document.querySelector("#controlSalesNumber").value = nextControlSalesOrderNumber();
  document.querySelector("#controlSalesDate").value = result?.date || item.date || todayISO();
  document.querySelector("#controlSalesSeller").value = item.seller || "";
  document.querySelector("#controlSalesClient").value = item.company || "";
  document.querySelector("#controlSalesCommercialName").value = item.company || "";
  document.querySelector("#controlSalesContactName").value = item.contact || "";
  document.querySelector("#controlSalesPhone").value = item.phone || "";
  document.querySelector("#controlSalesAddress").value = item.location || "";
  document.querySelector("#controlSalesLines").innerHTML = controlSalesLineTemplate({
    product: item.segment || "Producto pendiente",
    quantity: "1",
    unitPriceCents: Math.round(Number(item.amount || 0) * 100),
    notes: result?.comment || item.note || "Oportunidad ganada sin cotización"
  });
  fillControlSalesFinancialData({
    date: result?.date || item.date || todayISO(), seller: item.seller || "", client: item.company || "",
    sale: Number(item.amount || 0), orderNumber: document.querySelector("#controlSalesNumber").value
  });
  const reference = document.querySelector("#controlSalesOpportunityReference");
  reference.classList.remove("hidden");
  reference.innerHTML = `<div><span>Oportunidad ganada seleccionada</span><strong>${formatMoney(item.amount || 0)}</strong></div><p>${escapeHtml(item.company || "Sin cliente")} · ${escapeHtml(item.segment || "Sin producto")} · sin cotización ni pedido previo.</p>`;
  document.querySelector("#controlSalesFinancialOrderSelected").innerHTML = `<article class="control-sales-source-selected is-won-opportunity"><div><span>Oportunidad ganada</span><strong>${escapeHtml(item.company || "Sin cliente")} · ${escapeHtml(item.seller || "Sin vendedor")}</strong><small>Se creará el registro financiero y la orden de pedido al guardar.</small></div><em>Lista para pedido</em><button type="button" data-control-sales-source-clear>Cambiar</button></article>`;
  document.querySelector("#controlSalesFinancialOrderSearch").value = "";
  document.querySelector("#controlSalesFinancialOrderPicker").open = false;
  updateControlSalesFormTotal();
  syncControlSalesFinancialData();
}

function controlSalesLineTemplate(detail = {}) {
  const id = detail.id || crypto.randomUUID();
  const price = detail.unitPriceCents == null ? "" : (detail.unitPriceCents / 100).toFixed(2);
  return `<div class="control-sales-line" data-line-id="${escapeHtml(id)}"><label>Producto<input data-line-product required value="${escapeHtml(detail.product || "")}"></label><label>Talla<input data-line-size value="${escapeHtml(detail.size || "")}"></label><label>Cantidad<input class="control-sales-quantity-input" data-line-quantity required type="text" inputmode="decimal" autocomplete="off" spellcheck="false" pattern="[0-9]+([.,][0-9]+)?" title="Ingresa una cantidad válida, por ejemplo 1.02" placeholder="0.00" aria-label="Cantidad decimal" value="${escapeHtml(detail.quantity || "1")}"></label><label>Precio unitario<input data-line-price required type="number" min="0" step="0.01" value="${price}"></label><label>IVA 13%<input data-line-vat type="number" readonly tabindex="-1" aria-readonly="true" value="${((detail.vatCents || 0) / 100).toFixed(2)}"></label><output data-line-total>${formatControlSalesMoney(detail.lineTotalCents || 0)}</output><label>Observaciones<input data-line-notes value="${escapeHtml(detail.notes || "")}"></label><button type="button" data-control-sales-remove-line aria-label="Quitar línea">×</button></div>`;
}

function updateControlSalesReconciliation(totalCents = null) {
  const panel = document.querySelector("#controlSalesReconciliation");
  if (!panel) return;
  const sourceId = document.querySelector("#controlSalesFinancialOrderId")?.value || "";
  const sourceOrder = state.financialOrders.find((order) => String(order.id) === String(sourceId));
  const detailTotal = totalCents == null
    ? [...document.querySelectorAll("#controlSalesLines [data-line-total]")]
      .reduce((sum, output) => sum + Math.round(Number(String(output.textContent).replace(/[^0-9.-]/g, "")) * 100), 0)
    : totalCents;
  const expected = sourceOrder ? Math.round(Number(sourceOrder.sale || 0) * 100) : 0;
  const variance = detailTotal - expected;
  const stateName = !sourceOrder ? "empty" : Math.abs(variance) < 1 ? "balanced" : variance > 0 ? "over" : "under";
  const message = !sourceOrder
    ? "Selecciona un pedido para conciliar."
    : stateName === "balanced"
      ? "Conciliado: el detalle liquida completamente el pedido."
      : variance > 0
        ? "El detalle excede el monto del pedido. Se guardará con alerta."
        : "El detalle no cubre el monto del pedido. Se guardará con alerta.";
  panel.dataset.state = stateName;
  document.querySelector("#controlSalesExpectedTotal").textContent = formatControlSalesMoney(expected);
  document.querySelector("#controlSalesDetailedTotal").textContent = formatControlSalesMoney(detailTotal);
  document.querySelector("#controlSalesVariance").textContent = formatControlSalesMoney(variance);
  document.querySelector("#controlSalesReconciliationMessage").textContent = message;
  document.querySelector("#controlSalesFooterReconciliation").textContent = document.querySelector("#controlSalesDialog")?.dataset.orderFormatOnly === "true"
    ? "Detalle listo para guardar e imprimir."
    : !sourceOrder
    ? "Selecciona un pedido para conciliar."
    : stateName === "balanced"
      ? `Pedido ${formatControlSalesMoney(expected)} · Conciliado`
      : `Pedido ${formatControlSalesMoney(expected)} · Descuadre ${formatControlSalesMoney(variance)}`;
}

function updateControlSalesFormTotal() {
  let subtotalCents = 0;
  let vatCents = 0;
  const documentType = document.querySelector('input[name="controlSalesDocumentType"]:checked')?.value || "CF";
  document.querySelectorAll("#controlSalesLines .control-sales-line").forEach((line) => {
    const quantity = parseControlSalesDecimal(line.querySelector("[data-line-quantity]").value);
    const price = Math.round(Number(line.querySelector("[data-line-price]").value || 0) * 100);
    const base = Math.round(quantity * price);
    const lineVat = documentType === "CCF" ? Math.round(base * 0.13) : 0;
    const lineTotal = base + lineVat;
    subtotalCents += base;
    vatCents += lineVat;
    line.querySelector("[data-line-vat]").value = (lineVat / 100).toFixed(2);
    line.querySelector("[data-line-total]").textContent = formatControlSalesMoney(lineTotal);
  });
  const perceptionCents = document.querySelector("#controlSalesPerceptionEnabled")?.checked
    ? Math.round(subtotalCents * 0.01)
    : 0;
  const cents = subtotalCents + vatCents + perceptionCents;
  document.querySelector("#controlSalesSubtotal").textContent = formatControlSalesMoney(subtotalCents);
  document.querySelector("#controlSalesVatTotal").textContent = formatControlSalesMoney(vatCents);
  document.querySelector("#controlSalesPerceptionTotal").textContent = formatControlSalesMoney(perceptionCents);
  document.querySelector("#controlSalesProformaTotal").textContent = formatControlSalesMoney(cents);
  document.querySelector("#controlSalesFormTotal").textContent = formatControlSalesMoney(cents);
  updateControlSalesReconciliation(cents);
}

function controlSalesDraftFromForm() {
  const documentType = document.querySelector('input[name="controlSalesDocumentType"]:checked')?.value || "CF";
  let subtotalCents = 0;
  let vatTotalCents = 0;
  const details = [...document.querySelectorAll("#controlSalesLines .control-sales-line")].map((line) => {
    const quantity = normalizeControlSalesDecimal(line.querySelector("[data-line-quantity]").value) || "0";
    const quantityValue = parseControlSalesDecimal(quantity);
    const unitPriceCents = Math.round(Number(line.querySelector("[data-line-price]").value || 0) * 100);
    const baseCents = Math.round(quantityValue * unitPriceCents);
    const vatCents = documentType === "CCF" ? Math.round(baseCents * 0.13) : 0;
    subtotalCents += baseCents;
    vatTotalCents += vatCents;
    return {
      product: line.querySelector("[data-line-product]").value.trim() || "Producto pendiente",
      size: line.querySelector("[data-line-size]").value.trim(),
      quantity,
      unitPriceCents,
      vatCents,
      lineTotalCents: baseCents + vatCents,
      notes: line.querySelector("[data-line-notes]").value.trim()
    };
  });
  const perceptionCents = document.querySelector("#controlSalesPerceptionEnabled")?.checked
    ? Math.round(subtotalCents * 0.01)
    : 0;
  return {
    number: document.querySelector("#controlSalesNumber").value.trim() || "BORRADOR",
    date: document.querySelector("#controlSalesDate").value || todayISO(),
    seller: document.querySelector("#controlSalesSeller").value.trim(),
    client: document.querySelector("#controlSalesClient").value.trim(),
    status: document.querySelector("#controlSalesOrderStatus").value,
    documentType,
    proformaData: collectControlSalesProformaData(),
    subtotalCents,
    vatTotalCents,
    perceptionCents,
    totalCents: subtotalCents + vatTotalCents + perceptionCents,
    details
  };
}

function nextControlSalesOrderNumber() {
  const highest = state.controlSales.reduce((current, order) => {
    const value = String(order.number || "").trim();
    return /^\d+$/.test(value) ? Math.max(current, Number(value)) : current;
  }, 0);
  return String(highest + 1);
}

function openControlSalesForm(order = null, sourceFinancialOrder = null, sourceWin = null, formatOnly = false, sourceQuotation = null, financialCompletionOnly = false, directOrderFlow = false) {
  ensureControlSalesDialogs();
  const dialog = document.querySelector("#controlSalesDialog");
  dialog.classList.toggle("control-sales-order-format-only", formatOnly);
  dialog.dataset.orderFormatOnly = formatOnly ? "true" : "false";
  dialog.dataset.financialCompletionOnly = financialCompletionOnly ? "true" : "false";
  dialog.dataset.directOrderFlow = directOrderFlow ? "true" : "false";
  document.querySelector("#controlSalesDialogTitle").textContent = order ? `Editar pedido #${order.number}` : directOrderFlow ? "Nota de pedido directa" : "Nuevo pedido";
  const saveStatus = document.querySelector("#controlSalesSaveStatus");
  saveStatus.classList.add("hidden");
  saveStatus.textContent = "";
  saveStatus.dataset.tone = "success";
  dialog.querySelector('button[type="submit"]').textContent = financialCompletionOnly ? "Guardar registro financiero" : order ? "Guardar cambios" : directOrderFlow ? "Enviar a autorización final" : "Guardar orden";
  document.querySelector("#controlSalesId").value = order?.id || "";
  document.querySelector("#controlSalesSourceOpportunityId").value = order?.sourceOpportunityId || sourceWin?.id || "";
  document.querySelector("#controlSalesSourceQuotationId").value = order?.sourceQuotationId || sourceQuotation?.id || "";
  const sourceOrder = sourceFinancialOrder || (order?.financialOrderId
    ? state.financialOrders.find((item) => String(item.id) === String(order.financialOrderId))
    : null);
  const opportunityReference = document.querySelector("#controlSalesOpportunityReference");
  opportunityReference.classList.toggle("hidden", !sourceWin);
  opportunityReference.innerHTML = sourceWin ? `<div><span>Valor estimado de la oportunidad</span><strong>${formatMoney(sourceWin.amount || 0)}</strong></div><p>Solo referencia comercial. No se suma al pedido; el total confirmado se calcula con las cantidades y precios unitarios ingresados abajo.</p>` : "";
  setControlSalesFinancialOrderSelection(sourceOrder);
  document.querySelector("#controlSalesFinancialOrderId").value = order?.financialOrderId || sourceOrder?.id || "";
  document.querySelector("#controlSalesNumber").value = sourceOrder?.number || order?.number || nextControlSalesOrderNumber();
  document.querySelector("#controlSalesDate").value = order?.date || sourceQuotation?.date || sourceWin?.date || todayISO();
  document.querySelector("#controlSalesSeller").value = sourceOrder?.seller || (order ? controlSalesResponsibleSeller(order) : "") || sourceQuotation?.seller || sourceWin?.seller || "";
  document.querySelector("#controlSalesClient").value = sourceOrder?.client || order?.client || sourceQuotation?.client || sourceWin?.company || "";
  const quotationData = sourceQuotation ? {
    ...(sourceQuotation.customerData || {}),
    paymentTerms: sourceQuotation.paymentTerms || "",
    generalNotes: sourceQuotation.commercialNotes || ""
  } : {};
  fillControlSalesProformaData(order?.proformaData || quotationData, order || sourceOrder);
  fillControlSalesFinancialData(sourceOrder || {}, order || {
    number: document.querySelector("#controlSalesNumber").value,
    date: document.querySelector("#controlSalesDate").value,
    seller: document.querySelector("#controlSalesSeller").value,
    client: document.querySelector("#controlSalesClient").value,
    proformaData: quotationData
  });
  const financialAnnex = dialog.querySelector(".control-sales-financial-annex");
  const financialAnnexReadOnly = !directOrderFlow && !financialCompletionOnly && state.activeArea !== "financiera";
  financialAnnex.classList.toggle("is-readonly", financialAnnexReadOnly);
  financialAnnex.querySelectorAll("input, select, textarea").forEach((field) => {
    field.disabled = financialAnnexReadOnly;
  });
  const financialAnnexHelp = financialAnnex.querySelector("[data-financial-annex-help]");
  financialAnnexHelp.textContent = financialAnnexReadOnly
    ? "Solo editable desde Comercialización → Pedidos"
    : "Anexo al formulario heredado · se conserva dentro del mismo pedido";
  if (!order && sourceWin && !document.querySelector("#controlSalesCommercialName").value) {
    document.querySelector("#controlSalesCommercialName").value = sourceWin.company || "";
  }
  document.querySelector("#controlSalesOrderStatus").value = order?.status === "Histórica" ? "Activa" : (order?.status || "Activa");
  const documentType = order?.documentType === "CCF" ? "CCF" : "CF";
  document.querySelector(`input[name="controlSalesDocumentType"][value="${documentType}"]`).checked = true;
  const initialDetails = order?.details?.length
    ? order.details
    : sourceQuotation?.lines?.length
      ? sourceQuotation.lines.filter((line) => line.type !== "title").map((line) => ({ id: line.id, product: line.description, size: line.size, quantity: line.quantity, unitPriceCents: line.unitPriceCents, notes: line.notes }))
    : sourceWin
      ? [{ product: sourceWin.segment && sourceWin.segment !== "Sin producto registrado" ? sourceWin.segment : "", quantity: "1" }]
      : [{}];
  document.querySelector("#controlSalesLines").innerHTML = initialDetails.map(controlSalesLineTemplate).join("");
  document.querySelector("#controlSalesFinancialOrderSearch").value = "";
  document.querySelector("#controlSalesFinancialOrderPicker").open = false;
  renderControlSalesFinancialOrderResults("");
  updateControlSalesFormTotal();
  syncControlSalesFinancialData();
  if (formatOnly) document.querySelector("#controlSalesFooterReconciliation").textContent = "Detalle listo para guardar e imprimir.";
  dialog.showModal();
}

function openCrmWonOrder(opportunityId) {
  const win = crmResultWinHistory().find((item) => String(item.id) === String(opportunityId));
  if (!win) return;
  const identityKeys = crmWonIdentityKeys(win);
  const financialOrder = state.financialOrders.find((order) => identityKeys.has(String(order.sourceOpportunityId || "")));
  const detailOrder = (financialOrder
    ? state.controlSales.find((order) => String(order.financialOrderId || "") === String(financialOrder.id) && !order.archived)
    : null)
    || state.controlSales.find((order) => identityKeys.has(String(order.sourceOpportunityId || "")) && !order.archived);
  if (detailOrder) {
    openControlSalesDetail(detailOrder.id, true);
    return;
  }
  const quotation = latestQuotationForWonOpportunity(win);
  openControlSalesForm(null, null, win, true, quotation || null);
}

function printControlSalesProformaInline(order) {
  order = { ...order, seller: controlSalesResponsibleSeller(order) };
  const popup = window.open("", "_blank", "width=980,height=900");
  if (!popup) {
    alert("El navegador bloqueó la ventana de impresión. Habilita las ventanas emergentes e inténtalo nuevamente.");
    return;
  }
  const data = order.proformaData || {};
  const subtotalCents = Number(order.subtotalCents ?? order.details.reduce((sum, detail) => sum + Number(detail.lineTotalCents || 0) - Number(detail.vatCents || 0), 0));
  const vatCents = Number(order.vatTotalCents ?? order.details.reduce((sum, detail) => sum + Number(detail.vatCents || 0), 0));
  const perceptionCents = Number(order.perceptionCents ?? Math.max(0, Number(order.totalCents || 0) - subtotalCents - vatCents));
  const brandUrl = new URL("assets/proforma-konfi-arte-color-transparent.png", window.location.href).href;
  const value = (content) => escapeHtml(String(content || "")) || "&nbsp;";
  const rawOrderNumber = String(order.number || "BORRADOR").trim();
  const printableOrderNumber = /^\d+$/.test(rawOrderNumber)
    ? `OP-${rawOrderNumber.padStart(4, "0")}`
    : rawOrderNumber;
  const invoiceType = order.documentType === "CCF" ? "Credito fiscal" : "Consumidor final";
  const strategies = [
    ["RETENCION", "Retención"],
    ["EXPANSION", "Expansión"],
    ["ATRACCION", "Atracción"],
    ["RECUPERACION", "Recuperación"]
  ];
  const lineRows = order.details.map((detail) => {
    const baseCents = Number(detail.lineTotalCents || 0) - Number(detail.vatCents || 0);
    const description = [detail.product, detail.size ? `Talla ${detail.size}` : "", detail.notes].filter(Boolean).join(" - ");
    return `<tr><td class="qty">${value(detail.quantity)}</td><td>${value(description)}</td><td class="money">${formatControlSalesMoney(detail.unitPriceCents || 0)}</td><td class="money">${formatControlSalesMoney(baseCents)}</td></tr>`;
  }).join("");
  const blankRows = Array.from(
    { length: Math.max(0, 12 - order.details.length) },
    () => `<tr class="blank"><td>&nbsp;</td><td></td><td></td><td></td></tr>`
  ).join("");
  popup.document.open();
  popup.document.write(`<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>Orden de pedido ${value(printableOrderNumber)}</title>
<style>
@page{size:Letter portrait;margin:8mm 11mm 9mm}*{box-sizing:border-box}html,body{margin:0;background:#fff;color:#202b43;font-family:Arial,Helvetica,sans-serif;font-size:11px}.sheet{width:100%;min-height:250mm}.screen-actions{position:fixed;z-index:10;top:16px;right:18px;display:flex;gap:8px;padding:8px;border-radius:12px;background:rgba(25,38,60,.92);box-shadow:0 8px 24px rgba(0,0,0,.24)}.screen-actions button{border:0;border-radius:8px;padding:9px 14px;background:#2aa879;color:#fff;font-weight:800;cursor:pointer}.screen-actions button:last-child{background:#fff;color:#27344b}.top{display:grid;grid-template-columns:56% 44%;align-items:start;min-height:32mm}.brand-panel img{display:block;width:100%;max-width:360px;height:auto}.brand-panel time{display:block;margin:7px 0 0 10px;font-size:13px;font-weight:800}.order-panel{text-align:center;padding-top:2px}.order-panel h1{margin:0;font-size:19px;letter-spacing:.02em}.order-panel .order-number{display:block;margin:11px 0 17px;color:#b7271d;font-size:25px;font-weight:900}.order-panel p{margin:0;font-size:13px}.fields{margin-top:4px}.field{display:grid;grid-template-columns:178px 1fr;align-items:end;min-height:22px}.field label{padding:0 8px 3px 0;font-size:12px;font-weight:800}.field strong{min-height:20px;padding:0 0 3px;border-bottom:1px solid #202b43;font-size:12px;font-weight:800}.items{width:100%;margin-top:9px;border-collapse:collapse;table-layout:fixed;color:#18202c}.items th{height:42px;border:1px solid #202b43;padding:5px 8px;color:#39455a;font-size:10px;text-align:center}.items td{height:22px;border:1px solid #9ba6b7;padding:3px 6px;font-size:10px}.items .qty{width:13%;text-align:center}.items th:nth-child(1){width:13%}.items th:nth-child(2){width:52%}.items th:nth-child(3){width:15.5%}.items th:nth-child(4){width:19.5%}.items .money{text-align:right;white-space:nowrap}.items tr.blank td{height:22px}.closing{display:grid;grid-template-columns:65.5% 34.5%;margin-top:7px}.notes{min-height:73px;border:1px solid #202b43;padding:12px;font-size:13px;font-weight:800}.notes span{display:block;margin-top:6px;font-size:10px;font-weight:500;white-space:pre-wrap}.totals{width:100%;border-collapse:collapse;color:#263148}.totals th,.totals td{height:18px;border:1px solid #a9b2c0;padding:3px 7px;font-size:10px}.totals th{text-align:left;text-transform:uppercase}.totals td{text-align:right;font-weight:800}.totals tr:last-child th,.totals tr:last-child td{font-size:13px;font-weight:900}.strategy-row{display:grid;grid-template-columns:repeat(4,1fr) 1.85fr;gap:10px;margin-top:10px;color:#465166;font-size:11px;font-weight:800}.strategy-item{display:grid;gap:5px}.check{display:inline-flex;width:13px;height:13px;align-items:center;justify-content:center;margin-left:3px;border:1px solid #202b43;color:#202b43;font-size:9px;font-style:normal}.customer-code{display:grid;gap:5px}.customer-code span:last-child{display:block;width:50px;min-height:14px;border-bottom:1px solid #202b43}.signatures{display:grid;grid-template-columns:1fr 1fr;gap:28mm;margin:24mm 8mm 0;text-align:center;font-size:11px;font-weight:800}.signature{border-top:1px solid #202b43;padding-top:7px}@media print{html,body{print-color-adjust:exact;-webkit-print-color-adjust:exact}.sheet{min-height:0}.screen-actions{display:none}}
</style></head><body><main class="sheet">
  <header class="top">
    <div class="brand-panel"><img src="${brandUrl}" alt="Konfi y Arte y Color"><time>${value(formatDate(order.date))}</time></div>
    <div class="order-panel"><h1>ORDEN DE PEDIDO</h1><strong class="order-number">No. ${value(printableOrderNumber)}</strong><p>Tipo de Factura: ${value(invoiceType)}</p></div>
  </header>
  <section class="fields">
    <div class="field"><label>Vendedor:</label><strong>${value(controlSalesResponsibleSeller(order))}</strong></div>
    <div class="field"><label>Nombre Comercial:</label><strong>${value(data.commercialName || order.client)}</strong></div>
    <div class="field"><label>Razon Social:</label><strong>${value(data.legalName)}</strong></div>
    <div class="field"><label>Giro:</label><strong>${value(data.businessActivity)}</strong></div>
    <div class="field"><label>Encargado/a:</label><strong>${value(data.contactName)}</strong></div>
    <div class="field"><label>Telefono:</label><strong>${value(data.phone)}</strong></div>
    <div class="field"><label>Direccion:</label><strong>${value(data.address)}</strong></div>
    <div class="field"><label>Email:</label><strong>${value(data.email)}</strong></div>
    <div class="field"><label>NIT No.:</label><strong>${value(data.taxId)}</strong></div>
    <div class="field"><label>Registro No.:</label><strong>${value(data.registrationNumber)}</strong></div>
    <div class="field"><label>Tipo de Contribuyente:</label><strong>${value(data.taxpayerType)}</strong></div>
    <div class="field"><label>Fecha de Entrega:</label><strong>${value(data.deliveryDate ? formatDate(data.deliveryDate) : "")}</strong></div>
    <div class="field"><label>Condiciones de Pago:</label><strong>${value(data.paymentTerms)}</strong></div>
  </section>
  <table class="items"><thead><tr><th>CANTIDAD</th><th>DESCRIPCION</th><th>PRECIO<br>UNITARIO</th><th>TOTAL</th></tr></thead><tbody>${lineRows}${blankRows}</tbody></table>
  <section class="closing">
    <div class="notes">Observaciones:<span>${value(data.generalNotes)}</span></div>
    <table class="totals"><tbody><tr><th>SUMAS</th><td>${formatControlSalesMoney(subtotalCents)}</td></tr><tr><th>1% PERCEPCION</th><td>${formatControlSalesMoney(perceptionCents)}</td></tr><tr><th>13% IVA</th><td>${formatControlSalesMoney(vatCents)}</td></tr><tr><th>TOTAL</th><td>${formatControlSalesMoney(order.totalCents || 0)}</td></tr></tbody></table>
  </section>
  <section class="strategy-row">
    ${strategies.map(([label, stored]) => `<div class="strategy-item"><span>${label}</span><i class="check">${data.strategy === stored ? "X" : ""}</i></div>`).join("")}
    <div class="customer-code"><span>CODIGO DE CLIENTE NO.:</span><span>${value(data.customerCode)}</span></div>
  </section>
  <section class="signatures"><div class="signature">CLIENTE O RESPONSABLE</div><div class="signature">REPRESENTANTE</div></section>
</main><nav class="screen-actions" aria-label="Acciones de impresión"><button type="button" onclick="window.print()">Imprimir</button><button type="button" onclick="window.close()">Cerrar</button></nav></body></html>`);
  popup.document.close();
}

function printControlSalesProforma(order) {
  order = { ...order, seller: controlSalesResponsibleSeller(order) };
  const printKey = `kmi-proforma-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  localStorage.setItem(printKey, JSON.stringify(order));
  const popup = window.open(
    `proforma-print.html?key=${encodeURIComponent(printKey)}`,
    "_blank",
    "width=980,height=900"
  );
  if (!popup) {
    localStorage.removeItem(printKey);
    alert("El navegador bloqueó la ventana de impresión. Habilita las ventanas emergentes e inténtalo nuevamente.");
    return;
  }
  window.setTimeout(() => localStorage.removeItem(printKey), 5 * 60 * 1000);
}

async function openControlSalesDetail(orderId, formatOnly = false) {
  ensureControlSalesDialogs();
  const order = await apiJson(`/api/control-sales/${encodeURIComponent(orderId)}`);
  const detailDialog = document.querySelector("#controlSalesDetailDialog");
  detailDialog.controlSalesOrder = order;
  detailDialog.classList.toggle("control-sales-order-format-only", formatOnly);
  detailDialog.dataset.orderFormatOnly = formatOnly ? "true" : "false";
  const warnings = [...(order.anomalies || []), ...order.details.flatMap((detail) => detail.reviewRequired ? [{ description: `Precio faltante en ${detail.product}; requiere revisión.` }] : (detail.anomalies || []))];
  const isBalanced = Number(order.varianceCents || 0) === 0;
  const approvalLabel = controlSalesOrderHasAuthorizedSignatures(order) ? "Aprobado · 2 firmas" : (order.commercialApprovalStatus === "Autorizada" || order.commercialApprovedAt) ? "Autorización comercial" : "Pendiente de autorización";
  document.querySelector("#controlSalesDetailContent").innerHTML = `<header class="control-sales-review-header"><div><p class="eyebrow">Orden ${escapeHtml(formatOrderCorrelative(order.number))}</p><h3>${escapeHtml(order.client)}</h3><span>${escapeHtml(controlSalesResponsibleSeller(order))}</span></div><div class="control-sales-review-header__aside"><em>${escapeHtml(approvalLabel)}</em><button type="button" data-control-sales-detail-close aria-label="Cerrar">×</button></div></header>
    <section class="control-sales-review-hero">
      <div class="control-sales-review-total"><small>Total del pedido</small><strong>${formatControlSalesMoney(order.totalCents || 0)}</strong><span>${order.details.length === 1 ? "1 producto" : `${order.details.length} productos`}</span></div>
      <div class="control-sales-review-meta"><article><small>Fecha</small><strong>${formatDate(order.date)}</strong></article><article><small>Estado</small><strong>${escapeHtml(order.status || "Activa")}</strong></article><article class="${isBalanced ? "balanced" : "mismatch"}"><small>Conciliación</small><strong>${isBalanced ? "Cuadrado" : formatControlSalesMoney(order.varianceCents || 0)}</strong></article></div>
    </section>
    <section class="control-sales-review-signatures" aria-label="Autorizaciones del pedido">
      ${commercialApprovalSignatureMarkup(order, true) || `<article class="control-sales-review-signature-pending"><span>1</span><div><small>Comercialización</small><strong>Pendiente de firma</strong></div></article>`}
      ${financeApprovalSignatureMarkup(order, true) || `<article class="control-sales-review-signature-pending"><span>2</span><div><small>Financiera</small><strong>Pendiente de firma</strong></div></article>`}
    </section>
    <section class="control-sales-review-products"><header><div><small>Resumen del pedido</small><h4>Productos</h4></div><span>Cantidad</span><span>Total</span></header>${order.details.map((detail) => `<article><div><strong>${escapeHtml(detail.product)}</strong><small>${escapeHtml(detail.size || "Sin talla")}</small></div><span>${escapeHtml(detail.quantity)}</span><strong>${formatControlSalesMoney(detail.lineTotalCents)}</strong></article>`).join("")}</section>
    <details class="control-sales-review-more">
      <summary><span><strong>Ver información completa</strong><small>Datos de proforma, desglose de impuestos y auditoría</small></span><i>⌄</i></summary>
      <div class="control-sales-review-more__content">
        ${warnings.length ? `<aside class="control-sales-warnings"><strong>⚠ Advertencias históricas</strong>${warnings.map((warning) => `<p>${escapeHtml(warning.description || warning.type || "Dato por revisar")}</p>`).join("")}</aside>` : ""}
        <section class="control-sales-detail-proforma"><h4>Datos de proforma</h4><div><article><small>Nombre comercial</small><strong>${escapeHtml(order.proformaData?.commercialName || order.client || "—")}</strong></article><article><small>Razón social</small><strong>${escapeHtml(order.proformaData?.legalName || "—")}</strong></article><article><small>Encargado</small><strong>${escapeHtml(order.proformaData?.contactName || "—")}</strong></article><article><small>Entrega</small><strong>${escapeHtml(order.proformaData?.deliveryDate ? formatDate(order.proformaData.deliveryDate) : "—")}</strong></article><article><small>Condición de pago</small><strong>${escapeHtml(order.proformaData?.paymentTerms || "—")}</strong></article><article><small>Estrategia</small><strong>${escapeHtml(order.proformaData?.strategy || "—")}</strong></article></div></section>
        <div class="control-sales-detail-lines"><div class="control-sales-detail-row head"><span>#</span><span>Producto</span><span>Talla</span><span>Cantidad</span><span>Precio</span><span>IVA</span><span>Total</span></div>${order.details.map((detail, index) => `<article class="control-sales-detail-row"><span>${index + 1}</span><strong>${escapeHtml(detail.product)}</strong><span>${escapeHtml(detail.size || "—")}</span><span>${escapeHtml(detail.quantity)}</span><span>${detail.unitPriceCents == null ? "Revisar" : formatControlSalesMoney(detail.unitPriceCents)}</span><span>${formatControlSalesMoney(detail.vatCents)}</span><strong>${formatControlSalesMoney(detail.lineTotalCents)}</strong></article>`).join("")}</div>
        <section class="control-sales-audit"><h4>Historial del pedido</h4>${order.audit.map((entry) => `<article><strong>${escapeHtml(entry.action)}</strong><span>${escapeHtml(entry.userName)} · ${escapeHtml(entry.createdAt)}</span><small>${escapeHtml(entry.summary)}</small></article>`).join("") || `<p>Historial importado desde Excel.</p>`}</section>
      </div>
    </details>
    <footer class="control-sales-review-footer"><button type="button" class="danger-btn" data-control-sales-detail-archive="${order.id}" title="Anular pedido">Anular</button><button type="button" data-control-sales-detail-close>Cerrar</button><button type="button" class="control-sales-print-btn" data-control-sales-detail-print="${order.id}">Imprimir</button><button type="button" class="primary-btn" data-control-sales-detail-edit="${order.id}">Editar</button></footer>`;
  if (!detailDialog.open) detailDialog.showModal();
}

function linkedQuotationForControlSalesOrder(order) {
  if (!order || order.source === "importado") return null;
  const directId = String(order.sourceQuotationId || "");
  if (directId) {
    const direct = state.quotations.find((item) => String(item.id || "") === directId);
    if (direct) return direct;
  }
  const converted = state.quotations.find((item) => String(item.convertedOrderId || "") === String(order.id || ""));
  if (converted) return converted;
  const financialOrder = state.financialOrders?.find((item) => String(item.id || "") === String(order.financialOrderId || ""));
  const sourceIds = new Set([
    order.sourceOpportunityId,
    financialOrder?.sourceOpportunityId,
    financialOrder?.crmOpportunityId,
    financialOrder?.quotationId
  ].map((value) => String(value || "")).filter(Boolean));
  const linked = state.quotations.filter((item) => (
    sourceIds.has(String(item.id || ""))
    || sourceIds.has(String(item.opportunityId || ""))
    || sourceIds.has(String(item.resultOpportunityId || ""))
  ));
  if (linked.length === 1) return linked[0];
  const exact = state.quotations.filter((item) => (
    normalizeKey(item.client || "") === normalizeKey(order.client || "")
    && normalizeKey(item.seller || "") === normalizeKey(order.seller || "")
    && Number(item.totalCents || 0) === Number(order.totalCents || 0)
  ));
  return exact.length === 1 ? exact[0] : null;
}

function controlSalesOrderHasAuthorizedSignatures(order) {
  const commercialSigned = order?.commercialApprovalStatus === "Autorizada" || Boolean(order?.commercialApprovedAt);
  const financeSigned = order?.financeApprovalStatus === "Aprobada" || Boolean(order?.financeApprovedAt);
  return isDirectOrderFlow(order) ? financeSigned : commercialSigned && financeSigned;
}

async function openControlSalesMatrixDetail(orderId) {
  ensureControlSalesDialogs();
  const [order, currentProductionSchedule] = await Promise.all([
    apiJson(`/api/control-sales/${encodeURIComponent(orderId)}`),
    apiJson("/api/production-schedule").catch(() => state.productionSchedule)
  ]);
  state.productionSchedule = Array.isArray(currentProductionSchedule) ? currentProductionSchedule : [];
  const dialog = document.querySelector("#controlSalesMatrixDetailDialog");
  const content = document.querySelector("#controlSalesMatrixDetailContent");
  const details = order.details?.length ? order.details : [{ product: "Sin detalle", quantity: 0, unitPriceCents: null, vatCents: 0, lineTotalCents: 0 }];
  const quotation = linkedQuotationForControlSalesOrder(order);
  const hasAuthorizedOrder = controlSalesOrderHasAuthorizedSignatures(order);
  const scheduledDetailIds = new Set(state.productionSchedule.flatMap((item) => item.items || []).map((item) => String(item.detailId)));
  const orderAssignments = state.productionSchedule.filter((item) => (item.items || []).some((scheduledItem) => String(scheduledItem.orderId) === String(order.id)));
  const hasUnscheduledDetails = details.some((detail) => !scheduledDetailIds.has(String(detail.id)));
  content.innerHTML = `<header class="control-sales-matrix-dialog__header">
      <div><small>Detalle de venta</small><h3>${escapeHtml(formatOrderCorrelative(order.number))}</h3></div>
      <button type="button" data-control-sales-matrix-close aria-label="Cerrar">×</button>
    </header>
    <section class="control-sales-matrix-meta" aria-label="Datos generales de la venta">
      <article><small>N.º de orden</small><strong>${escapeHtml(formatOrderCorrelative(order.number))}</strong></article>
      <article><small>Vendedor</small><strong>${escapeHtml(controlSalesResponsibleSeller(order))}</strong></article>
      <article><small>Fecha</small><strong>${formatDate(order.date)}</strong></article>
      <article><small>Cliente</small><strong>${escapeHtml(order.client || "—")}</strong></article>
    </section>
    <div class="control-sales-matrix-wrap">
      <table class="control-sales-matrix">
        <thead><tr>${hasAuthorizedOrder ? "<th>Agregar</th>" : ""}<th>Producto</th><th>Cantidad</th><th>Precio unitario</th><th>IVA</th><th>Total</th></tr></thead>
        <tbody>${details.map((detail) => `<tr>
          ${hasAuthorizedOrder ? `<td class="production-detail-select"><label title="${scheduledDetailIds.has(String(detail.id)) ? "Producto ya programado" : "Agregar al grupo de producción"}"><input type="checkbox" data-control-sales-production-detail="${escapeHtml(detail.id)}" ${scheduledDetailIds.has(String(detail.id)) ? "checked disabled" : ""}><span class="production-switch" aria-hidden="true"></span></label></td>` : ""}
          <td><strong>${escapeHtml(detail.product || "Sin producto")}</strong>${detail.size ? `<small>${escapeHtml(detail.size)}</small>` : ""}</td>
          <td class="number">${escapeHtml(detail.quantity ?? 0)}</td>
          <td class="money">${detail.unitPriceCents == null ? "—" : formatControlSalesMoney(detail.unitPriceCents)}</td>
          <td class="money">${formatControlSalesMoney(detail.vatCents || 0)}</td>
          <td class="money line-total">${formatControlSalesMoney(detail.lineTotalCents || 0)}</td>
        </tr>`).join("")}</tbody>
        <tfoot><tr><th colspan="${hasAuthorizedOrder ? 5 : 4}">Total de la venta</th><td class="money">${formatControlSalesMoney(order.totalCents || 0)}</td></tr></tfoot>
      </table>
    </div>
    <footer class="control-sales-matrix-dialog__footer">
      <div class="control-sales-matrix-dialog__documents">
        ${quotation ? `<button type="button" data-control-sales-matrix-quotation title="Abrir cotización"><span aria-hidden="true">📄</span>Cotización</button>` : ""}
        ${hasAuthorizedOrder ? `<button type="button" class="authorized" data-control-sales-matrix-order title="Abrir orden de pedido autorizada con firmas"><span aria-hidden="true">✓</span>Orden autorizada</button>` : ""}
        ${hasAuthorizedOrder && hasUnscheduledDetails ? `<button type="button" class="production" data-control-sales-production-schedule disabled><span aria-hidden="true">＋</span><b>Agendar producción</b></button>` : ""}
        ${orderAssignments.length ? `<button type="button" class="production scheduled" data-control-sales-production-edit><span aria-hidden="true">✎</span><b>Editar producción</b></button>` : ""}
      </div>
      <button type="button" data-control-sales-matrix-close>Cerrar</button>
    </footer>`;
  content.querySelectorAll("[data-control-sales-matrix-close]").forEach((button) => button.addEventListener("click", () => dialog.close()));
  content.querySelector("[data-control-sales-matrix-quotation]")?.addEventListener("click", () => printQuotation(quotation));
  content.querySelector("[data-control-sales-matrix-order]")?.addEventListener("click", () => printControlSalesProforma(order));
  const scheduleButton = content.querySelector("[data-control-sales-production-schedule]");
  const productionInputs = [...content.querySelectorAll("[data-control-sales-production-detail]")];
  const refreshScheduleButton = () => {
    const count = productionInputs.filter((input) => input.checked && !input.disabled).length;
    productionInputs.forEach((input) => input.closest("tr")?.classList.toggle("is-production-selected", input.checked));
    if (scheduleButton) { scheduleButton.disabled = count === 0; scheduleButton.querySelector("b").textContent = count ? `Agendar producción (${count})` : "Agendar producción"; }
  };
  productionInputs.forEach((input) => input.addEventListener("change", refreshScheduleButton));
  scheduleButton?.addEventListener("click", () => {
    const selectedIds = new Set(productionInputs.filter((input) => input.checked && !input.disabled).map((input) => String(input.dataset.controlSalesProductionDetail)));
    const selectedItems = details.filter((detail) => selectedIds.has(String(detail.id))).map((detail) => ({ detailId:detail.id, orderId:order.id, orderNumber:formatOrderCorrelative(order.number), client:order.client, product:detail.product, size:detail.size, quantity:detail.quantity, notes:detail.notes || "" }));
    if (selectedItems.length) openProductionScheduleDialog(null, selectedItems);
  });
  content.querySelector("[data-control-sales-production-edit]")?.addEventListener("click", () => {
    const assignment = orderAssignments[0];
    state.productionWeekStart = productionMonday(assignment.productionDate);
    localStorage.setItem(productionWeekStorageKey, state.productionWeekStart);
    openProductionScheduleDialog(assignment);
  });
  if (!dialog.open) dialog.showModal();
}

function wireControlSales() {
  const rerender = () => { state.controlSalesPage = 1; renderCommercialSubmenu(areas.operaciones); };
  document.querySelector("[data-control-sales-query]")?.addEventListener("input", (event) => { state.controlSalesQuery = event.target.value; rerender(); const input = document.querySelector("[data-control-sales-query]"); input?.focus({ preventScroll: true }); input?.setSelectionRange(input.value.length, input.value.length); });
  [["seller","controlSalesSeller"],["status","controlSalesStatus"],["sort","controlSalesSort"]].forEach(([name,key]) => document.querySelector(`[data-control-sales-${name}]`)?.addEventListener("change", (event) => { state[key] = event.target.value; rerender(); }));
  document.querySelector("[data-control-sales-period-year]")?.addEventListener("change", (event) => {
    state.controlSalesPeriodYear = event.target.value;
    saveControlSalesPeriod();
    rerender();
  });
  document.querySelector("[data-control-sales-period-month]")?.addEventListener("change", (event) => {
    state.controlSalesPeriodMonth = event.target.value;
    saveControlSalesPeriod();
    rerender();
  });
  document.querySelector("[data-control-sales-new]")?.addEventListener("click", () => openControlSalesForm());
  document.querySelectorAll("[data-control-sales-print]").forEach((button) => button.addEventListener("click", () => {
    const order = state.controlSales.find((item) => item.id === button.dataset.controlSalesPrint);
    if (order) printControlSalesProforma(order);
  }));
  document.querySelectorAll("[data-control-sales-view]").forEach((button) => {
    const openDetail = () => openControlSalesDetail(button.dataset.controlSalesView);
    button.addEventListener("click", openDetail);
    button.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openDetail();
    });
  });
  document.querySelectorAll("[data-control-sales-matrix-view]").forEach((row) => {
    const openDetail = () => openControlSalesMatrixDetail(row.dataset.controlSalesMatrixView).catch((error) => alert(error.message || "No se pudo abrir el detalle de la venta."));
    row.addEventListener("click", openDetail);
    row.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openDetail();
    });
  });
  document.querySelectorAll("[data-control-sales-edit]").forEach((button) => button.addEventListener("click", () => openControlSalesForm(state.controlSales.find((order) => order.id === button.dataset.controlSalesEdit))));
  document.querySelectorAll("[data-control-sales-archive]").forEach((button) => button.addEventListener("click", async () => { const order = state.controlSales.find((item) => item.id === button.dataset.controlSalesArchive); if (!order) return; const reason = prompt(order.archived ? "Motivo de restauración:" : "Motivo de anulación o archivo:"); if (reason === null || !reason.trim()) return; await apiJson(`/api/control-sales/${encodeURIComponent(order.id)}`, { method:"PATCH", body:JSON.stringify({ archived:!order.archived, reason, updatedBy:state.currentUser?.name }) }); loadControlSales(); }));
  document.querySelectorAll("[data-control-sales-page]").forEach((button) => button.addEventListener("click", () => { state.controlSalesPage += button.dataset.controlSalesPage === "next" ? 1 : -1; renderCommercialSubmenu(areas.operaciones); }));
}

function wirePurchaseOrders() {
  document.querySelector("[data-purchase-order-search]")?.addEventListener("input", (event) => {
    state.purchaseOrderQuery = event.target.value;
    state.purchaseOrderPage = 1;
    renderCommercialSubmenu(areas.financiera);
    const searchInput = document.querySelector("[data-purchase-order-search]");
    if (!searchInput) return;
    searchInput.focus({ preventScroll: true });
    searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
  });
  document.querySelectorAll("[data-purchase-order-status]").forEach((button) => button.addEventListener("click", () => { state.purchaseOrderStatus = button.dataset.purchaseOrderStatus; state.purchaseOrderPage = 1; renderCommercialSubmenu(areas.financiera); }));
  document.querySelector("[data-purchase-order-new]")?.addEventListener("click", () => { resetPurchaseOrderForm(); purchaseOrderDialog.showModal(); });
  document.querySelectorAll("[data-purchase-order-edit]").forEach((button) => button.addEventListener("click", () => { const order = state.purchaseOrders.find((item) => item.id === button.dataset.purchaseOrderEdit); if (order) { resetPurchaseOrderForm(order); purchaseOrderDialog.showModal(); } }));
  document.querySelectorAll("[data-purchase-order-delete]").forEach((button) => button.addEventListener("click", async () => { const order = state.purchaseOrders.find((item) => item.id === button.dataset.purchaseOrderDelete); if (!order || !confirm(`¿Eliminar la orden #${order.orderNumber}?`)) return; try { await apiJson(`/api/purchase-orders/${encodeURIComponent(order.id)}`, { method:"DELETE" }); state.purchaseOrders = state.purchaseOrders.filter((item) => item.id !== order.id); renderCommercialSubmenu(areas.financiera); } catch { alert("No se pudo eliminar la orden."); } }));
  document.querySelectorAll("[data-purchase-order-page]").forEach((button) => button.addEventListener("click", () => { state.purchaseOrderPage += button.dataset.purchaseOrderPage === "next" ? 1 : -1; renderCommercialSubmenu(areas.financiera); }));
  document.querySelectorAll("[data-purchase-order-month]").forEach((row) => {
    const openDetail = () => openPurchaseOrderMonthDetail(row.dataset.purchaseOrderMonth);
    row.addEventListener("click", openDetail);
    row.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openDetail();
    });
  });
}

function loadAccountsReceivable() {
  if (!apiEnabled) return;
  apiJson("/api/accounts-receivable")
    .then((records) => {
      state.accountsReceivable = Array.isArray(records) ? records : [];
      if (state.activeArea === "financiera" && state.activeSubmenu === "resultados-cuentas-por-cobrar") {
        renderDashboard();
      }
    })
    .catch(() => {
      state.accountsReceivable = [];
    });
}

function loadFinancialOrders() {
  try {
    const saved = JSON.parse(localStorage.getItem(financialOrdersStorageKey) || "[]");
    const localOrders = Array.isArray(saved) ? saved : [];
    const seedOrders = Array.isArray(window.financialOrdersSeed) ? window.financialOrdersSeed : [];
    if (seedOrders.length !== financialOrdersSeedExpectedCount) {
      state.financialOrders = localOrders;
      return;
    }
    const deletedSeedKeys = new Set(JSON.parse(localStorage.getItem(financialOrdersDeletedSeedKeysKey) || "[]"));
    const manifest = JSON.parse(localStorage.getItem(financialOrdersSeedManifestKey) || "null");
    const localSeedKeys = new Set(localOrders.filter((order) => order.sourceKey).map((order) => order.sourceKey));
    const completeLocalImport = localSeedKeys.size + deletedSeedKeys.size >= financialOrdersSeedExpectedCount;
    if (manifest?.version === financialOrdersSeedVersion && manifest?.count === financialOrdersSeedExpectedCount && completeLocalImport) {
      state.financialOrders = localOrders;
      return;
    }
    const merged = new Map();
    seedOrders.forEach((order) => {
      if (!deletedSeedKeys.has(order.sourceKey)) merged.set(`source:${order.sourceKey || order.id}`, { ...order });
    });
    localOrders.forEach((order) => {
      const key = order.sourceKey ? `source:${order.sourceKey}` : `local:${order.id}`;
      merged.set(key, order);
    });
    state.financialOrders = [...merged.values()];
    saveFinancialOrders();
    localStorage.setItem(financialOrdersSeedVersionKey, financialOrdersSeedVersion);
    localStorage.setItem(financialOrdersSeedManifestKey, JSON.stringify({ version: financialOrdersSeedVersion, count: financialOrdersSeedExpectedCount }));
  } catch {
    const seedOrders = Array.isArray(window.financialOrdersSeed) ? window.financialOrdersSeed : [];
    state.financialOrders = seedOrders.length === financialOrdersSeedExpectedCount ? seedOrders.map((order) => ({ ...order })) : [];
  }
}

function saveFinancialOrders() {
  localStorage.setItem(financialOrdersStorageKey, JSON.stringify(state.financialOrders));
}

function applyPersistedFinancialOrders(records) {
  const remoteRecords = Array.isArray(records) ? records : [];
  const deletedIds = new Set(remoteRecords.filter((order) => order.deleted).map((order) => order.id));
  const deletedSourceKeys = new Set(remoteRecords.filter((order) => order.deleted && order.sourceKey).map((order) => order.sourceKey));
  const activeRemote = remoteRecords.filter((order) => !order.deleted);
  const remoteById = new Map(activeRemote.map((order) => [order.id, order]));
  const remoteBySourceKey = new Map(activeRemote.filter((order) => order.sourceKey).map((order) => [order.sourceKey, order]));

  const seedRows = state.financialOrders
    .filter((order) => order.sourceKey && !deletedIds.has(order.id) && !deletedSourceKeys.has(order.sourceKey))
    .map((order) => remoteById.get(order.id) || remoteBySourceKey.get(order.sourceKey) || order);
  const seedIds = new Set(seedRows.map((order) => order.id));
  const seedSourceKeys = new Set(seedRows.map((order) => order.sourceKey));
  const manualRows = new Map();
  state.financialOrders.filter((order) => !order.sourceKey && !deletedIds.has(order.id)).forEach((order) => {
    manualRows.set(order.id, order);
  });
  activeRemote.forEach((order) => {
    if (!seedIds.has(order.id) && !seedSourceKeys.has(order.sourceKey)) manualRows.set(order.id, order);
  });
  const orderedManualRows = [...manualRows.values()].sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
  state.financialOrders = [...orderedManualRows, ...seedRows];
  saveFinancialOrders();
}

async function syncFinancialOrdersWithApi() {
  if (!apiEnabled) return;
  try {
    let remoteRecords = await apiJson("/api/financial-orders");
    const remoteIds = new Set(remoteRecords.map((order) => order.id));
    const remoteSourceKeys = new Set(remoteRecords.filter((order) => order.sourceKey).map((order) => order.sourceKey));
    const localManualRows = state.financialOrders.filter((order) => !order.sourceKey && !remoteIds.has(order.id));
    const deletedSeedKeys = new Set(JSON.parse(localStorage.getItem(financialOrdersDeletedSeedKeysKey) || "[]"));
    const seedRows = Array.isArray(window.financialOrdersSeed) ? window.financialOrdersSeed : [];
    const deletedSeedRows = seedRows.filter((order) => deletedSeedKeys.has(order.sourceKey) && !remoteSourceKeys.has(order.sourceKey));
    const migrationRequests = [
      ...localManualRows.map((order) => apiJson("/api/financial-orders", {
        method: "POST",
        body: JSON.stringify({ ...order, updatedBy: state.currentUser?.name || order.updatedBy || "Migración local" })
      })),
      ...deletedSeedRows.map((order) => apiJson(`/api/financial-orders/${encodeURIComponent(order.id)}`, {
        method: "DELETE",
        body: JSON.stringify({ ...order, updatedBy: state.currentUser?.name || "Migración local", deleted: true })
      }))
    ];
    if (migrationRequests.length) {
      await Promise.all(migrationRequests);
      remoteRecords = await apiJson("/api/financial-orders");
    }
    applyPersistedFinancialOrders(remoteRecords);
    if (state.activeArea === "comercializacion" && state.activeSubmenu === "resultados-pedidos") {
      renderDashboard();
    }
  } catch (error) {
    console.error("No se pudieron sincronizar los pedidos con el servidor.", error);
  }
}

function loadFinancialOrderFilters() {
  try {
    const saved = JSON.parse(localStorage.getItem(financialOrdersFiltersStorageKey) || "{}");
    state.financialOrderYearFilter = saved.year ? String(saved.year) : "all";
    state.financialOrderMonthFilter = saved.month ? String(saved.month) : "all";
    state.financialOrdersView = ["list", "notifications"].includes(saved.view) ? saved.view : "list";
  } catch {
    state.financialOrderYearFilter = "all";
    state.financialOrderMonthFilter = "all";
    state.financialOrdersView = "list";
  }
}

function saveFinancialOrderFilters() {
  localStorage.setItem(financialOrdersFiltersStorageKey, JSON.stringify({
    year: state.financialOrderYearFilter,
    month: state.financialOrderMonthFilter,
    view: state.financialOrdersView
  }));
}

function approvedControlSalesFinancialRows() {
  return state.controlSales
    .filter((order) => !order.archived && controlSalesOrderHasAuthorizedSignatures(order))
    .filter((order) => !linkedFinancialOrderForControlSale(order))
    .map((order) => {
      const date = String(controlSalesEffectiveDate(order) || order.financeApprovedAt || order.updatedAt || todayISO()).slice(0, 10);
      const [year, monthNumber] = date.split("-").map(Number);
      return {
        id: `approved-control:${order.id}`,
        controlSalesOrderId: order.id,
        approvedControlSales: true,
        number: formatOrderCorrelative(order.number),
        date,
        year: Number.isFinite(year) ? year : new Date().getFullYear(),
        month: monthLabel(monthNumber),
        seller: controlSalesResponsibleSeller(order),
        client: order.client || "Sin cliente",
        sale: Number(order.totalCents || 0) / 100,
        conditions: order.proformaData?.paymentCondition || "",
        createdAt: order.createdAt || date,
        updatedAt: order.financeApprovedAt || order.updatedAt || date
      };
    });
}

function financialOrderLedgerRows() {
  return [...approvedControlSalesFinancialRows(), ...state.financialOrders];
}

function financialOrdersForSelectedPeriod() {
  return financialOrderLedgerRows().filter((order) => {
    const date = String(order.date || "").slice(0, 10);
    const [dateYear, dateMonth] = date.split("-").map(Number);
    const effectiveYear = Number.isFinite(dateYear) ? String(dateYear) : String(order.year || "");
    const effectiveMonth = Number.isFinite(dateMonth) ? monthLabel(dateMonth) : String(order.month || "");
    if (state.financialOrderYearFilter !== "all" && effectiveYear !== state.financialOrderYearFilter) return false;
    if (state.financialOrderMonthFilter !== "all" && effectiveMonth !== state.financialOrderMonthFilter) return false;
    return true;
  });
}

function filteredFinancialOrders() {
  const query = state.financialOrderQuery;
  const rows = financialOrdersForSelectedPeriod();
  return query ? rows.filter((order) => Object.values(order).some((value) => searchTokenMatches(value, query))) : rows;
}

function escapeSpreadsheetXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");
}

function financialOrdersReportFilterSummary() {
  const filters = [];
  filters.push(state.financialOrderMonthFilter === "all" ? "Mes: todos" : `Mes: ${state.financialOrderMonthFilter}`);
  filters.push(state.financialOrderYearFilter === "all" ? "Año: todos" : `Año: ${state.financialOrderYearFilter}`);
  if (state.financialOrderQuery) filters.push(`Búsqueda: ${state.financialOrderQuery}`);
  return filters;
}

function downloadFinancialOrdersExcelReport() {
  const rows = filteredFinancialOrders()
    .slice()
    .sort((a, b) => String(a.date || "").localeCompare(String(b.date || "")) || Number(a.number || 0) - Number(b.number || 0));
  const totalNumber = rows.reduce((sum, order) => sum + (Number(order.number) || 0), 0);
  const totalSale = rows.reduce((sum, order) => sum + (Number(order.sale) || 0), 0);
  const rowXml = rows.map((order) => `
    <Row>
      <Cell ss:StyleID="Date"><Data ss:Type="DateTime">${escapeSpreadsheetXml(String(order.date || todayISO()).slice(0, 10))}T00:00:00.000</Data></Cell>
      <Cell ss:StyleID="Integer"><Data ss:Type="Number">${Number(order.number) || 0}</Data></Cell>
      <Cell ss:StyleID="Money"><Data ss:Type="Number">${Number(order.sale) || 0}</Data></Cell>
      <Cell><Data ss:Type="String">${escapeSpreadsheetXml(controlSalesResponsibleSeller(order).toLocaleUpperCase("es"))}</Data></Cell>
      <Cell><Data ss:Type="String">${escapeSpreadsheetXml(order.client || "Sin cliente")}</Data></Cell>
    </Row>`).join("");
  const filterXml = financialOrdersReportFilterSummary()
    .map((filter) => `<Row><Cell ss:MergeAcross="4"><Data ss:Type="String">${escapeSpreadsheetXml(filter)}</Data></Cell></Row>`)
    .join("");
  const workbook = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal"><Alignment ss:Vertical="Bottom"/><Font ss:FontName="Calibri" ss:Size="11"/></Style>
  <Style ss:ID="Header"><Font ss:Bold="1"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/></Borders></Style>
  <Style ss:ID="Date"><NumberFormat ss:Format="d/m/yyyy"/></Style>
  <Style ss:ID="Integer"><NumberFormat ss:Format="0"/></Style>
  <Style ss:ID="Money"><NumberFormat ss:Format="0.00"/></Style>
  <Style ss:ID="Total"><Font ss:Bold="1"/></Style>
 </Styles>
 <Worksheet ss:Name="Export"><Table>
  <Column ss:Width="82"/><Column ss:Width="58"/><Column ss:Width="82"/><Column ss:Width="125"/><Column ss:Width="330"/>
  <Row><Cell ss:StyleID="Header"><Data ss:Type="String">Fecha</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">#</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Venta</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Vendedor</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Clientes</Data></Cell></Row>
  ${rowXml}
  <Row><Cell ss:StyleID="Total"><Data ss:Type="String">Total</Data></Cell><Cell ss:StyleID="Total"><Data ss:Type="Number">${totalNumber}</Data></Cell><Cell ss:StyleID="Total"><Data ss:Type="Number">${totalSale}</Data></Cell><Cell/><Cell/></Row>
  <Row/><Row><Cell ss:MergeAcross="4"><Data ss:Type="String">Filtros aplicados:</Data></Cell></Row>${filterXml}
 </Table><WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"><FreezePanes/><FrozenNoSplit/><SplitHorizontal>1</SplitHorizontal><TopRowBottomPane>1</TopRowBottomPane></WorksheetOptions></Worksheet>
</Workbook>`;
  const blob = new Blob(["\ufeff", workbook], { type: "application/vnd.ms-excel;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const period = [state.financialOrderYearFilter, state.financialOrderMonthFilter].filter((value) => value && value !== "all").join("-") || "todos";
  link.href = url;
  link.download = `Reporte-pedidos-${period}.xls`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function renderFinancialOrderTopbarFilters(isVisible) {
  financialOrdersTopbarFilters?.classList.toggle("hidden", !isVisible);
  financialOrdersTopbarFilters?.closest(".topbar")?.classList.toggle("financial-orders-filter-mode", isVisible);
  if (!isVisible || !financialOrderYearFilter || !financialOrderMonthFilter) return;
  const years = [...new Set(financialOrderLedgerRows().map((order) => String(order.year)).filter(Boolean))].sort((a, b) => Number(b) - Number(a));
  financialOrderYearFilter.innerHTML = `<option value="all">Todos</option>${years.map((year) => `<option value="${escapeHtml(year)}">${escapeHtml(year)}</option>`).join("")}`;
  financialOrderMonthFilter.innerHTML = `<option value="all">Todos</option>${Array.from({ length: 12 }, (_, index) => monthLabel(index + 1)).map((month) => `<option value="${month}">${month}</option>`).join("")}`;
  if (!years.includes(state.financialOrderYearFilter)) state.financialOrderYearFilter = "all";
  financialOrderYearFilter.value = state.financialOrderYearFilter;
  financialOrderMonthFilter.value = state.financialOrderMonthFilter;
}

function nextFinancialOrderNumber() {
  const highestNumber = state.financialOrders.reduce((highest, order) => {
    const rawNumber = String(order.number ?? "").trim();
    if (!/^\d+$/.test(rawNumber)) return highest;
    return Math.max(highest, Number(rawNumber));
  }, 0);
  return String(highestNumber + 1);
}

function resetFinancialOrderForm(order = null, sourceOpportunity = null) {
  financialOrderForm.reset();
  state.financialOrderSourceOpportunityId = order?.sourceOpportunityId || sourceOpportunity?.id || "";
  financialOrderId.value = order?.id || "";
  financialOrderDialogTitle.textContent = order ? "Editar pedido" : "Nuevo pedido";
  financialOrderFields.forEach(([key, id]) => {
    const input = document.querySelector(`#${id}`);
    if (input) input.value = order?.[key] ?? "";
  });
  if (!order) {
    document.querySelector("#financialOrderNumber").value = nextFinancialOrderNumber();
    document.querySelector("#financialOrderDate").value = todayISO();
    document.querySelector("#financialOrderYear").value = new Date().getFullYear();
    document.querySelector("#financialOrderMonth").value = monthLabel(new Date().getMonth() + 1);
    if (sourceOpportunity) {
      document.querySelector("#financialOrderClient").value = sourceOpportunity.company || "";
      document.querySelector("#financialOrderSeller").value = sourceOpportunity.seller || "";
      document.querySelector("#financialOrderSale").value = Number(sourceOpportunity.amount || 0).toFixed(2);
    }
  }
}

function renderFinancialOrderList() {
  const rows = filteredFinancialOrders();
  const linkedControlSalesByFinancialOrderId = new Map(
    state.controlSales
      .filter((order) => order.financialOrderId)
      .map((order) => [String(order.financialOrderId), order])
  );
  const total = rows.reduce((sum, order) => sum + Number(order.sale || 0), 0);
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  state.financialOrderPage = Math.max(1, Math.min(state.financialOrderPage, pageCount));
  const pageStart = (state.financialOrderPage - 1) * pageSize;
  const pageEnd = pageStart + pageSize;
  const pagedRows = rows.slice(pageStart, pageEnd);
  return `
    <section class="financial-orders-shell">
      <div class="financial-orders-toolbar">
        <label><span>⌕</span><input data-financial-order-search type="search" value="${escapeHtml(state.financialOrderQuery)}" placeholder="Buscar pedido, cliente, vendedor..."></label>
        <strong>${formatMoney(total)}</strong>
        <button class="financial-orders-report-button" type="button" data-financial-order-report>⇩ Reporte Excel</button>
        <button type="button" data-financial-order-new>+ Nuevo pedido</button>
      </div>
      <div class="financial-orders-table-wrap">
      <div class="financial-orders-table">
        <div class="financial-order-row header"><span>Fecha</span><span>#</span><span>Venta</span><span>Vendedor</span><span>Clientes</span><span>Acciones</span></div>
        ${pagedRows.map((order) => {
          const approvedControlOrder = order.approvedControlSales
            ? state.controlSales.find((item) => item.id === order.controlSalesOrderId)
            : null;
          const linkedOrder = approvedControlOrder || linkedControlSalesByFinancialOrderId.get(String(order.id));
          const hasTwoSignatures = controlSalesOrderHasAuthorizedSignatures(linkedOrder);
          const variance = Number(linkedOrder?.varianceCents || 0);
          return `
          <article class="financial-order-row">
            <span>${formatDate(order.date)}</span>
            <strong>${escapeHtml(order.number)}</strong>
            <strong class="financial-order-sale">${formatMoney(order.sale)}</strong>
            <span>${escapeHtml(controlSalesResponsibleSeller(order))}</span>
            <span class="financial-order-client-cell">
              <span>${escapeHtml(order.client)}</span>
              ${hasTwoSignatures ? `<em class="financial-order-entered-badge">Aprobado · 2 firmas</em>` : linkedOrder ? `<em class="financial-order-entered-badge">Ingresado</em>` : ""}
              ${linkedOrder && variance !== 0 ? `<em class="financial-order-variance-badge" data-tone="${variance > 0 ? "over" : "under"}">Descuadre ${formatControlSalesMoney(variance)}</em>` : ""}
              ${linkedOrder && variance === 0 ? `<em class="financial-order-balanced-badge">Conciliado</em>` : ""}
            </span>
            <span class="financial-order-actions">${approvedControlOrder
              ? `<button class="financial-order-action-icon" type="button" data-finance-order-view="${escapeHtml(approvedControlOrder.id)}" title="Ver orden y firmas" aria-label="Ver orden y firmas">👁</button><button class="financial-order-action-icon" type="button" data-finance-order-edit="${escapeHtml(approvedControlOrder.id)}" title="Editar" aria-label="Editar pedido">✏️</button><button class="financial-order-action-icon danger" type="button" data-finance-order-archive="${escapeHtml(approvedControlOrder.id)}" title="Anular" aria-label="Anular pedido">⛔</button>`
              : `${linkedOrder ? `<button class="financial-order-action-icon" type="button" data-finance-order-view="${escapeHtml(linkedOrder.id)}" title="Ver orden y firmas" aria-label="Ver orden y firmas">👁</button>` : ""}<button class="financial-order-action-icon" type="button" data-financial-order-edit="${order.id}" title="Editar" aria-label="Editar pedido">✏️</button><button class="financial-order-action-icon danger" type="button" data-financial-order-delete="${order.id}" title="Eliminar" aria-label="Eliminar pedido">🗑️</button>`}
            </span>
          </article>
        `; }).join("") || `<div class="empty-state">No hay pedidos registrados.</div>`}
      </div>
      </div>
      <div class="opportunity-pagination financial-orders-pagination" aria-label="Paginacion de pedidos">
        <span>Mostrando ${rows.length ? pageStart + 1 : 0}-${Math.min(pageEnd, rows.length)} de ${rows.length}</span>
        <div>
          <button class="ghost-btn compact-btn" type="button" data-financial-order-page="prev" ${state.financialOrderPage <= 1 ? "disabled" : ""}>Anterior</button>
          <strong>Pagina ${state.financialOrderPage} de ${pageCount}</strong>
          <button class="ghost-btn compact-btn" type="button" data-financial-order-page="next" ${state.financialOrderPage >= pageCount ? "disabled" : ""}>Siguiente</button>
        </div>
      </div>
    </section>`;
}

function renderFinancialOrderNotifications() {
  const pendingHandoffs = financePendingApprovalOrders();
  const pendingTotalCents = pendingHandoffs.reduce((sum, order) => sum + Number(order.totalCents || 0), 0);
  const reconciliationAlerts = state.controlSales
    .filter((order) => order.financialOrderId && Number(order.varianceCents || 0) !== 0)
    .sort((a, b) => Math.abs(Number(b.varianceCents || 0)) - Math.abs(Number(a.varianceCents || 0)));
  const reconciliationDifference = reconciliationAlerts
    .reduce((sum, order) => sum + Math.abs(Number(order.varianceCents || 0)), 0);
  return `
    ${reconciliationAlerts.length ? `
      <section class="financial-order-reconciliation-alerts" aria-label="Alertas de conciliación">
        <header class="financial-order-reconciliation-alerts__summary">
          <div><span>Control de Ventas</span><h4>Pedidos con descuadre</h4><p>Estas órdenes fueron guardadas, pero el detalle CF/CCF no coincide con el monto del pedido.</p></div>
          <strong class="financial-order-reconciliation-alerts__amount">${formatControlSalesMoney(reconciliationDifference)}<small>${reconciliationAlerts.length === 1 ? "1 alerta" : `${reconciliationAlerts.length} alertas`}</small></strong>
        </header>
        <div class="financial-order-reconciliation-alerts__list">
          ${reconciliationAlerts.map((order) => `
            <article class="financial-order-reconciliation-alert">
              <i aria-hidden="true">!</i>
              <div class="financial-order-reconciliation-alert__head"><strong>Pedido #${escapeHtml(order.number)}</strong><span>${escapeHtml(order.documentType || "CF")} · ${formatDate(order.date)}</span></div>
              <p class="financial-order-reconciliation-alert__client">${escapeHtml(order.client)}</p>
              <dl class="financial-order-reconciliation-alert__amounts"><div><dt>Monto pedido</dt><dd>${formatControlSalesMoney(order.expectedTotalCents || 0)}</dd></div><div><dt>Detalle</dt><dd>${formatControlSalesMoney(order.totalCents || 0)}</dd></div><div><dt>Diferencia</dt><dd><strong>${formatControlSalesMoney(order.varianceCents || 0)}</strong></dd></div></dl>
            </article>`).join("")}
        </div>
      </section>` : ""}
    <section class="financial-order-notifications" aria-label="Notificaciones de pedidos pendientes">
      <header class="financial-order-notifications-head">
        <div>
          <span>Segundo visto bueno</span>
          <h4>Órdenes pendientes de autorización final</h4>
          <p>Incluye órdenes firmadas por Gerencia Comercial y pedidos directos que requieren únicamente el visto bueno final.</p>
        </div>
        <div class="financial-order-notifications-summary">
          <small>${pendingHandoffs.length === 1 ? "1 pendiente" : `${pendingHandoffs.length} pendientes`}</small>
          <strong>${formatControlSalesMoney(pendingTotalCents)}</strong>
        </div>
      </header>
      <div class="financial-order-notifications-list">
        ${pendingHandoffs.map((order) => {
          const missingFields = missingFinancialOrderFields(order);
          const financialComplete = missingFields.length === 0;
          return `
            <article class="financial-order-notification-card">
              <div class="financial-order-notification-icon" aria-hidden="true">✓</div>
              <div class="financial-order-notification-copy">
                <small>Orden ${escapeHtml(formatOrderCorrelative(order.number))} · Autorizada ${escapeHtml(formatCommercialApprovalDateTime(order.commercialApprovedAt || order.updatedAt))}</small>
                <strong>${escapeHtml(order.client || "Cliente sin nombre")}</strong>
                <span>${escapeHtml(controlSalesResponsibleSeller(order))}</span>
                <em class="financial-record-status ${financialComplete ? "complete" : "incomplete"}">${financialComplete ? "Registro financiero completo" : `Faltan ${missingFields.length} campos: ${escapeHtml(missingFields.join(", "))}`}</em>
                ${commercialApprovalSignatureMarkup(order, true)}
              </div>
              <div class="financial-order-notification-amount">
                <small>Total confirmado</small>
                <strong>${formatControlSalesMoney(order.totalCents || 0)}</strong>
              </div>
              <div class="financial-order-notification-actions">
                <button type="button" data-finance-order-view="${escapeHtml(order.id)}">Ver orden</button>
                <button type="button" class="secondary" data-finance-order-complete="${escapeHtml(order.id)}">${financialComplete ? "Revisar registro" : "Completar registro"}</button>
                <button type="button" class="secondary" data-finance-order-observe="${escapeHtml(order.id)}">Observar</button>
                <button type="button" class="primary" data-finance-order-approve="${escapeHtml(order.id)}" ${financialComplete ? "" : `disabled title="Completa primero: ${escapeHtml(missingFields.join(", "))}"`}>✓ Firmar y dar segundo visto bueno</button>
              </div>
            </article>`;
        }).join("") || `
          <div class="financial-order-notifications-empty">
            <span aria-hidden="true">✓</span>
            <strong>Todo está al día</strong>
            <p>No hay órdenes con autorización comercial pendientes de revisión financiera.</p>
          </div>`}
      </div>
    </section>`;
}

function financialOrdersBySeller() {
  const periodRows = financialOrdersForSelectedPeriod();
  const sellers = new Map();
  periodRows.forEach((order) => {
    const seller = String(controlSalesResponsibleSeller(order)).trim() || "Sin vendedor";
    const key = seller.toLocaleUpperCase("es");
    const current = sellers.get(key) || { seller, orders: 0, sales: 0 };
    current.orders += 1;
    current.sales += Number(order.sale || 0);
    sellers.set(key, current);
  });
  return [...sellers.values()].sort((a, b) => b.sales - a.sales || b.orders - a.orders || a.seller.localeCompare(b.seller, "es"));
}

function renderFinancialOrdersSellerKpi() {
  const periodRows = financialOrdersForSelectedPeriod();
  const sellerRows = financialOrdersBySeller();
  const totalOrders = periodRows.length;
  const totalSales = periodRows.reduce((sum, order) => sum + Number(order.sale || 0), 0);
  const averageSale = totalOrders ? totalSales / totalOrders : 0;
  const sellersWithSales = sellerRows.filter((row) => row.sales > 0).length;
  return `
    <section class="financial-seller-kpi" aria-label="Ventas por vendedor">
      <div class="financial-seller-kpi-summary">
        <article><span>Monto total filtrado</span><strong>${formatMoney(totalSales)}</strong></article>
        <article><span>Venta promedio por pedido</span><strong>${formatMoney(averageSale)}</strong></article>
        <article><span>Vendedores con ventas</span><strong>${sellersWithSales.toLocaleString("es-SV")}</strong></article>
      </div>
      <div class="financial-seller-chart-head">
        <div><span>KPI comercial</span><h4>Ventas por vendedor</h4></div>
        <small>Ordenado por monto vendido</small>
      </div>
      <div class="financial-seller-chart" role="list">
        ${sellerRows.map((row, index) => {
          const percentage = totalSales ? (row.sales / totalSales) * 100 : 0;
          const orderLabel = row.orders === 1 ? "pedido" : "pedidos";
          return `
            <article class="financial-seller-bar-row" role="listitem" style="--seller-bar-width:${percentage.toFixed(2)}%;--seller-accent-hue:${164 + (index % 6) * 18}" aria-label="${escapeHtml(row.seller)}: ${formatMoney(row.sales)}, ${percentage.toFixed(2)} por ciento de la venta total, ${row.orders} ${orderLabel}">
              <div class="financial-seller-bar-label"><strong>${escapeHtml(row.seller)}</strong><span>${row.orders.toLocaleString("es-SV")} ${orderLabel}</span></div>
              <div class="financial-seller-bar-track" aria-hidden="true"><i></i></div>
              <div class="financial-seller-bar-values"><strong>${percentage.toFixed(2)}%</strong><button class="financial-seller-total-button" type="button" data-financial-seller-detail="${escapeHtml(row.seller)}" aria-label="Ver cartera administrada por ${escapeHtml(row.seller)}">${formatMoney(row.sales)}</button></div>
            </article>`;
        }).join("") || `<div class="empty-state">No hay pedidos para el período seleccionado.</div>`}
      </div>
    </section>`;
}

function financialOrdersPeriodLabel() {
  const year = state.financialOrderYearFilter;
  const month = state.financialOrderMonthFilter;
  if (year === "all" && month === "all") return "Todos los periodos";
  if (year === "all") return `${month} / todos los años`;
  if (month === "all") return year;
  return `${month} ${year}`;
}

function renderFinancialSellerPortfolio(seller) {
  const sellerKey = normalizeKey(seller);
  const rows = financialOrdersForSelectedPeriod()
    .filter((order) => normalizeKey(controlSalesResponsibleSeller(order)) === sellerKey)
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")) || Number(b.number || 0) - Number(a.number || 0));
  const total = rows.reduce((sum, order) => sum + Number(order.sale || 0), 0);
  const period = financialOrdersPeriodLabel();

  kpiDetailDialog.classList.add("financial-seller-dialog");
  kpiDetailEyebrow.textContent = "Pedidos / Cartera por vendedor";
  kpiDetailTitle.textContent = seller;
  kpiDetailSummary.classList.remove("tabbed");
  kpiDetailSummary.innerHTML = `
    <article><span>Pedidos</span><strong>${rows.length.toLocaleString("es-SV")}</strong></article>
    <article><span>Venta total</span><strong>${formatMoney(total)}</strong></article>
    <article><span>Periodo</span><strong>${escapeHtml(period)}</strong></article>
  `;
  kpiDetailReport.innerHTML = `
    <section class="kpi-report-section kpi-clean-detail financial-seller-detail">
      <div class="kpi-report-section-head">
        <div><span>Cartera administrada</span><strong>Pedidos registrados a nombre de ${escapeHtml(seller)}</strong></div>
        <strong>${rows.length} registros / ${formatMoney(total)}</strong>
      </div>
      <div class="financial-seller-detail-table" role="table" aria-label="Pedidos administrados por ${escapeHtml(seller)}">
        ${rows.length ? `
          <div class="financial-seller-detail-row header" role="row">
            <span>Cliente / pedido</span><span>Fecha</span><span>Documento</span><span>Condición / ubicación</span><span>Monto</span>
          </div>
          ${rows.map((order) => `
            <article class="financial-seller-detail-row" role="row">
              <span class="seller-detail-client"><strong>${escapeHtml(order.client || "Cliente sin nombre")}</strong><small>Pedido #${escapeHtml(order.number || "—")} · ${escapeHtml(order.clientType || "Sin clasificación")}</small></span>
              <span class="seller-detail-date"><strong>${formatDate(order.date)}</strong><small>${escapeHtml(order.month || "")}${order.year ? ` ${escapeHtml(order.year)}` : ""}</small></span>
              <span class="seller-detail-document"><strong>${escapeHtml(order.orderNumber || "Sin orden")}</strong><small>Factura: ${escapeHtml(order.invoice || "—")}</small></span>
              <span class="seller-detail-conditions"><strong>${escapeHtml(order.conditions || "Sin condición")}</strong><small>${escapeHtml([order.country, order.department].filter(Boolean).join(", ") || "Sin ubicación")}</small></span>
              <strong class="financial-seller-order-amount">${formatMoney(order.sale)}</strong>
            </article>
          `).join("")}
        ` : `<div class="empty-state">No hay pedidos para este vendedor en el periodo seleccionado.</div>`}
      </div>
    </section>
  `;
  kpiDetailDialog.showModal();
}

const financialComparisonPalette = ["#72f5d1", "#67a9ff", "#ffbd66", "#ff7895", "#b899ff", "#63d7ed"];

function financialComparisonData() {
  const ledgerRows = financialOrderLedgerRows();
  const availableYears = [...new Set(ledgerRows.map((order) => String(order.year)).filter(Boolean))].sort((a, b) => Number(a) - Number(b));
  if (!Array.isArray(state.financialComparisonYears)) state.financialComparisonYears = availableYears.slice(-2);
  state.financialComparisonYears = state.financialComparisonYears.filter((year) => availableYears.includes(year));
  const months = Array.from({ length: 12 }, (_, index) => monthLabel(index + 1));
  state.financialComparisonMonths = state.financialComparisonMonths.filter((month) => months.includes(month));
  const selectedMonths = months.filter((month) => state.financialComparisonMonths.includes(month));
  const series = state.financialComparisonYears.map((year) => ({
    year,
    values: selectedMonths.map((month) => ledgerRows
      .filter((order) => String(order.year) === year && String(order.month) === month)
      .reduce((sum, order) => sum + Number(order.sale || 0), 0))
  }));
  return { availableYears, months, selectedMonths, series };
}

function renderFinancialOrdersComparisonKpi() {
  const { availableYears, months, selectedMonths, series } = financialComparisonData();
  const allValues = series.flatMap((item) => item.values);
  const maxValue = Math.max(1, ...allValues);
  const width = 960;
  const height = 390;
  const pad = { left: 82, right: 34, top: 35, bottom: 62 };
  const plotWidth = width - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;
  const xAt = (index) => pad.left + (selectedMonths.length <= 1 ? plotWidth / 2 : index * plotWidth / (selectedMonths.length - 1));
  const yAt = (value) => pad.top + plotHeight - (value / maxValue) * plotHeight;
  const ticks = Array.from({ length: 5 }, (_, index) => maxValue * index / 4).reverse();
  const formatAxis = (value) => value >= 1000000 ? `$${(value / 1000000).toFixed(1)}M` : value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value.toFixed(0)}`;
  const selectedYearTotals = series.map((item, index) => ({
    year: item.year,
    total: item.values.reduce((sum, value) => sum + value, 0),
    color: financialComparisonPalette[index % financialComparisonPalette.length]
  }));
  return `
    <section class="financial-comparison-kpi" aria-label="Comparativo de ventas por año y mes">
      <div class="financial-comparison-toolbar">
        <div><span>Análisis temporal</span><h4>Comparativo de ventas</h4><p>Selecciona varios años y meses para confrontar períodos.</p></div>
        <div class="financial-multifilters">
          <details class="financial-multiselect">
            <summary><small>Años</small><strong>${state.financialComparisonYears.length ? state.financialComparisonYears.join(" · ") : "Seleccionar"}</strong></summary>
            <div class="financial-slicer-panel"><header><span>Años</span><nav><button type="button" data-comparison-all="year">Todos</button><button type="button" data-comparison-clear="year">Limpiar</button></nav></header><section>${availableYears.map((year) => `<label><input type="checkbox" data-comparison-year value="${escapeHtml(year)}" ${state.financialComparisonYears.includes(year) ? "checked" : ""}><span>${escapeHtml(year)}</span></label>`).join("")}</section></div>
          </details>
          <details class="financial-multiselect">
            <summary><small>Meses</small><strong>${selectedMonths.length === 12 ? "Todos" : `${selectedMonths.length} seleccionados`}</strong></summary>
            <div class="financial-slicer-panel"><header><span>Meses</span><nav><button type="button" data-comparison-all="month">Todos</button><button type="button" data-comparison-clear="month">Limpiar</button></nav></header><section>${months.map((month) => `<label><input type="checkbox" data-comparison-month value="${month}" ${state.financialComparisonMonths.includes(month) ? "checked" : ""}><span>${month}</span></label>`).join("")}</section></div>
          </details>
        </div>
      </div>
      <div class="financial-comparison-summary">
        <article><span>Años comparados</span><strong>${series.length}</strong></article>
        <article class="financial-year-totals-card">
          <span>Totales por año seleccionado</span>
          <div class="financial-year-totals">
            ${selectedYearTotals.map((item) => `<div class="financial-year-total" style="--year-color:${item.color}"><small>${escapeHtml(item.year)}</small><strong>${formatMoney(item.total)}</strong></div>`).join("") || `<em>Selecciona al menos un año</em>`}
          </div>
        </article>
      </div>
      ${selectedMonths.length && series.length ? `<div class="financial-line-chart-wrap">
        <div class="financial-line-legend">${series.map((item, index) => `<span style="--line-color:${financialComparisonPalette[index % financialComparisonPalette.length]}"><i></i>${item.year}<strong>${formatMoney(item.values.reduce((sum, value) => sum + value, 0))}</strong></span>`).join("")}</div>
        <svg class="financial-line-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Gráfico lineal comparativo de ventas">
          ${ticks.map((tick) => `<g class="line-grid"><line x1="${pad.left}" y1="${yAt(tick)}" x2="${width - pad.right}" y2="${yAt(tick)}"></line><text x="${pad.left - 14}" y="${yAt(tick) + 4}">${formatAxis(tick)}</text></g>`).join("")}
          ${selectedMonths.map((month, index) => `<text class="line-month" x="${xAt(index)}" y="${height - 24}">${month.slice(0, 3)}</text>`).join("")}
          ${series.map((item, seriesIndex) => {
            const color = financialComparisonPalette[seriesIndex % financialComparisonPalette.length];
            const points = item.values.map((value, index) => `${xAt(index)},${yAt(value)}`).join(" ");
            return `<g class="line-series" style="--line-color:${color}"><polyline points="${points}"></polyline>${item.values.map((value, index) => `<g><circle cx="${xAt(index)}" cy="${yAt(value)}" r="6"></circle><title>${item.year} · ${selectedMonths[index]}: ${formatMoney(value)}</title></g>`).join("")}</g>`;
          }).join("")}
        </svg>
      </div>` : `<div class="empty-state">Selecciona al menos un año y un mes para crear la comparación.</div>`}
    </section>`;
}

function renderFinancialOrders() {
  if (state.financialOrdersView === "notifications") return renderFinancialOrderNotifications();
  return renderFinancialOrderList();
}

function refreshFinancialOrdersModule() {
  renderCommercialSubmenu(areas.comercializacion);
}

function wireFinancialOrders() {
  opportunityTable.querySelector("[data-financial-order-report]")?.addEventListener("click", downloadFinancialOrdersExcelReport);
  opportunityTable.querySelectorAll("[data-finance-order-view]").forEach((button) => button.addEventListener("click", () => {
    openControlSalesDetail(button.dataset.financeOrderView);
  }));
  opportunityTable.querySelectorAll("[data-finance-order-edit]").forEach((button) => button.addEventListener("click", () => {
    const order = state.controlSales.find((item) => item.id === button.dataset.financeOrderEdit);
    if (order) openControlSalesForm(order);
  }));
  opportunityTable.querySelectorAll("[data-finance-order-complete]").forEach((button) => button.addEventListener("click", () => {
    const order = state.controlSales.find((item) => item.id === button.dataset.financeOrderComplete);
    if (order) openControlSalesForm(order, null, null, false, null, true);
  }));
  opportunityTable.querySelectorAll("[data-finance-order-archive]").forEach((button) => button.addEventListener("click", async () => {
    const order = state.controlSales.find((item) => item.id === button.dataset.financeOrderArchive);
    if (!order || !confirm(`¿Anular el pedido #${order.number}? Las firmas y la auditoría se conservarán.`)) return;
    button.disabled = true;
    try {
      await apiJson(`/api/control-sales/${encodeURIComponent(order.id)}`, {
        method: "PATCH",
        body: JSON.stringify({
          archived: true,
          reason: "Anulado desde listado financiero",
          updatedBy: state.currentUser?.name
        })
      });
      await loadControlSales();
      refreshFinancialOrdersModule();
    } catch (error) {
      button.disabled = false;
      alert(error.message || "No se pudo anular el pedido.");
    }
  }));
  opportunityTable.querySelectorAll("[data-finance-order-approve]").forEach((button) => button.addEventListener("click", async () => {
    const order = state.controlSales.find((item) => item.id === button.dataset.financeOrderApprove);
    const missingFields = missingFinancialOrderFields(order);
    if (missingFields.length) {
      alert(`Completa el registro financiero antes de firmar. Faltan: ${missingFields.join(", ")}.`);
      if (order) openControlSalesForm(order);
      return;
    }
    if (!confirm("¿Confirmas la firma electrónica financiera y el segundo visto bueno de esta orden de pedido?")) return;
    try {
      const approvedOrder = await updateControlSalesApproval(button.dataset.financeOrderApprove, "finance", "Aprobada");
      const approvedDate = String(controlSalesEffectiveDate(approvedOrder) || approvedOrder.financeApprovedAt || todayISO()).slice(0, 10);
      const [approvedYear, approvedMonth] = approvedDate.split("-").map(Number);
      state.financialOrdersView = "list";
      state.financialOrderYearFilter = Number.isFinite(approvedYear) ? String(approvedYear) : "all";
      state.financialOrderMonthFilter = monthLabel(approvedMonth) || "all";
      state.financialOrderPage = 1;
      saveFinancialOrderFilters();
      refreshFinancialOrdersModule();
    } catch (error) {
      alert(error.message || "No se pudo aprobar la orden.");
    }
  }));
  opportunityTable.querySelectorAll("[data-finance-order-observe]").forEach((button) => button.addEventListener("click", async () => {
    const note = prompt("Indica la observación que debe atender Comercialización:");
    if (note === null || !note.trim()) return;
    try {
      await updateControlSalesApproval(button.dataset.financeOrderObserve, "finance", "Observada", note.trim());
      refreshFinancialOrdersModule();
    } catch (error) {
      alert(error.message || "No se pudo registrar la observación.");
    }
  }));
  opportunityTable.querySelector("[data-financial-order-new]")?.addEventListener("click", () => {
    openDirectOrderFlow();
  });
  opportunityTable.querySelectorAll("[data-won-order-handoff]").forEach((button) => button.addEventListener("click", () => {
    const opportunity = getOpportunitySubmenu().items.find((item) => item.id === button.dataset.wonOrderHandoff);
    if (!opportunity) return;
    resetFinancialOrderForm(null, opportunity);
    financialOrderDialog.showModal();
  }));
  opportunityTable.querySelector("[data-financial-order-search]")?.addEventListener("input", (event) => {
    state.financialOrderQuery = event.target.value;
    state.financialOrderPage = 1;
    refreshFinancialOrdersModule();
    const input = opportunityTable.querySelector("[data-financial-order-search]");
    input?.focus();
    input?.setSelectionRange(input.value.length, input.value.length);
  });
  opportunityTable.querySelectorAll("[data-financial-order-page]").forEach((button) => button.addEventListener("click", () => {
    state.financialOrderPage += button.dataset.financialOrderPage === "next" ? 1 : -1;
    refreshFinancialOrdersModule();
  }));
  opportunityTable.querySelectorAll("[data-financial-order-edit]").forEach((button) => button.addEventListener("click", () => {
    const order = state.financialOrders.find((item) => item.id === button.dataset.financialOrderEdit);
    resetFinancialOrderForm(order);
    financialOrderDialog.showModal();
  }));
  opportunityTable.querySelectorAll("[data-financial-order-delete]").forEach((button) => button.addEventListener("click", async () => {
    if (!confirm("Eliminar este pedido?")) return;
    const deletedOrder = state.financialOrders.find((item) => item.id === button.dataset.financialOrderDelete);
    if (!deletedOrder) return;
    if (apiEnabled) {
      try {
        await apiJson(`/api/financial-orders/${encodeURIComponent(deletedOrder.id)}`, {
          method: "DELETE",
          body: JSON.stringify({
            ...deletedOrder,
            deleted: true,
            updatedBy: state.currentUser?.name || "Sistema Gerencial"
          })
        });
      } catch {
        alert("No se pudo eliminar el pedido. Verifica la conexión e intenta nuevamente.");
        return;
      }
    }
    if (deletedOrder?.sourceKey) {
      const deletedSeedKeys = new Set(JSON.parse(localStorage.getItem(financialOrdersDeletedSeedKeysKey) || "[]"));
      deletedSeedKeys.add(deletedOrder.sourceKey);
      localStorage.setItem(financialOrdersDeletedSeedKeysKey, JSON.stringify([...deletedSeedKeys]));
    }
    state.financialOrders = state.financialOrders.filter((item) => item.id !== button.dataset.financialOrderDelete);
    saveFinancialOrders();
    refreshFinancialOrdersModule();
  }));
}

function receivableStatus(item) {
  const balance = Number(item.balance || 0);
  if (balance < -0.009) return { key: "credit", label: "Saldo a favor", className: "credit" };
  if (balance <= 0.009) return { key: "settled", label: "Saldada", className: "settled" };
  if (Number(item.daysOutstanding || 0) > 30) return { key: "overdue", label: "Vencida", className: "overdue" };
  return { key: "pending", label: "Pendiente", className: "pending" };
}

function filteredAccountsReceivable() {
  const query = state.accountsReceivableQuery.trim();
  return state.accountsReceivable.filter((item) => {
    const status = receivableStatus(item).key;
    const statusMatches = state.accountsReceivableStatus === "all"
      || (state.accountsReceivableStatus === "pending" && ["pending", "overdue"].includes(status))
      || state.accountsReceivableStatus === status;
    if (!statusMatches) return false;
    return !query || Object.values(item).some((value) => searchTokenMatches(value, query));
  });
}

function resetAccountsReceivableForm(item = null) {
  accountsReceivableForm.reset();
  accountsReceivableId.value = item?.id || "";
  accountsReceivableDialogTitle.textContent = item ? "Editar cuenta por cobrar" : "Nueva cuenta por cobrar";
  accountsReceivableFields.forEach(([key, id]) => {
    const input = document.querySelector(`#${id}`);
    if (input) input.value = item?.[key] ?? "";
  });
  if (!item) {
    document.querySelector("#accountsReceivableInvoiceDate").value = todayISO();
    document.querySelector("#accountsReceivableDaysOutstanding").value = "0";
    document.querySelector("#accountsReceivableInvoiceAmount").value = "0";
    document.querySelector("#accountsReceivablePayments").value = "0";
    document.querySelector("#accountsReceivableCreditNotes").value = "0";
    document.querySelector("#accountsReceivableBalance").value = "0";
  }
}

function calculateReceivableBalance() {
  const amount = Number(document.querySelector("#accountsReceivableInvoiceAmount")?.value || 0);
  const payments = Number(document.querySelector("#accountsReceivablePayments")?.value || 0);
  const creditNotes = Number(document.querySelector("#accountsReceivableCreditNotes")?.value || 0);
  const balanceInput = document.querySelector("#accountsReceivableBalance");
  if (balanceInput) balanceInput.value = (amount - payments - creditNotes).toFixed(2);
}

function renderAccountsReceivableList() {
  const rows = filteredAccountsReceivable();
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  state.accountsReceivablePage = Math.max(1, Math.min(state.accountsReceivablePage, pageCount));
  const pageStart = (state.accountsReceivablePage - 1) * pageSize;
  const pageEnd = pageStart + pageSize;
  const pagedRows = rows.slice(pageStart, pageEnd);
  const total = rows.reduce((sum, item) => sum + Number(item.balance || 0), 0);
  const statusTabs = [
    ["pending", "Pendientes"],
    ["overdue", "Vencidas"],
    ["settled", "Saldadas"],
    ["all", "Todas"]
  ];
  return `
    <section class="financial-orders-shell accounts-receivable-shell">
      <div class="financial-orders-toolbar accounts-receivable-toolbar">
        <label><span>⌕</span><input data-accounts-receivable-search type="search" value="${escapeHtml(state.accountsReceivableQuery)}" placeholder="Buscar factura, cliente, vendedor..."></label>
        <strong>${formatMoney(total)}</strong>
        <button type="button" data-accounts-receivable-new>+ Nueva cuenta</button>
      </div>
      <div class="accounts-receivable-status-tabs" role="tablist" aria-label="Estado de cartera">
        ${statusTabs.map(([key, label]) => `<button type="button" role="tab" data-accounts-receivable-status="${key}" class="${state.accountsReceivableStatus === key ? "active" : ""}" aria-selected="${state.accountsReceivableStatus === key}">${label}</button>`).join("")}
      </div>
      <div class="financial-orders-table-wrap">
        <div class="financial-orders-table accounts-receivable-table">
          <div class="accounts-receivable-row header"><span>Fecha</span><span>Factura</span><span>Cliente</span><span>Vendedor</span><span>Días</span><span>Saldo</span><span>Acciones</span></div>
          ${pagedRows.map((item) => {
            const status = receivableStatus(item);
            return `<article class="accounts-receivable-row">
              <span>${formatDate(item.invoiceDate)}</span>
              <span class="accounts-receivable-invoice"><strong>${escapeHtml(item.invoiceNumber)}</strong><small>${escapeHtml(item.referenceNumber || item.customerCode || "Sin referencia")}</small></span>
              <span class="accounts-receivable-customer"><strong>${escapeHtml(item.customerName)}</strong><small>${escapeHtml(item.description || "Sin descripción")}</small></span>
              <span>${escapeHtml(item.seller || "Sin asignar")}</span>
              <span class="accounts-receivable-days"><strong>${Number(item.daysOutstanding || 0)}</strong><small class="accounts-receivable-status ${status.className}">${status.label}</small></span>
              <strong class="financial-order-sale">${formatMoney(item.balance)}</strong>
              <span class="financial-order-actions"><button type="button" data-accounts-receivable-edit="${item.id}">Editar</button><button class="danger" type="button" data-accounts-receivable-delete="${item.id}">Eliminar</button></span>
            </article>`;
          }).join("") || `<div class="empty-state">No hay cuentas por cobrar para este filtro.</div>`}
        </div>
      </div>
      <div class="opportunity-pagination financial-orders-pagination" aria-label="Paginación de cuentas por cobrar">
        <span>Mostrando ${rows.length ? pageStart + 1 : 0}-${Math.min(pageEnd, rows.length)} de ${rows.length}</span>
        <div>
          <button class="ghost-btn compact-btn" type="button" data-accounts-receivable-page="prev" ${state.accountsReceivablePage <= 1 ? "disabled" : ""}>Anterior</button>
          <strong>Página ${state.accountsReceivablePage} de ${pageCount}</strong>
          <button class="ghost-btn compact-btn" type="button" data-accounts-receivable-page="next" ${state.accountsReceivablePage >= pageCount ? "disabled" : ""}>Siguiente</button>
        </div>
      </div>
    </section>`;
}

function renderAccountsReceivableAging() {
  const active = state.accountsReceivable.filter((item) => Number(item.balance || 0) > 0.009);
  const buckets = [
    { label: "Corriente", hint: "0 días", min: 0, max: 0, color: 164 },
    { label: "1 a 30 días", hint: "Seguimiento", min: 1, max: 30, color: 188 },
    { label: "31 a 60 días", hint: "Vencida", min: 31, max: 60, color: 36 },
    { label: "61 a 90 días", hint: "Prioritaria", min: 61, max: 90, color: 18 },
    { label: "Más de 90 días", hint: "Crítica", min: 91, max: Infinity, color: 350 }
  ].map((bucket) => {
    const items = active.filter((item) => Number(item.daysOutstanding || 0) >= bucket.min && Number(item.daysOutstanding || 0) <= bucket.max);
    return { ...bucket, count: items.length, amount: items.reduce((sum, item) => sum + Number(item.balance || 0), 0) };
  });
  const total = active.reduce((sum, item) => sum + Number(item.balance || 0), 0);
  const maxAmount = Math.max(...buckets.map((bucket) => bucket.amount), 1);
  return `<section class="accounts-receivable-kpi">
    <div class="accounts-receivable-kpi-summary">
      <article><span>Saldo pendiente</span><strong>${formatMoney(total)}</strong><small>${active.length} documentos</small></article>
      <article><span>Cartera vencida</span><strong>${formatMoney(buckets.slice(2).reduce((sum, bucket) => sum + bucket.amount, 0))}</strong><small>${buckets.slice(2).reduce((sum, bucket) => sum + bucket.count, 0)} documentos</small></article>
      <article><span>Recuperación registrada</span><strong>${formatMoney(state.accountsReceivable.reduce((sum, item) => sum + Number(item.payments || 0), 0))}</strong><small>Abonos de la matriz</small></article>
    </div>
    <div class="financial-seller-chart-head"><div><span>KPI financiero</span><h4>Antigüedad de saldos</h4></div><small>Distribución por días en cartera</small></div>
    <div class="accounts-receivable-aging-list">
      ${buckets.map((bucket) => `<article class="accounts-receivable-aging-row" style="--aging-width:${Math.max(2, (bucket.amount / maxAmount) * 100).toFixed(2)}%;--aging-hue:${bucket.color}">
        <div><strong>${bucket.label}</strong><span>${bucket.hint} · ${bucket.count} documentos</span></div>
        <i><b></b></i>
        <strong>${formatMoney(bucket.amount)}</strong>
      </article>`).join("")}
    </div>
  </section>`;
}

function renderAccountsReceivableCustomers() {
  const customers = new Map();
  state.accountsReceivable.filter((item) => Number(item.balance || 0) > 0.009).forEach((item) => {
    const key = normalizeKey(item.customerName || item.customerCode || "Sin cliente");
    const current = customers.get(key) || { name: item.customerName || "Sin cliente", documents: 0, amount: 0, seller: item.seller || "Sin asignar" };
    current.documents += 1;
    current.amount += Number(item.balance || 0);
    customers.set(key, current);
  });
  const rows = [...customers.values()].sort((a, b) => b.amount - a.amount);
  const total = rows.reduce((sum, item) => sum + item.amount, 0);
  return `<section class="accounts-receivable-kpi">
    <div class="accounts-receivable-kpi-summary">
      <article><span>Clientes con saldo</span><strong>${rows.length}</strong><small>Cartera activa</small></article>
      <article class="wide"><span>Saldo pendiente consolidado</span><strong>${formatMoney(total)}</strong><small>Ordenado por exposición</small></article>
    </div>
    <div class="financial-seller-chart-head"><div><span>Concentración de cartera</span><h4>Saldo por cliente</h4></div><small>Top de cuentas abiertas</small></div>
    <div class="accounts-receivable-customer-list">
      ${rows.slice(0, 30).map((item, index) => `<article>
        <span>${index + 1}</span><div><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.seller)} · ${item.documents} documentos</small></div><strong>${formatMoney(item.amount)}</strong>
      </article>`).join("") || `<div class="empty-state">No hay clientes con saldo pendiente.</div>`}
    </div>
  </section>`;
}

function renderAccountsReceivable() {
  if (state.accountsReceivableView === "aging") return renderAccountsReceivableAging();
  if (state.accountsReceivableView === "customers") return renderAccountsReceivableCustomers();
  return renderAccountsReceivableList();
}

function wireAccountsReceivable() {
  opportunityTable.querySelector("[data-accounts-receivable-new]")?.addEventListener("click", () => {
    resetAccountsReceivableForm();
    accountsReceivableDialog.showModal();
  });
  opportunityTable.querySelector("[data-accounts-receivable-search]")?.addEventListener("input", (event) => {
    state.accountsReceivableQuery = event.target.value;
    state.accountsReceivablePage = 1;
    renderCommercialSubmenu(areas.financiera);
    const input = opportunityTable.querySelector("[data-accounts-receivable-search]");
    input?.focus();
    input?.setSelectionRange(input.value.length, input.value.length);
  });
  opportunityTable.querySelectorAll("[data-accounts-receivable-status]").forEach((button) => button.addEventListener("click", () => {
    state.accountsReceivableStatus = button.dataset.accountsReceivableStatus;
    state.accountsReceivablePage = 1;
    renderCommercialSubmenu(areas.financiera);
  }));
  opportunityTable.querySelectorAll("[data-accounts-receivable-page]").forEach((button) => button.addEventListener("click", () => {
    state.accountsReceivablePage += button.dataset.accountsReceivablePage === "next" ? 1 : -1;
    renderCommercialSubmenu(areas.financiera);
  }));
  opportunityTable.querySelectorAll("[data-accounts-receivable-edit]").forEach((button) => button.addEventListener("click", () => {
    const item = state.accountsReceivable.find((record) => record.id === button.dataset.accountsReceivableEdit);
    resetAccountsReceivableForm(item);
    accountsReceivableDialog.showModal();
  }));
  opportunityTable.querySelectorAll("[data-accounts-receivable-delete]").forEach((button) => button.addEventListener("click", async () => {
    if (!confirm("¿Eliminar esta cuenta por cobrar?")) return;
    try {
      await apiJson(`/api/accounts-receivable/${encodeURIComponent(button.dataset.accountsReceivableDelete)}`, { method: "DELETE" });
      state.accountsReceivable = state.accountsReceivable.filter((item) => item.id !== button.dataset.accountsReceivableDelete);
      renderCommercialSubmenu(areas.financiera);
    } catch {
      alert("No se pudo eliminar la cuenta por cobrar.");
    }
  }));
}

function renderCycleDashboard(items) {
  const monthNumber = activeMonthNumber();
  const annualGoal = cumulativeGlobalGoal(12);
  const formatDifference = (value) => {
    if (value > 0) return `+${formatMoney(value)}`;
    if (value < 0) return `(${formatMoney(Math.abs(value))})`;
    return formatMoney(0);
  };
  const monthRows = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const plan = cumulativeGlobalGoal(month);
    const hasActual = month <= monthNumber;
    const actual = hasActual ? cumulativeGlobalActual(items, month).amount : null;
    const difference = hasActual ? actual - plan : null;
    return {
      month,
      label: monthLabel(month),
      plan,
      actual,
      difference,
      hasActual,
      percent: hasActual && plan ? Math.round((actual / plan) * 100) : null,
      annualPercent: hasActual && annualGoal ? Math.round((actual / annualGoal) * 100) : null
    };
  });
  const maxValue = Math.max(...monthRows.flatMap((row) => [row.plan, row.actual || 0]), 1);
  return `
    <section class="results-dashboard accumulated-month-dashboard" aria-label="Acumulado global por mes">
      <article class="accumulated-month-card">
        <div class="accumulated-chart-top">
          <h3>Acumulado global</h3>
        </div>
        <div class="accumulated-column-head" aria-label="Encabezados del dashboard acumulado">
          <span>Periodo</span>
          <div class="chart-legend">
            <span><i class="plan"></i>Meta</span>
            <span><i class="actual"></i>Alcanzado</span>
          </div>
          <span class="accumulated-values-title">Valores acumulados</span>
          <div class="accumulated-kpi-titles">
            <span>KPI mensual</span>
            <span>KPI anual</span>
          </div>
        </div>
        <div class="accumulated-month-rows">
          ${monthRows.map((row) => `
            <div class="accumulated-month-row ${row.hasActual ? "" : "future"}">
              <strong>${row.label}</strong>
              <div class="accumulated-bars">
                <span class="accumulated-track"><i class="plan" style="width:${(row.plan / maxValue) * 100}%"></i></span>
                <span class="accumulated-track"><i class="actual" style="width:${row.hasActual ? (row.actual / maxValue) * 100 : 0}%"></i></span>
              </div>
              <div class="accumulated-values">
                <span><em>Meta</em>${formatMoney(row.plan)}</span>
                <strong><em>Alcanzado</em>${row.hasActual ? formatMoney(row.actual) : "—"}</strong>
                <small class="accumulated-difference ${row.difference >= 0 ? "positive" : "negative"}">
                  <em>Diferencia</em>${row.hasActual ? formatDifference(row.difference) : "—"}
                </small>
              </div>
              <div class="accumulated-percent-group">
                <span class="accumulated-percent">${row.hasActual ? `${row.percent}%` : "—"}</span>
                <span class="accumulated-percent annual">${row.hasActual ? `${row.annualPercent}%` : "—"}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </article>
    </section>
  `;
}

function renderHistoryList(rows) {
  const totalAmount = sumAmounts(rows.filter(({ result }) => result?.result !== "anulada").map(({ item }) => item));
  return `
    <section class="history-inbox" aria-label="Historial de cierres reales">
      <div class="history-summary">
        <div>
          <span>Historial de cierres</span>
          <strong>${rows.length} registros</strong>
        </div>
        <div>
          <span>Monto cerrado</span>
          <strong>${formatMoney(totalAmount)}</strong>
        </div>
      </div>
      <div class="history-list">
        ${rows.length ? rows.map(({ item, result }) => {
          const resultLabel = result?.result === "perdida" ? "Perdida" : result?.result === "anulada" ? "Anulada" : "Ganado";
          const resultClass = result?.result === "ganado" ? "won" : "lost";
          return `
          <article class="history-mail-row">
            <time datetime="${item.date}">
              <strong>${formatDate(item.date)}</strong>
              <span>${item.invoice ? `Doc. ${item.invoice}` : "Cierre"}</span>
            </time>
            <div class="history-mail-main">
              <strong>${item.company}</strong>
              <span>${item.seller}</span>
            </div>
            <div class="history-mail-meta">
              <strong>${formatMoney(item.amount)}</strong>
              <span class="closure-badge ${resultClass}">${resultLabel}</span>
            </div>
          </article>
        `}).join("") : `
          <div class="empty-state">
            No hay oportunidades cerradas en historial para este corte.
          </div>
        `}
      </div>
    </section>
  `;
}

function renderStrategicRisks(items) {
  return `
    <section class="strategic-risks" aria-label="Listado de riesgos futuros">
      <div class="strategic-risk-body">
        ${items.length ? items.map((item) => `
          <article class="strategic-risk-row">
            <div class="risk-date-block">
              <span>Fecha</span>
              <strong>${formatDate(item.date)}</strong>
            </div>
            <div class="risk-main-block">
              <span>Riesgo</span>
              <strong>${item.risk}</strong>
              <small>Gestiona: ${item.owner}</small>
            </div>
            <div class="risk-impact-block">
              <span>Gerencias involucradas</span>
              <div class="risk-impact-tags">
                ${item.affectsOthers && item.involved.length
                  ? item.involved.map((name) => `<em>${name}</em>`).join("")
                  : "<em>Sin repercusion</em>"}
              </div>
            </div>
            <div class="risk-status-block">
              <span>Estado</span>
              <strong class="tag notice">${item.status}</strong>
              ${item.responses?.length ? `<small>${item.responses.length} respuesta${item.responses.length === 1 ? "" : "s"}</small>` : ""}
            </div>
            <div class="risk-actions">
              <button class="ghost-btn compact-btn" type="button" data-risk-action="open" data-area="${item.areaKey || state.activeArea}" data-id="${item.id}">Abrir</button>
            </div>
          </article>
        `).join("") : `
          <div class="empty-state">
            No hay riesgos futuros registrados. Usa Nuevo riesgo para notificar una gestion gerencial.
          </div>
        `}
      </div>
    </section>
  `;
}


function findStrategicRiskSubmenu(areaKey = state.activeArea) {
  return getStrategicRiskSubmenu(areaKey);
}

function openRiskDetailDialog(item, submenu) {
  const ownerLabel = areas[state.activeArea]?.nav || roleDisplayName();
  const responses = Array.isArray(item.responses) ? item.responses : [];
  document.querySelector(".risk-detail-overlay")?.remove();

  const overlay = document.createElement("div");
  overlay.className = "risk-detail-overlay";
  overlay.innerHTML = `
    <div class="risk-detail-panel" role="dialog" aria-modal="true" aria-label="Detalle del riesgo">
      <button class="risk-detail-close" type="button" data-risk-close aria-label="Cerrar">×</button>
      <div class="risk-detail-head">
        <div>
          <p class="eyebrow">Riesgo notificado</p>
          <h3>${escapeHtml(item.risk)}</h3>
        </div>
        <span class="tag notice">${escapeHtml(item.status || "Notificado")}</span>
      </div>

      <div class="risk-detail-grid">
        <section>
          <span>Fecha</span>
          <strong>${formatDate(item.date)}</strong>
        </section>
        <section>
          <span>Gestiona</span>
          <strong>${escapeHtml(item.owner || "Sin origen")}</strong>
        </section>
        <section>
          <span>Gerencias involucradas</span>
          <strong>${item.involved?.length ? item.involved.map(escapeHtml).join(", ") : "Sin repercusion"}</strong>
        </section>
      </div>

      <section class="risk-detail-section">
        <span>Comentarios registrados</span>
        <div class="risk-response-list">
          ${responses.length ? responses.map((response) => `
            <article>
              <strong>${escapeHtml(response.owner || "Gerencia")}</strong>
              <small>${formatDate(response.date || todayISO())} ${escapeHtml(response.time || "")}</small>
              <p>${escapeHtml(response.comment || "")}</p>
            </article>
          `).join("") : `<p class="risk-empty-note">Sin comentarios registrados.</p>`}
        </div>
      </section>

      <form class="risk-response-form" data-risk-response-form>
        <label>
          <span>Comentario de ${escapeHtml(ownerLabel)}</span>
          <textarea required placeholder="Escribe tu respuesta, acuerdo o seguimiento..."></textarea>
        </label>
        <div class="risk-detail-actions">
          <button class="ghost-btn" type="button" data-risk-close>Cancelar</button>
          <button class="primary-btn" type="submit">Guardar comentario</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(overlay);
  overlay.querySelectorAll("[data-risk-close]").forEach((button) => {
    button.addEventListener("click", () => overlay.remove());
  });
  overlay.querySelector("[data-risk-response-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    const textarea = overlay.querySelector("textarea");
    const comment = textarea.value.trim();
    if (!comment) return;
    item.responses = Array.isArray(item.responses) ? item.responses : [];
    item.responses.push({
      id: crypto.randomUUID(),
      owner: ownerLabel,
      date: todayISO(),
      time: currentTimeValue(),
      comment
    });
    item.status = "Respondido";
    saveStrategicRisks();
    overlay.remove();
    renderCommercialSubmenu(areas[state.activeArea]);
  });
}

function renderManagementRequests(items) {
  const attendedCount = items.filter((item) => normalizeKey(item.status) === "atendida").length;
  const reviewCount = items.filter((item) => normalizeKey(item.status).includes("revision")).length;
  const pendingCount = Math.max(0, items.length - attendedCount - reviewCount);
  return `
    <section class="management-requests" aria-label="Solicitudes a Gerencia General">
      <header class="management-requests-summary">
        <div><span>Correspondencia gerencial</span><strong>Bandeja de solicitudes</strong><p>Lee, responde y da seguimiento a cada solicitud desde una sola bandeja.</p></div>
        <section><article><small>Pendientes</small><strong>${pendingCount}</strong></article><article><small>En revisión</small><strong>${reviewCount}</strong></article><article><small>Atendidas</small><strong>${attendedCount}</strong></article></section>
      </header>
      <div class="management-request-inbox-head" aria-hidden="true"><span>Remitente</span><span>Asunto</span><span>Estado</span><span>Fecha</span><span></span></div>
      <div class="management-request-body management-request-inbox">
        ${items.length ? items.map((item) => {
          const statusKey = normalizeKey(item.status);
          const statusTone = statusKey === "atendida" ? "resolved" : statusKey.includes("revision") ? "review" : "pending";
          const initials = String(item.owner || "GG").split(/\s+/).slice(0, 2).map((part) => part.charAt(0)).join("").toUpperCase();
          return `<article class="management-request-mail request-${statusTone}">
            <button class="request-mail-open" type="button" data-request-action="read" data-area="${item.areaKey || state.activeArea}" data-id="${item.id}" aria-label="Leer solicitud: ${escapeHtml(item.subject)}">
              <span class="request-mail-avatar">${escapeHtml(initials)}</span>
              <span class="request-mail-sender"><strong>${escapeHtml(item.owner)}</strong><small>Para ${escapeHtml(item.target)}</small></span>
              <span class="request-mail-copy"><strong>${escapeHtml(item.subject)}</strong><small>${escapeHtml(item.message)}</small>${item.response ? `<em>Respondida</em>` : ""}</span>
              <strong class="request-status-pill">${escapeHtml(item.status)}</strong>
              <time datetime="${escapeHtml(item.date)}">${formatDate(item.date)}</time>
              <span class="request-mail-read">Leer <b aria-hidden="true">›</b></span>
            </button>
          </article>`;
        }).join("") : `
          <div class="empty-state">
            No hay solicitudes enviadas. Usa Nueva solicitud para enviar un requerimiento a Gerencia General.
          </div>
        `}
      </div>
    </section>
  `;
}

function closeManagementRequestReader() {
  const dialog = document.querySelector("#managementRequestReaderDialog");
  if (!dialog) return;
  if (dialog.open) dialog.close();
  dialog.remove();
}

function handleManagementRequestAction(actionButton) {
  const submenu = findManagementRequestSubmenu(actionButton.dataset.area || state.activeArea);
  const item = submenu?.items.find((record) => record.id === actionButton.dataset.id);
  if (!item) return false;
  const action = actionButton.dataset.requestAction;

  if (action === "delete") {
    submenu.items = submenu.items.filter((record) => record.id !== item.id);
    saveManagementRequests();
    renderCommercialSubmenu(areas[state.activeArea]);
    return true;
  }

  if (action === "response") {
    const response = prompt("Respuesta de la gerencia:", item.response || "");
    if (response === null) return false;
    item.response = response.trim();
    item.status = item.response ? "Respondida" : item.status;
    saveManagementRequests();
    renderCommercialSubmenu(areas[state.activeArea]);
    return true;
  }

  if (action === "status") {
    item.status = actionButton.dataset.status || item.status;
    saveManagementRequests();
    renderCommercialSubmenu(areas[state.activeArea]);
    return true;
  }

  if (action === "edit") {
    managementRequestId.value = item.id;
    state.managementRequestAreaKey = actionButton.dataset.area || state.activeArea;
    managementRequestDate.value = item.date;
    managementRequestSubject.value = item.subject;
    managementRequestMessage.value = item.message;
    managementRequestTitle.textContent = "Editar solicitud";
    saveManagementRequestBtn.textContent = "Actualizar solicitud";
    managementRequestDialog.showModal();
    return true;
  }

  return false;
}

function openManagementRequestReader(item) {
  closeManagementRequestReader();
  const areaKey = item.areaKey || state.activeArea;
  const initials = String(item.owner || "GG").split(/\s+/).slice(0, 2).map((part) => part.charAt(0)).join("").toUpperCase();
  const dialog = document.createElement("dialog");
  dialog.id = "managementRequestReaderDialog";
  dialog.className = "management-request-reader";
  dialog.innerHTML = `
    <article class="management-request-reader-card">
      <header>
        <span class="request-mail-avatar">${escapeHtml(initials)}</span>
        <div><small>De ${escapeHtml(item.owner)} · Para ${escapeHtml(item.target)}</small><h3>${escapeHtml(item.subject)}</h3><p>${formatDate(item.date)}</p></div>
        <strong class="request-status-pill">${escapeHtml(item.status)}</strong>
        <button type="button" data-request-reader-close aria-label="Cerrar lectura">×</button>
      </header>
      <section class="management-request-letter">
        <span>Solicitud</span>
        <p>${escapeHtml(item.message)}</p>
      </section>
      ${item.response ? `<section class="management-request-reply"><span>Respuesta de Gerencia</span><p>${escapeHtml(item.response)}</p></section>` : ""}
      <footer>
        <button type="button" data-request-reader-close>Cerrar</button>
        <button type="button" data-request-action="status" data-status="En revision" data-area="${areaKey}" data-id="${item.id}">En revisión</button>
        <button type="button" data-request-action="status" data-status="Atendida" data-area="${areaKey}" data-id="${item.id}">Marcar atendida</button>
        <button type="button" data-request-action="edit" data-area="${areaKey}" data-id="${item.id}">Editar</button>
        <button class="request-action-primary" type="button" data-request-action="response" data-area="${areaKey}" data-id="${item.id}">Responder</button>
        <button class="danger" type="button" data-request-action="delete" data-area="${areaKey}" data-id="${item.id}">Eliminar</button>
      </footer>
    </article>`;
  document.body.appendChild(dialog);
  dialog.querySelectorAll("[data-request-reader-close]").forEach((button) => button.addEventListener("click", closeManagementRequestReader));
  dialog.querySelectorAll("button[data-request-action]").forEach((button) => {
    button.addEventListener("click", () => {
      closeManagementRequestReader();
      handleManagementRequestAction(button);
    });
  });
  dialog.addEventListener("click", (event) => { if (event.target === dialog) closeManagementRequestReader(); });
  dialog.addEventListener("cancel", (event) => { event.preventDefault(); closeManagementRequestReader(); });
  dialog.showModal();
}

function renderCleanManagementSection(area, submenu) {
  const labels = {
    resultados: "Resultados",
    kpi: "KPI",
    crm: "CRM",
    "crm-seguimiento": "Seguimiento",
    "crm-agenda": "Agenda",
    "crm-respuestas": "Respuestas",
    "crm-clientes": "Clientes",
    riesgos: "Riesgos",
    solicitudes: "Solicitudes"
  };
  return `
    <section class="clean-section" aria-label="${area.nav} ${submenu.label}">
      <div>
        <p class="eyebrow">${area.nav}</p>
        <h3>${labels[submenu.key] || submenu.label}</h3>
      </div>
      <div class="clean-section-state">
        <strong>Sin datos registrados</strong>
        <span>Vista lista para configuracion.</span>
      </div>
    </section>
  `;
}

function operationsPeriodLabel() {
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const monthIndex = Math.max(0, Math.min(11, Number(state.operationsPresentationMonth || 1) - 1));
  return `${monthNames[monthIndex]} ${state.operationsPresentationYear || new Date().getFullYear()}`;
}

function renderOperationsBlock(block) {
  if (block.type === "paragraph") return `<p>${escapeHtml(block.text)}</p>`;
  if (block.type === "list") {
    return `<ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }
  if (block.type === "cards") {
    return `
      <div class="operations-kpi-grid">
        ${block.items.map(([title, objective, formula, unit, frequency]) => `
          <article class="operations-kpi-card">
            <span>${escapeHtml(frequency)}</span>
            <strong>${escapeHtml(title)}</strong>
            <p>${escapeHtml(objective)}</p>
            <small>${escapeHtml(formula)}</small>
            <em>${escapeHtml(unit)}</em>
          </article>
        `).join("")}
      </div>
    `;
  }
  if (block.type === "table") {
    return `
      <div class="operations-table">
        <div class="operations-table-head" style="--cols:${block.columns.length}">
          ${block.columns.map((column) => `<strong>${escapeHtml(column)}</strong>`).join("")}
        </div>
        ${block.rows.map((row) => `
          <div class="operations-table-row" style="--cols:${block.columns.length}">
            ${row.map((cell) => `<span>${escapeHtml(cell)}</span>`).join("")}
          </div>
        `).join("")}
      </div>
    `;
  }
  return "";
}

function renderOperationsSlide(section, { fullscreen = false } = {}) {
  return `
    <article class="operations-slide">
      ${fullscreen ? "" : `
        <button class="operations-slide-expand" type="button" data-operations-fullscreen title="Vista panoramica" aria-label="Ampliar esta presentacion a pantalla completa">
          <span aria-hidden="true">⛶</span>
        </button>
      `}
      <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
      <h3>${escapeHtml(section.title)}</h3>
      <div class="operations-slide-body">
        ${section.body.map(renderOperationsBlock).join("")}
      </div>
    </article>
  `;
}

function operationsPresentationMarkup({ fullscreen = false } = {}) {
  const activeIndex = Math.max(0, Math.min(operationsPresentationSections.length - 1, Number(state.operationsPresentationSection) || 0));
  const section = operationsPresentationSections[activeIndex];
  return `
    <section class="operations-presentation ${fullscreen ? "fullscreen" : ""}" aria-label="Presentaciones de Operaciones">
      <div class="operations-presentation-head">
        <div>
          <p class="eyebrow">Operaciones</p>
          <h3>Presentaciones</h3>
          <span>Informe Gerencial Mensual de Operaciones</span>
        </div>
        <div class="operations-period-controls">
          <label>
            <span>Mes</span>
            <select data-operations-period="month">
              ${Array.from({ length: 12 }, (_, index) => {
                const value = String(index + 1).padStart(2, "0");
                return `<option value="${value}" ${value === state.operationsPresentationMonth ? "selected" : ""}>${value}</option>`;
              }).join("")}
            </select>
          </label>
          <label>
            <span>Año</span>
            <input type="number" min="2020" max="2035" value="${escapeHtml(state.operationsPresentationYear)}" data-operations-period="year">
          </label>
          ${fullscreen ? "" : `<button class="action-icon-btn operations-fullscreen-btn" type="button" data-operations-fullscreen title="Vista panoramica" aria-label="Abrir presentacion en vista panoramica">⛶</button>`}
        </div>
      </div>
      <div class="operations-presentation-meta">
        <strong>${operationsPeriodLabel()}</strong>
        <span>${operationsPresentationSections.length} secciones</span>
        <span>Contenido base del informe operativo mensual</span>
      </div>
      <div class="operations-presentation-layout">
        <nav class="operations-presentation-index" aria-label="Indice de presentacion">
          ${operationsPresentationSections.map((item, index) => `
            <button class="${index === activeIndex ? "active" : ""}" type="button" data-operations-section="${index}">
              <span>${index + 1}</span>
              <strong>${escapeHtml(item.title)}</strong>
            </button>
          `).join("")}
        </nav>
        ${renderOperationsSlide(section, { fullscreen })}
      </div>
    </section>
  `;
}

function operationsPresentationFullscreenMarkup() {
  const activeIndex = Math.max(0, Math.min(operationsPresentationSections.length - 1, Number(state.operationsPresentationSection) || 0));
  const section = operationsPresentationSections[activeIndex];
  return `
    <section class="operations-fullscreen-stage" aria-label="Lamina de presentacion en pantalla completa">
      ${renderOperationsSlide(section, { fullscreen: true })}
    </section>
  `;
}

function renderOperationsPresentations() {
  return operationsPresentationMarkup();
}


function financialPresentationMarkup({ fullscreen = false } = {}) {
  return `
    <section class="operations-presentation financial-presentation ${fullscreen ? "fullscreen" : ""}" aria-label="Presentaciones Financieras">
      <div class="operations-presentation-head">
        <div>
          <p class="eyebrow">Financiera</p>
          <h3>Presentaciones</h3>
          <span>Informe Gerencial Mensual Financiero</span>
        </div>
        <div class="operations-period-controls">
          ${fullscreen ? "" : `<button class="action-icon-btn operations-fullscreen-btn" type="button" data-financial-fullscreen title="Vista panoramica" aria-label="Abrir presentacion financiera en vista panoramica">⛶</button>`}
        </div>
      </div>
      <div class="financial-unified-stage">
        ${renderFinancialUnifiedSlide({ fullscreen })}
      </div>
    </section>
  `;
}

function renderFinancialUnifiedSlide({ fullscreen = false } = {}) {
  return `
    <article class="operations-slide financial-unified-slide">
      ${fullscreen ? "" : `
        <button class="operations-slide-expand" type="button" data-financial-fullscreen title="Vista panoramica" aria-label="Ampliar esta presentacion a pantalla completa">
          <span aria-hidden="true">⛶</span>
        </button>
      `}
      <p class="eyebrow">Informe Gerencial Mensual Financiero</p>
      <h3>Analisis financiero Junio 2026</h3>
      <div class="financial-unified-content">
        ${financialPresentationSections.map((section, index) => `
          <section class="financial-unified-section">
            <span>${index + 1}</span>
            <div>
              <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
              <h4>${escapeHtml(section.title)}</h4>
              <div class="operations-slide-body">
                ${section.body.map(renderOperationsBlock).join("")}
              </div>
            </div>
          </section>
        `).join("")}
      </div>
    </article>
  `;
}

function renderFinancialPresentations() {
  return financialPresentationMarkup();
}

function financialPresentationFullscreenMarkup() {
  return `
    <section class="operations-fullscreen-stage" aria-label="Presentacion financiera en pantalla completa">
      ${renderFinancialUnifiedSlide({ fullscreen: true })}
    </section>
  `;
}

function openOperationsPresentationFullscreen() {
  document.querySelector(".operations-fullscreen-overlay")?.remove();
  const overlay = document.createElement("div");
  overlay.className = "operations-fullscreen-overlay";
  overlay.innerHTML = `
    <div class="operations-fullscreen-panel" role="dialog" aria-modal="true" aria-label="Presentaciones de Operaciones en vista panoramica">
      <button class="action-icon-btn operations-fullscreen-close" type="button" data-operations-close-fullscreen aria-label="Cerrar vista panoramica">×</button>
      ${operationsPresentationFullscreenMarkup()}
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.classList.add("operations-fullscreen-open");
  wireOperationsPresentations(overlay);
}

function openFinancialPresentationFullscreen() {
  document.querySelector(".operations-fullscreen-overlay")?.remove();
  const overlay = document.createElement("div");
  overlay.className = "operations-fullscreen-overlay";
  overlay.innerHTML = `
    <div class="operations-fullscreen-panel" role="dialog" aria-modal="true" aria-label="Presentacion financiera en vista panoramica">
      <button class="action-icon-btn operations-fullscreen-close" type="button" data-financial-close-fullscreen aria-label="Cerrar vista panoramica">×</button>
      ${financialPresentationFullscreenMarkup()}
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.classList.add("operations-fullscreen-open");
  wireFinancialPresentations(overlay);
}

function closeOperationsPresentationFullscreen() {
  document.querySelector(".operations-fullscreen-overlay")?.remove();
  document.body.classList.remove("operations-fullscreen-open");
}

function wireOperationsPresentations(root = opportunityTable) {
  root.querySelectorAll("[data-operations-section]").forEach((button) => {
    button.addEventListener("click", () => {
      state.operationsPresentationSection = Number(button.dataset.operationsSection) || 0;
      if (button.closest(".operations-fullscreen-overlay")) {
        openOperationsPresentationFullscreen();
      } else {
        renderCommercialSubmenu(areas.operaciones);
      }
    });
  });
  root.querySelectorAll("[data-operations-period]").forEach((input) => {
    input.addEventListener("change", () => {
      if (input.dataset.operationsPeriod === "month") state.operationsPresentationMonth = input.value;
      if (input.dataset.operationsPeriod === "year") state.operationsPresentationYear = input.value || String(new Date().getFullYear());
      if (input.closest(".operations-fullscreen-overlay")) {
        openOperationsPresentationFullscreen();
      } else {
        renderCommercialSubmenu(areas.operaciones);
      }
    });
  });
  root.querySelectorAll("[data-operations-fullscreen]").forEach((button) => {
    button.addEventListener("click", openOperationsPresentationFullscreen);
  });
  root.querySelector("[data-operations-close-fullscreen]")?.addEventListener("click", closeOperationsPresentationFullscreen);
}

function wireFinancialPresentations(root = opportunityTable) {
  root.querySelectorAll("[data-financial-fullscreen]").forEach((button) => {
    button.addEventListener("click", openFinancialPresentationFullscreen);
  });
  root.querySelector("[data-financial-close-fullscreen]")?.addEventListener("click", closeOperationsPresentationFullscreen);
}

const emptyCrmData = { users: [], opportunities: [], agenda: [], gestiones: [], pipeline: [], customers: [], kpis: {} };
const crmSellerAccountLinks = new Map([
  ["gabriela natalie amador flores", "u-xlsx-gabriela-amador"],
  ["gabriela amador", "u-xlsx-gabriela-amador"],
  ["marjorie morales", "u-xlsx-marjorie-morales"],
  ["asesor arteycolor", "u-xlsx-marjorie-morales"]
]);

function isCrmArchivedOpportunity(opportunity = {}) {
  const status = String(opportunity.status || "Vigente").toLowerCase();
  return Boolean(opportunity.archived) || Boolean(opportunity.migratedToResults) || ["perdida", "cancelada", "anulada", "migrada"].includes(status);
}

function crmIdentityKey(value) {
  return normalizeKey(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function crmLinkedSellerId(data = state.crmData, user = state.currentUser) {
  if (!data || !user || user.role !== "operativos" || isAdminUser(user)) return "";
  const identities = [user.name, user.username, String(user.email || "").split("@")[0]]
    .map(crmIdentityKey)
    .filter(Boolean);
  for (const identity of identities) {
    const linkedId = crmSellerAccountLinks.get(identity);
    if (linkedId && data.users?.some((seller) => seller.id === linkedId)) return linkedId;
  }
  const combinedIdentity = identities.join(" ");
  const seller = (data.users || []).find((candidate) => {
    if (candidate.roleId !== "sales_exec") return false;
    const sellerTokens = crmIdentityKey(candidate.name).split(" ").filter(Boolean);
    return sellerTokens.length >= 2 && sellerTokens.every((token) => combinedIdentity.includes(token));
  });
  return seller?.id || "";
}

function crmData() {
  const data = state.crmData || emptyCrmData;
  const linkedSellerId = crmLinkedSellerId(data);
  if (!linkedSellerId) return data;
  const opportunities = (data.opportunities || []).filter((item) => item.ownerId === linkedSellerId);
  const pipelineOpportunities = opportunities.filter((item) => !isCrmArchivedOpportunity(item));
  const opportunityIds = new Set(opportunities.map((item) => item.id));
  const customerIds = new Set(opportunities.map((item) => item.customerId).filter(Boolean));
  const agenda = (data.agenda || []).filter((item) => item.ownerId === linkedSellerId || opportunityIds.has(item.opportunityId));
  const gestiones = (data.gestiones || []).filter((item) => item.ownerId === linkedSellerId || opportunityIds.has(item.opportunityId));
  const totalPipeline = pipelineOpportunities.reduce((sum, item) => sum + Number(item.estimatedAmount || 0), 0);
  const closed = pipelineOpportunities.filter((item) => Number(item.stageId || item.stage?.id || 0) >= 6).length;
  return {
    ...data,
    users: (data.users || []).filter((item) => item.id === linkedSellerId),
    opportunities,
    agenda,
    gestiones,
    customers: (data.customers || []).filter((item) => item.active !== false),
    pipeline: (data.pipeline || []).map((stage) => {
      const stageOpportunities = pipelineOpportunities.filter((item) => Number(item.stageId || item.stage?.id) === Number(stage.id));
      const amount = stageOpportunities.reduce((sum, item) => sum + Number(item.estimatedAmount || 0), 0);
      return { ...stage, opportunities: stageOpportunities, count: stageOpportunities.length, amount, amountLabel: formatMoney(amount) };
    }),
    kpis: {
      ...(data.kpis || {}),
      totalProspects: pipelineOpportunities.length,
      totalPipeline,
      totalPipelineLabel: formatMoney(totalPipeline),
      hotOpportunities: pipelineOpportunities.filter((item) => item.temperature === "Caliente").length,
      scheduledMeetings: agenda.filter((item) => item.status === "Programada").length,
      inProgressVisits: agenda.filter((item) => item.status === "En visita").length,
      completedVisits: agenda.filter((item) => item.status === "Realizada").length,
      closeRate: pipelineOpportunities.length ? Math.round((closed / pipelineOpportunities.length) * 100) : 0
    }
  };
}

function isActiveCrmSeller(user) {
  return normalizeKey(user?.status || "Activo") !== "inactivo";
}

function crmMasterSalesUsers({ includeInactive = false } = {}) {
  const users = (state.crmData?.users || []).filter((user) => user.roleId === "sales_exec");
  return includeInactive ? users : users.filter(isActiveCrmSeller);
}

function crmSalesUsers({ includeInactive = false } = {}) {
  const users = crmData().users.filter((user) => user.roleId === "sales_exec");
  return includeInactive ? users : users.filter(isActiveCrmSeller);
}

function commercialSellerNames({ includeInactive = false } = {}) {
  const names = crmMasterSalesUsers({ includeInactive })
    .map((user) => String(user.name || "").trim())
    .filter(Boolean);
  return names.length ? [...new Set(names)] : [...commercialSellers];
}

function crmOwnerName(ownerId) {
  return crmMasterSalesUsers({ includeInactive: true }).find((user) => user.id === ownerId)?.name
    || crmData().users.find((user) => user.id === ownerId)?.name
    || "Sin vendedor";
}

function crmTemperatureToProbability(temperature = "Tibio") {
  const normalized = String(temperature).toLowerCase();
  if (normalized.includes("caliente")) return "caliente";
  if (normalized.includes("frio") || normalized.includes("frío")) return "frio";
  if (normalized.includes("congel")) return "congelado";
  return "tibio";
}

function crmTemperatureToPercent(temperature = "Tibio") {
  return { Caliente: 80, Tibio: 50, Frio: 25, Congelado: 10 }[temperature] || 50;
}

function crmStageToOpportunityStage(opportunity = {}) {
  const stageId = Number(opportunity.stageId || opportunity.stage?.id || 1);
  return opportunityStages[Math.max(0, Math.min(opportunityStages.length - 1, stageId - 1))] || "Prospeccion";
}

function crmOpportunityToFormItem(opportunity = {}) {
  const agenda = crmData().agenda.find((item) => item.opportunityId === opportunity.id) || {};
  return {
    id: opportunity.id || "",
    customerId: opportunity.customerId || "",
    date: opportunity.nextDate || opportunity.deadline || opportunity.startDate || todayISO(),
    company: opportunity.company || "",
    sellerId: opportunity.ownerId || "",
    seller: opportunity.owner?.name || crmOwnerName(opportunity.ownerId),
    contact: opportunity.contact || opportunity.responsible || "",
    phone: opportunity.phone || "",
    segment: opportunity.segment || opportunity.product || "",
    location: opportunity.location || "",
    stage: crmStageToOpportunityStage(opportunity),
    priority: opportunity.priority || "Media",
    probability: crmTemperatureToProbability(opportunity.temperature),
    amount: Number(opportunity.estimatedAmount || 0),
    nextAction: opportunity.nextAction || "Primer seguimiento",
    agendaDate: agenda.date || opportunity.agendaDate || opportunity.nextDate || "",
    agendaTime: agenda.time || opportunity.agendaTime || "",
    agendaType: agenda.type || opportunity.agendaType || "Seguimiento",
    agendaPlace: agenda.place || opportunity.agendaPlace || "Por definir",
    note: opportunity.lastNote || opportunity.comment || ""
  };
}

function fillOpportunityForm(item, context = "results") {
  state.opportunityFormContext = context;
  opportunityId.value = item?.id || "";
  opportunityCrmSourceId.value = "";
  opportunityCustomerId.value = item?.customerId || "";
  refreshOpportunityCustomerOptions(item?.customerId || "", item?.company || "");
  opportunityDate.value = item?.date || todayISO();
  opportunityCompany.value = item?.company || "";
  if (context === "crm") {
    opportunitySeller.innerHTML = crmSortedSellers().map((seller) => (
      `<option value="${escapeHtml(seller.id)}">${escapeHtml(seller.name)}</option>`
    )).join("");
  }
  if (context === "crm") {
    opportunitySeller.value = item?.sellerId || crmSortedSellers()[0]?.id || "";
  } else {
    ensureSelectOption(opportunitySeller, item?.seller || commercialSellerNames()[0]);
  }
  opportunityContact.value = item?.contact || "";
  opportunityPhone.value = item?.phone || "";
  ensureSelectOption(opportunitySegment, item?.segment || "");
  ensureSelectOption(opportunityLocation, item?.location || "");
  opportunityStage.value = item?.stage || opportunityStages[0];
  opportunityPriority.value = item?.priority || "Media";
  opportunityProbability.value = item?.probability || "tibio";
  opportunityAmount.value = item?.amount || "";
  opportunityNextAction.value = item?.nextAction || "Primer seguimiento";
  opportunityAgendaDate.value = item?.agendaDate || item?.date || todayISO();
  opportunityAgendaTime.value = item?.agendaTime || "";
  opportunityAgendaType.value = item?.agendaType || "Seguimiento";
  opportunityAgendaPlace.value = item?.agendaPlace || "Por definir";
  opportunityNote.value = item?.note || item?.comment || "";
  opportunityDialogTitle.textContent = item?.id ? "Editar oportunidad" : "Nueva oportunidad";
  saveOpportunityBtn.textContent = item?.id ? "Actualizar oportunidad" : "Guardar oportunidad";
  opportunityDialog.showModal();
}

function opportunityMigratedFromCrm(crmOpportunityId) {
  if (!crmOpportunityId) return false;
  return getOpportunitySubmenu().items.some((item) => item.crmOpportunityId === crmOpportunityId);
}

function resultOpportunityFromCrm(opportunity) {
  const id = crypto.randomUUID();
  const agendaDate = opportunity.nextDate || opportunity.deadline || opportunity.startDate || todayISO();
  const date = todayISO();
  const stage = crmStageToOpportunityStage(opportunity);
  return {
    id,
    date,
    time: currentTimeValue(),
    company: opportunity.company || "Cliente CRM",
    seller: normalizeSeller(opportunity.owner?.name || crmOwnerName(opportunity.ownerId)),
    contact: opportunity.contact || opportunity.responsible || "",
    phone: opportunity.phone || "",
    segment: opportunity.segment || opportunity.product || "",
    location: opportunity.location || "",
    stage,
    priority: opportunity.priority || "Media",
    probability: crmTemperatureToProbability(opportunity.temperature),
    amount: Number(opportunity.estimatedAmount || 0),
    nextAction: opportunity.nextAction || "Primer seguimiento",
    agendaDate: opportunity.agendaDate || agendaDate,
    agendaTime: opportunity.agendaTime || "",
    agendaType: opportunity.agendaType || "Seguimiento",
    agendaPlace: opportunity.agendaPlace || "Por definir",
    note: opportunity.lastNote || opportunity.comment || "",
    crmOpportunityId: opportunity.id,
    managements: [{
      id: `${id}-mgmt-001`,
      date,
      time: currentTimeValue(),
      stage,
      comment: `Migrada desde CRM${opportunity.lastNote || opportunity.comment ? `: ${opportunity.lastNote || opportunity.comment}` : "."}`
    }]
  };
}

async function migrateCrmOpportunityToResults(opportunityId, trigger = null) {
  const opportunity = crmData().opportunities.find((item) => item.id === opportunityId);
  if (!opportunity || isCrmArchivedOpportunity(opportunity)) return;
  const originalText = trigger?.textContent;
  if (trigger) {
    trigger.disabled = true;
    trigger.textContent = "Migrando...";
  }
  try {
    const payload = await apiJson(`/api/crm/opportunities/${encodeURIComponent(opportunityId)}/migrate`, {
      method: "POST",
      headers: { "X-System-User-Id": state.currentUser?.id || "" },
      body: "{}"
    });
    const [persistedOpportunities, refreshedCrm] = await Promise.all([
      apiJson("/api/opportunities"),
      apiJson("/api/crm/bootstrap")
    ]);
    state.crmData = refreshedCrm || payload.crm;
    const confirmedItems = Array.isArray(persistedOpportunities) ? persistedOpportunities : (payload.opportunities || []);
    getOpportunitySubmenu().items = sanitizeTestOpportunities(normalizeOpportunities(confirmedItems));
    const migrationConfirmed = getOpportunitySubmenu().items.some((item) => String(item.crmOpportunityId) === String(opportunityId));
    if (!migrationConfirmed) throw new Error("La migración no quedó persistida en Oportunidades / Gerencia");
    localStorage.setItem(opportunitiesStorageKey, JSON.stringify(getOpportunitySubmenu().items));
    state.opportunityCycleView = "active";
    state.opportunityPage = 1;
    renderCommercialSubmenu(areas.comercializacion);
  } catch (error) {
    if (trigger) {
      trigger.disabled = false;
      trigger.textContent = originalText;
    }
    alert("No fue posible migrar la oportunidad. Recargue e intente nuevamente.");
  }
}

async function returnOpportunityToFollowup(item, trigger = null) {
  if (!item?.id && !item?.crmOpportunityId) return;
  const confirmed = confirm(
    `¿Volver “${item.company}” a Seguimiento?\n\n` +
    "Se retirará de Oportunidades / Gerencia y volverá a quedar activa en Seguimiento. " +
    "La bitácora se conservará."
  );
  if (!confirmed) return;

  const originalHtml = trigger?.innerHTML;
  if (trigger) {
    trigger.disabled = true;
    trigger.textContent = "…";
  }
  try {
    const payload = await apiJson(
      `/api/crm/opportunities/${encodeURIComponent(item.crmOpportunityId || item.id)}/return-to-followup`,
      {
        method: "POST",
        headers: { "X-System-User-Id": state.currentUser?.id || "" },
        body: "{}"
      }
    );
    state.crmData = payload.crm;
    getOpportunitySubmenu().items = sanitizeTestOpportunities(normalizeOpportunities(payload.opportunities || []));
    localStorage.setItem(opportunitiesStorageKey, JSON.stringify(getOpportunitySubmenu().items));
    renderCommercialSubmenu(areas.comercializacion);
    alert(`“${item.company}” volvió a Seguimiento. La bitácora quedó conservada.`);
  } catch (error) {
    if (trigger) {
      trigger.disabled = false;
      trigger.innerHTML = originalHtml;
    }
    alert(error.message || "No fue posible devolver la oportunidad a Seguimiento.");
  }
}

async function cancelResultOpportunity(item, trigger = null) {
  const confirmed = confirm(
    `¿Está seguro de anular la oportunidad “${item.company}”?\n\n` +
    "El registro no se borrará: quedará conservado en el historial como Anulado."
  );
  if (!confirmed) return;

  const originalHtml = trigger?.innerHTML;
  if (trigger) {
    trigger.disabled = true;
    trigger.textContent = "…";
  }
  try {
    if (apiEnabled) {
      const payload = await apiJson(`/api/opportunities/${encodeURIComponent(item.id)}/cancel`, {
        method: "POST",
        headers: { "X-System-User-Id": state.currentUser?.id || "" },
        body: JSON.stringify({
          reason: "Anulada desde Oportunidades / Gerencia",
          updatedBy: state.currentUser?.name || "Sistema Gerencial"
        })
      });
      getOpportunitySubmenu().items = sanitizeTestOpportunities(normalizeOpportunities(payload.opportunities || []));
    } else {
      item.managements = normalizeManagements(item);
      item.managements.push({
        id: crypto.randomUUID(),
        date: todayISO(),
        time: currentTimeValue(),
        stage: closureStage,
        result: "anulada",
        comment: "Anulada desde Oportunidades / Gerencia",
        createdBy: state.currentUser?.name || roleDisplayName()
      });
      item.status = "Anulada";
      item.archived = true;
      item.archivedAt = new Date().toISOString();
      item.archivedBy = state.currentUser?.name || roleDisplayName();
    }
    localStorage.setItem(opportunitiesStorageKey, JSON.stringify(getOpportunitySubmenu().items));
    renderCommercialSubmenu(areas.comercializacion);
    resetOpportunityForm();
    alert(`“${item.company}” fue anulada y se conserva en el historial.`);
  } catch (error) {
    if (trigger) {
      trigger.disabled = false;
      trigger.innerHTML = originalHtml;
    }
    alert(error.message || "No fue posible anular la oportunidad.");
  }
}

function openCrmCancellationDialog(opportunityId) {
  const opportunity = crmData().opportunities.find((item) => item.id === opportunityId);
  if (!opportunity || isCrmArchivedOpportunity(opportunity)) return;
  crmCancellationOpportunityId.value = opportunity.id;
  crmCancellationOpportunityLabel.textContent = `${opportunity.company || "Oportunidad"} · ${formatMoney(opportunity.estimatedAmount || 0)}`;
  crmCancellationReason.value = "";
  crmCancellationDialog.showModal();
  setTimeout(() => crmCancellationReason.focus(), 0);
}

function crmSearchText() {
  return String(state.crmSearch || "").trim().toLowerCase();
}

function crmMatchesSearch(opportunity, seller = null) {
  const query = crmSearchText();
  if (!query) return true;
  const haystack = [
    opportunity.company,
    opportunity.product,
    opportunity.segment,
    opportunity.location,
    opportunity.status,
    opportunity.temperature,
    opportunity.stage?.name,
    opportunity.owner?.name,
    crmOwnerName(opportunity.ownerId),
    seller?.name,
    seller?.email
  ].join(" ").toLowerCase();
  return haystack.includes(query);
}

function crmActiveOpportunitiesForSeller(sellerId) {
  return crmData().opportunities.filter((opp) => {
    const status = String(opp.status || "Vigente").toLowerCase();
    return opp.ownerId === sellerId && !isCrmArchivedOpportunity(opp) && status !== "ganada" && crmMatchesSearch(opp);
  });
}

function crmSortedSellers() {
  return [...crmSalesUsers()].sort((a, b) => {
    const aCount = crmActiveOpportunitiesForSeller(a.id).length;
    const bCount = crmActiveOpportunitiesForSeller(b.id).length;
    return bCount - aCount || String(a.name).localeCompare(String(b.name));
  });
}

function crmSellersWithOpportunityMovement() {
  const opportunityOwnerIds = new Set(
    crmData().opportunities.map((opportunity) => String(opportunity.ownerId || ""))
  );
  return crmSortedSellers().filter((seller) => opportunityOwnerIds.has(String(seller.id)));
}

function updateCrmModel(payload) {
  state.crmData = payload;
  fillOpportunityOptions();
  if (state.activeArea === adminAreaKey && state.activeSubmenu === "vendedores") {
    renderAdminPanel();
  } else if (state.activeArea === "comercializacion") {
    renderCommercialSubmenu(areas.comercializacion);
  }
}

function crmApi(path, options = {}) {
  const headers = {
    ...(options.headers || {}),
    "X-System-User-Id": state.currentUser?.id || ""
  };
  return apiJson(`/api/crm${path}`, { ...options, headers }).then((payload) => {
    updateCrmModel(payload);
    return payload;
  });
}

let syncingLostCrmOpportunities = false;

async function syncLostCrmOpportunities() {
  if (!apiEnabled || syncingLostCrmOpportunities || !state.crmData) return;
  const lostCrmIds = new Set(
    getOpportunitySubmenu().items
      .filter(isLostOpportunity)
      .map((item) => item.crmOpportunityId)
      .filter(Boolean)
  );
  const pending = (state.crmData.opportunities || []).filter((opportunity) => (
    lostCrmIds.has(opportunity.id) && !isCrmArchivedOpportunity(opportunity)
  ));
  if (!pending.length) return;
  syncingLostCrmOpportunities = true;
  try {
    for (const opportunity of pending) {
      state.crmData = await apiJson(`/api/crm/opportunities/${encodeURIComponent(opportunity.id)}`, {
        method: "PATCH",
        headers: { "X-System-User-Id": state.currentUser?.id || "" },
        body: JSON.stringify({ status: "Perdida", archived: true, archivedReason: "Cierre perdido" })
      });
    }
    if (!appShell.classList.contains("hidden")) renderDashboard();
  } catch {
    // El servidor vuelve a conciliar los cierres almacenados en la siguiente carga.
  } finally {
    syncingLostCrmOpportunities = false;
  }
}

function canManageCrmOpportunity(opportunity = {}) {
  if (state.currentUser?.role !== "operativos" || isAdminUser()) return true;
  const linkedSellerId = crmLinkedSellerId();
  return Boolean(linkedSellerId && opportunity.ownerId === linkedSellerId);
}

function ensureCrmOpportunityDialog() {
  let dialog = document.querySelector("#crmOpportunityDialog");
  if (dialog) return dialog;
  dialog = document.createElement("dialog");
  dialog.id = "crmOpportunityDialog";
  dialog.className = "wide-dialog";
  dialog.innerHTML = `
    <form method="dialog" class="dialog-card crm-opportunity-form" id="crmOpportunityForm">
      <div class="panel-head">
        <div>
          <p class="eyebrow">CRM</p>
          <h3 id="crmOpportunityTitle">Nueva oportunidad</h3>
        </div>
        <button class="icon-btn" type="button" data-crm-close>×</button>
      </div>
      <input type="hidden" id="crmOpportunityId">
      <div class="crm-form-grid">
        <label>Empresa<input id="crmCompany" maxlength="80" placeholder="Nombre de la empresa" required></label>
        <label>Vendedor<select id="crmOwnerId" required></select></label>
        <label>Contacto<input id="crmContact" maxlength="90" placeholder="Nombre del contacto"></label>
        <label>Telefono<input id="crmPhone" maxlength="28" placeholder="+503 ..."></label>
        <label>Segmento<select id="crmSegment">
          <option value="">Seleccionar rubro</option>
          ${opportunitySegments.map((segment) => `<option value="${escapeHtml(segment)}">${escapeHtml(segment)}</option>`).join("")}
        </select></label>
        <label>Ubicación<select id="crmLocation">${elSalvadorLocationOptions()}</select></label>
        <label>Etapa<select id="crmStageId" required></select></label>
        <label>Prioridad<select id="crmPriority"><option>Alta</option><option selected>Media</option><option>Baja</option></select></label>
        <label>Temperatura<select id="crmTemperature"><option>Caliente</option><option selected>Tibio</option><option>Frio</option><option>Congelado</option></select></label>
        <label>Monto estimado<input id="crmEstimatedAmount" type="number" min="0" step="1" placeholder="0"></label>
        <label>Proxima fecha<input id="crmNextDate" type="date"></label>
        <label>Proxima accion<input id="crmNextAction" maxlength="100" placeholder="Primer seguimiento"></label>
        <section class="crm-form-section span-2">
          <span class="eyebrow">Agenda inicial opcional</span>
          <div class="crm-form-grid compact">
            <label>Fecha<input id="crmAgendaDate" type="date"></label>
            <label>Hora<input id="crmAgendaTime" type="time"></label>
            <label>Tipo<input id="crmAgendaType" maxlength="70" placeholder="Diagnostico, cierre..."></label>
            <label>Lugar<input id="crmAgendaPlace" maxlength="100" placeholder="Cliente, llamada, showroom..."></label>
          </div>
        </section>
        <label class="span-2">Nota<textarea id="crmLastNote" rows="3" placeholder="Contexto comercial, necesidad o siguiente paso"></textarea></label>
      </div>
      <menu>
        <button class="ghost-btn" type="button" data-crm-close>Cancelar</button>
        <button class="primary-btn" type="submit">Guardar oportunidad</button>
      </menu>
    </form>
  `;
  document.body.appendChild(dialog);
  dialog.querySelectorAll("[data-crm-close]").forEach((button) => {
    button.addEventListener("click", () => dialog.close());
  });
  dialog.querySelector("#crmOpportunityForm").addEventListener("submit", (event) => {
    event.preventDefault();
    saveCrmOpportunity();
  });
  return dialog;
}

function openCrmOpportunityDialog(opportunity = null) {
  fillOpportunityForm(opportunity ? crmOpportunityToFormItem(opportunity) : null, "crm");
}

function saveCrmOpportunity() {
  const dialog = ensureCrmOpportunityDialog();
  const id = dialog.querySelector("#crmOpportunityId").value;
  const payload = {
    company: dialog.querySelector("#crmCompany").value,
    product: dialog.querySelector("#crmSegment").value,
    contact: dialog.querySelector("#crmContact").value,
    responsible: dialog.querySelector("#crmContact").value,
    phone: dialog.querySelector("#crmPhone").value,
    segment: dialog.querySelector("#crmSegment").value,
    location: dialog.querySelector("#crmLocation").value,
    ownerId: dialog.querySelector("#crmOwnerId").value,
    stageId: Number(dialog.querySelector("#crmStageId").value || 1),
    priority: dialog.querySelector("#crmPriority").value,
    temperature: dialog.querySelector("#crmTemperature").value,
    estimatedAmount: Number(dialog.querySelector("#crmEstimatedAmount").value || 0),
    closePercent: crmTemperatureToPercent(dialog.querySelector("#crmTemperature").value),
    nextDate: dialog.querySelector("#crmNextDate").value,
    deadline: dialog.querySelector("#crmNextDate").value,
    status: "Vigente",
    nextAction: dialog.querySelector("#crmNextAction").value || "Seguimiento comercial",
    lastNote: dialog.querySelector("#crmLastNote").value,
    comment: dialog.querySelector("#crmLastNote").value,
    agendaDate: dialog.querySelector("#crmAgendaDate").value,
    agendaTime: dialog.querySelector("#crmAgendaTime").value,
    agendaType: dialog.querySelector("#crmAgendaType").value,
    agendaPlace: dialog.querySelector("#crmAgendaPlace").value
  };
  const method = id ? "PATCH" : "POST";
  const path = id ? `/opportunities/${id}` : "/opportunities";
  crmApi(path, { method, body: JSON.stringify(payload) }).then(() => dialog.close());
}

function openCrmOpportunityById(opportunityId) {
  const opportunity = crmData().opportunities.find((item) => item.id === opportunityId);
  if (opportunity) openCrmOpportunityDialog(opportunity);
}

function crmEnsureSellerId(sellers = crmSortedSellers()) {
  if (!sellers.length) return "";
  if (!state.crmSellerId || !sellers.some((seller) => seller.id === state.crmSellerId)) {
    state.crmSellerId = sellers[0].id;
  }
  return state.crmSellerId;
}

function crmMetricCards() {
  const data = crmData();
  const kpis = data.kpis || {};
  return [
    ["Pipeline", kpis.totalPipelineLabel || "$0", "Monto estimado activo"],
    ["Oportunidades", kpis.totalProspects || 0, "Registros comerciales"],
    ["Agenda", kpis.scheduledMeetings || 0, "Visitas programadas"],
    ["En visita", kpis.inProgressVisits || 0, "Ejecucion de campo"],
    ["Realizadas", kpis.completedVisits || 0, "Gestiones completadas"],
    ["Cierre", `${kpis.closeRate || 0}%`, "Etapa 6 o superior"]
  ].map(([label, value, meta]) => `
    <article class="crm-metric">
      <span>${label}</span>
      <strong>${value}</strong>
      <small>${meta}</small>
    </article>
  `).join("");
}

function crmSellerOpportunityShare() {
  const activeStatuses = new Set(["vigente", "pendiente", "abierta", "activo"]);
  const activeOpportunities = crmData().opportunities.filter((opp) => {
    const status = String(opp.status || "Vigente").toLowerCase();
    return !isCrmArchivedOpportunity(opp) && (activeStatuses.has(status) || status !== "ganada");
  });
  const opportunityAmount = (opp) => Number(opp.estimatedAmount ?? opp.amount ?? 0);
  const total = activeOpportunities.reduce((sum, opp) => sum + opportunityAmount(opp), 0);
  const sellers = new Map(crmSalesUsers().map((seller) => [seller.id, {
    id: seller.id,
    name: seller.name,
    amount: 0,
    count: 0
  }]));
  activeOpportunities.forEach((opp) => {
    const sellerId = opp.ownerId || opp.owner?.id || "sin-asignar";
    if (!sellers.has(sellerId)) {
      sellers.set(sellerId, {
        id: sellerId,
        name: opp.owner?.name || crmOwnerName(sellerId) || "Sin asignar",
        amount: 0,
        count: 0
      });
    }
    const seller = sellers.get(sellerId);
    seller.amount += opportunityAmount(opp);
    seller.count += 1;
  });
  return [...sellers.values()]
    .filter((seller) => seller.count > 0 || seller.amount > 0)
    .map((seller) => ({
      ...seller,
      percent: total ? (seller.amount / total) * 100 : 0
    }))
    .sort((a, b) => b.amount - a.amount || a.name.localeCompare(b.name));
}

function filteredCrmDashboardOpportunities() {
  const activeStatuses = new Set(["vigente", "pendiente", "abierta", "activo"]);
  const query = normalizeKey(state.crmSearch);
  return crmData().opportunities
    .filter((opportunity) => {
      const status = String(opportunity.status || "Vigente").toLowerCase();
      return !isCrmArchivedOpportunity(opportunity) && (activeStatuses.has(status) || status !== "ganada");
    })
    .filter((opportunity) => !query || [
      opportunity.nextDate,
      opportunity.deadline,
      opportunity.company,
      opportunity.owner?.name,
      crmOwnerName(opportunity.ownerId),
      crmStageToOpportunityStage(opportunity),
      opportunity.temperature,
      opportunity.estimatedAmount,
      formatMoney(opportunity.estimatedAmount)
    ].some((value) => searchTokenMatches(value, query)));
}

function renderCrmSellerKpi(rows) {
  const query = normalizeKey(state.crmSearch);
  const totalOpportunities = rows.length;
  const totalPipeline = rows.reduce((sum, opportunity) => sum + Number(opportunity.estimatedAmount || 0), 0);
  const sellerRows = crmSalesUsers().map((seller) => {
    const opportunities = rows.filter((opportunity) => opportunity.ownerId === seller.id);
    return {
      id: seller.id,
      seller: seller.name,
      opportunities: opportunities.length,
      pipeline: opportunities.reduce((sum, opportunity) => sum + Number(opportunity.estimatedAmount || 0), 0)
    };
  }).filter((seller) => !query || seller.opportunities || searchTokenMatches(seller.seller, query))
    .sort((a, b) => b.opportunities - a.opportunities || b.pipeline - a.pipeline || a.seller.localeCompare(b.seller, "es"));
  const maxOpportunities = Math.max(1, ...sellerRows.map((seller) => seller.opportunities));
  return `
    <section class="financial-seller-kpi" aria-label="Oportunidades por vendedor">
      <div class="financial-seller-kpi-summary">
        <article><span>Oportunidades filtradas</span><strong>${totalOpportunities.toLocaleString("es-SV")}</strong></article>
        <article><span>Pipeline filtrado</span><strong>${formatMoney(totalPipeline)}</strong></article>
        <article><span>Vendedores</span><strong>${sellerRows.length.toLocaleString("es-SV")}</strong></article>
      </div>
      <div class="financial-seller-chart-head">
        <div><span>KPI comercial</span><h4>Oportunidades por vendedor</h4></div>
        <small>Ordenado por cantidad de oportunidades</small>
      </div>
      <div class="financial-seller-chart" role="list">
        ${sellerRows.map((seller, index) => {
          const percentage = totalOpportunities ? (seller.opportunities / totalOpportunities) * 100 : 0;
          const width = (seller.opportunities / maxOpportunities) * 100;
          return `
            <article class="financial-seller-bar-row" role="listitem" data-crm-seller="${seller.id}" style="--seller-bar-width:${width.toFixed(2)}%;--seller-accent-hue:${164 + (index % 6) * 18}" aria-label="${escapeHtml(seller.seller)}: ${seller.opportunities} oportunidades, ${percentage.toFixed(1)} por ciento, ${formatMoney(seller.pipeline)}">
              <div class="financial-seller-bar-label"><strong>${escapeHtml(seller.seller)}</strong><span>${seller.opportunities.toLocaleString("es-SV")} oportunidades</span></div>
              <div class="financial-seller-bar-track" aria-hidden="true"><i></i></div>
              <div class="financial-seller-bar-values"><strong>${percentage.toFixed(1)}%</strong><span>${formatMoney(seller.pipeline)}</span></div>
            </article>`;
        }).join("") || `<div class="empty-state">No hay oportunidades para el filtro seleccionado.</div>`}
      </div>
    </section>`;
}

function renderCrmHistory() {
  const query = crmSearchText();
  const cancelledRows = crmData().opportunities.filter((opportunity) => {
    const status = normalizeKey(opportunity.status);
    const isCancellation = opportunity.archiveType === "seller_cancellation"
      || ["anulada", "cancelada", "perdida"].includes(status);
    return isCancellation && opportunity.archiveType !== "migration";
  });
  const sourceById = new Map(crmData().opportunities.map((opportunity) => [String(opportunity.id), opportunity]));
  const closedRows = getOpportunitySubmenu().items.flatMap((item) => {
    if (!item.crmOpportunityId) return [];
    const result = closureResult(item);
    if (!result?.result) return [];
    const source = sourceById.get(String(item.crmOpportunityId)) || {};
    const resultKey = normalizeKey(result.result);
    const status = resultKey === "ganado"
      ? "Ganada"
      : resultKey === "perdido" || resultKey === "perdida" ? "Perdida" : "Anulada";
    return [{
      ...source,
      id: source.id || item.crmOpportunityId,
      company: item.company || source.company,
      owner: source.owner,
      ownerId: source.ownerId,
      seller: item.seller,
      status,
      archiveType: "closure",
      archivedReason: result.comment || `Cierre ${status.toLowerCase()} registrado en Gerencia`,
      archivedBy: result.createdBy || item.updatedBy || item.seller || "Sistema",
      archivedAt: result.date || item.updatedAt || item.date || "",
      estimatedAmount: Number(item.amount || source.estimatedAmount || 0)
    }];
  });
  const closedSourceIds = new Set(closedRows.map((opportunity) => String(opportunity.id)));
  const rows = [...cancelledRows.filter((opportunity) => !closedSourceIds.has(String(opportunity.id))), ...closedRows]
    .filter((opportunity) => {
      if (!query) return true;
      return [
        opportunity.company,
        opportunity.owner?.name,
        crmOwnerName(opportunity.ownerId),
        opportunity.seller,
        opportunity.status,
        opportunity.archivedReason,
        opportunity.archivedBy
      ].some((value) => String(value || "").toLowerCase().includes(query));
    })
    .sort((a, b) => String(b.archivedAt || "").localeCompare(String(a.archivedAt || "")));
  return `
    <section class="crm-history-shell" aria-label="Bitacora de oportunidades">
      <div class="crm-history-summary">
        <div><span>Bitacora comercial</span><h4>Historial de oportunidades</h4></div>
        <p>${rows.length} anuladas o cerradas · las migraciones activas no se muestran</p>
      </div>
      <div class="crm-history-list">
        ${rows.map((opportunity) => {
          const isClosure = opportunity.archiveType === "closure";
          const audit = [...(Array.isArray(opportunity.auditLog) ? opportunity.auditLog : [])].reverse()[0] || {};
          const date = String(opportunity.archivedAt || audit.date || "").slice(0, 10);
          return `
            <article class="crm-history-card ${isClosure ? "is-closure" : "is-cancellation"}">
              <div class="crm-history-main">
                <span class="crm-history-status">${escapeHtml(opportunity.status || "Anulada")}</span>
                <strong>${escapeHtml(opportunity.company || "Sin empresa")}</strong>
                <small>${escapeHtml(opportunity.owner?.name || crmOwnerName(opportunity.ownerId) || opportunity.seller || "Sin vendedor")}</small>
              </div>
              <div class="crm-history-reason">
                <span>Resultado / motivo</span>
                <strong>${escapeHtml(opportunity.archivedReason || audit.reason || "Movimiento registrado")}</strong>
                <small>${escapeHtml(opportunity.archivedBy || audit.userName || "Sistema")}${date ? ` · ${formatDate(date)}` : ""}</small>
              </div>
              <div class="crm-history-amount"><span>Monto historico</span><strong>${formatMoney(opportunity.estimatedAmount || 0)}</strong></div>
              ${canDeleteOpportunities() ? `<button type="button" class="crm-history-purge" data-crm-history-purge="${escapeHtml(opportunity.id)}" aria-label="Eliminar definitivamente ${escapeHtml(opportunity.company || "oportunidad")}">Eliminar definitivamente</button>` : ""}
            </article>`;
        }).join("") || `<div class="empty-state">No hay movimientos en la bitacora para este filtro.</div>`}
      </div>
    </section>`;
}

function renderCrmDashboard() {
  const rows = filteredCrmDashboardOpportunities();
  opportunityTotalAmount.querySelector("strong").textContent = formatMoney(
    rows.reduce((sum, opportunity) => sum + Number(opportunity.estimatedAmount || 0), 0)
  );
  if (state.crmOpportunitiesView === "history") return renderCrmHistory();
  if (state.crmOpportunitiesView === "seller-kpi") return renderCrmSellerKpi(rows);
  const pageCount = Math.max(1, Math.ceil(rows.length / crmOpportunityPageSize));
  state.crmOpportunityPage = Math.min(Math.max(Number(state.crmOpportunityPage) || 1, 1), pageCount);
  const pageStart = (state.crmOpportunityPage - 1) * crmOpportunityPageSize;
  const pageEnd = pageStart + crmOpportunityPageSize;
  const pagedRows = rows.slice(pageStart, pageEnd);
  return `
    <div class="opportunity-row opportunity-header">
      <strong>Fecha</strong>
      <strong>Empresa</strong>
      <strong>Vendedor</strong>
      <strong>Etapa</strong>
      <strong>Temperatura</strong>
      <strong>Monto</strong>
      <strong>Acciones</strong>
    </div>
    <div class="opportunity-table-body">
      ${pagedRows.length ? pagedRows.map((opportunity) => {
        const probability = crmTemperatureToProbability(opportunity.temperature);
        const canManage = canManageCrmOpportunity(opportunity);
        return `
          <div class="opportunity-row">
            <span>${formatDate(opportunity.nextDate || opportunity.deadline || opportunity.startDate)}</span>
            <strong class="company-cell"><span class="company-name">${escapeHtml(opportunity.company || "Sin empresa")}</span>${hasOutstandingSamples(opportunity) ? `<span class="closure-badge samples-assigned">Muestras asignadas</span>` : ""}</strong>
            <span>${escapeHtml(opportunity.owner?.name || crmOwnerName(opportunity.ownerId))}</span>
            <span>${escapeHtml(crmStageToOpportunityStage(opportunity))}</span>
            <span class="tag ${probabilityClass(probability)}">${escapeHtml(probabilityLabel(probability))}</span>
            <strong>${formatMoney(opportunity.estimatedAmount)}</strong>
            <span class="row-actions">
              ${canManage ? `<button class="action-icon-btn" type="button" data-crm-edit="${opportunity.id}" aria-label="Editar"><span aria-hidden="true">✏️</span></button>` : ""}
              <button class="action-icon-btn manage-action-btn" type="button" data-crm-management="${opportunity.id}" aria-label="Gestiones y custodia de muestras" title="Gestiones y custodia de muestras"><span aria-hidden="true">📋</span></button>
              ${canManage ? `<button class="action-icon-btn danger" type="button" data-crm-delete="${opportunity.id}" aria-label="Borrar"><span aria-hidden="true">🗑️</span></button>` : ""}
            </span>
          </div>
        `;
      }).join("") : `<div class="empty-state">No hay oportunidades vigentes para este filtro.</div>`}
    </div>
    <div class="opportunity-pagination" aria-label="Paginacion de oportunidades CRM">
      <span>Mostrando ${rows.length ? pageStart + 1 : 0}-${Math.min(pageEnd, rows.length)} de ${rows.length}</span>
      <div>
        <button class="ghost-btn compact-btn" type="button" data-crm-page="prev" ${state.crmOpportunityPage <= 1 ? "disabled" : ""}>Anterior</button>
        <strong>Pagina ${state.crmOpportunityPage} de ${pageCount}</strong>
        <button class="ghost-btn compact-btn" type="button" data-crm-page="next" ${state.crmOpportunityPage >= pageCount ? "disabled" : ""}>Siguiente</button>
      </div>
    </div>
  `;
}

function renderCrmSellers() {
  const sellers = crmSellersWithOpportunityMovement().filter((seller) => {
    const active = crmActiveOpportunitiesForSeller(seller.id);
    return !crmSearchText() || active.length || crmMatchesSearch({}, seller);
  });
  const rows = sellers.map((seller) => {
    const activeOpportunities = crmActiveOpportunitiesForSeller(seller.id);
    const activePipeline = activeOpportunities.reduce((sum, opp) => sum + Number(opp.estimatedAmount || 0), 0);
    return `
      <tr class="crm-seller-row" data-crm-seller="${seller.id}">
        <td>
          <strong>${escapeHtml(seller.name)}</strong>
          <span>${escapeHtml(seller.initials || "SV")} - ${escapeHtml(seller.status || "Activo")}</span>
        </td>
        <td>${activeOpportunities.length}</td>
        <td>${formatMoney(activePipeline)}</td>
        <td><button class="crm-link-pill" type="button" data-crm-seller="${seller.id}">Abrir seguimiento</button></td>
      </tr>
    `;
  }).join("");
  return `
    <section class="crm-shell crm-original-module">
      <div class="crm-topbar">
        <button class="primary-btn" type="button" data-crm-new>+ Oportunidad</button>
        <label class="crm-search-box">⌕<input data-crm-search value="${escapeHtml(state.crmSearch)}" placeholder="Buscar cliente, etapa o vendedor"></label>
        <button class="secondary-btn" type="button" data-crm-refresh>↻</button>
      </div>
      <section class="crm-panel">
        <div class="crm-module-head">
          <span class="eyebrow">Modulo vendedores</span>
          <span class="crm-total-pill">${sellers.length} activos</span>
        </div>
        <div class="crm-data-table-wrap">
          <table class="crm-data-table">
            <thead>
              <tr>
                <th>Vendedor</th>
                <th>Oportunidades vigentes</th>
                <th>Venta probable vigente</th>
                <th>Acceso</th>
              </tr>
            </thead>
            <tbody>${rows || `<tr><td colspan="4"><div class="empty-state">No hay vendedores registrados.</div></td></tr>`}</tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function crmResultWinHistory(selectedSeller = null) {
  const selectedSellerKey = crmIdentityKey(selectedSeller?.name || "");
  const localWins = getOpportunitySubmenu().items.flatMap((item) => {
    const result = closureResult(item);
    if (result?.result !== "ganado") return [];
    return [{
      id: item.id,
      opportunityId: item.id,
      crmOpportunityId: item.crmOpportunityId || "",
      quotationId: item.quotationId || "",
      quotationNumber: item.quotationNumber || "",
      managementId: result.id || "",
      date: result.date || item.trackingWin?.closedDate || item.date || "",
      time: result.time || item.trackingWin?.closedTime || "",
      company: item.company || "Cliente sin nombre",
      seller: item.seller || "Sin vendedor",
      amount: Number(item.amount || 0),
      segment: item.segment || "Sin producto registrado",
      comment: result.comment || "Cierre ganado registrado.",
      createdAt: item.trackingWin?.createdAt || `${result.date || item.date || ""}T${result.time || "00:00"}:00`
    }];
  });
  const serverWins = Array.isArray(crmData().resultWins) ? crmData().resultWins : [];
  const unique = new Map();
  [...serverWins, ...localWins].forEach((win) => {
    const key = `${win.id || win.opportunityId}:${win.managementId || win.date}`;
    unique.set(key, { ...win, amount: Number(win.amount || 0) });
  });
  return [...unique.values()]
    .filter((win) => !selectedSellerKey || crmIdentityKey(win.seller) === selectedSellerKey)
    .sort((a, b) => `${b.date || ""} ${b.time || ""}`.localeCompare(`${a.date || ""} ${a.time || ""}`));
}

function crmWonIdentityKeys(win) {
  return new Set([win?.id, win?.opportunityId, win?.crmOpportunityId]
    .filter(Boolean)
    .map((value) => String(value)));
}

function latestQuotationForWonOpportunity(win) {
  if (win?.quotationId) {
    return state.quotations.find((item) => String(item.id) === String(win.quotationId)) || null;
  }
  const identityKeys = crmWonIdentityKeys(win);
  return state.quotations
    .filter((item) => identityKeys.has(String(item.opportunityId || "")))
    .sort((a, b) => String(b.updatedAt || b.date).localeCompare(String(a.updatedAt || a.date)))[0] || null;
}

function renderCrmTracking() {
  const data = crmData();
  const linkedSellerId = crmLinkedSellerId();
  const sellers = crmSellersWithOpportunityMovement();
  const selectedSellerId = crmEnsureSellerId(sellers);
  const selectedSeller = sellers.find((seller) => seller.id === selectedSellerId);
  const sellerOpportunities = selectedSeller ? data.opportunities.filter((opp) => opp.ownerId === selectedSeller.id) : [];
  const globalActiveOpportunities = data.opportunities.filter((opportunity) => !isCrmArchivedOpportunity(opportunity) && String(opportunity.status || "Vigente").toLowerCase() !== "ganada");
  const resultWins = crmResultWinHistory(selectedSeller);
  const allResultClosures = getOpportunitySubmenu().items.filter((item) => closureResult(item));
  const resultClosures = allResultClosures.filter((item) => (
    !selectedSeller || crmIdentityKey(item.seller) === crmIdentityKey(selectedSeller.name)
  ));
  const lostOpportunities = resultClosures.filter((item) => closureResult(item)?.result === "perdida");
  const globalActiveValue = globalActiveOpportunities.reduce((sum, opp) => sum + Number(opp.estimatedAmount || 0), 0);
  const wonValue = resultWins.reduce((sum, win) => sum + Number(win.amount || 0), 0);
  const conversionBase = resultWins.length + lostOpportunities.length;
  const conversion = conversionBase ? Math.round((resultWins.length / conversionBase) * 100) : 0;
  const filteredWins = resultWins.filter((win) => (
    (!state.crmWonDateFrom || win.date >= state.crmWonDateFrom)
    && (!state.crmWonDateTo || win.date <= state.crmWonDateTo)
  ));
  const financialOrderByOpportunityId = new Map(state.financialOrders
    .filter((order) => order.sourceOpportunityId)
    .map((order) => [String(order.sourceOpportunityId), order]));
  const controlSalesByFinancialOrderId = new Map(state.controlSales
    .filter((order) => order.financialOrderId && !order.archived)
    .map((order) => [String(order.financialOrderId), order]));
  const controlSalesByOpportunityId = new Map(state.controlSales
    .filter((order) => order.sourceOpportunityId && !order.archived)
    .map((order) => [String(order.sourceOpportunityId), order]));
  // Las migradas pendientes permanecen visibles para seguimiento. Cuando
  // Gerencia registra un cierre, salen de esta vista y quedan en el historico.
  const closedCrmOpportunityIds = new Set(allResultClosures
    .map((item) => String(item.crmOpportunityId || ""))
    .filter(Boolean));
  const closedOpportunityKeys = new Set(allResultClosures.map((item) => (
    `${normalizeBusinessMatch(item.company)}::${crmIdentityKey(item.seller)}`
  )));
  const isVisibleTrackingOpportunity = (opportunity) => {
    const isClosed = closedCrmOpportunityIds.has(String(opportunity.id || ""))
      || closedOpportunityKeys.has(`${normalizeBusinessMatch(opportunity.company)}::${crmIdentityKey(crmOwnerName(opportunity.ownerId))}`);
    return !isClosed && (
      !isCrmArchivedOpportunity(opportunity) || Boolean(opportunity.migratedToResults)
    );
  };
  const visibleOpportunities = sellerOpportunities.filter(isVisibleTrackingOpportunity);
  const activeOpportunities = visibleOpportunities;
  const activeValue = activeOpportunities.reduce((sum, opp) => sum + Number(opp.estimatedAmount || 0), 0);
  const sellerButtons = sellers.map((seller) => {
    const active = data.opportunities.filter((opportunity) => (
      opportunity.ownerId === seller.id && isVisibleTrackingOpportunity(opportunity)
    ));
    const activeTotal = active.reduce((sum, opp) => sum + Number(opp.estimatedAmount || 0), 0);
    return `
      <button class="crm-seller-chip ${seller.id === selectedSellerId ? "is-active" : ""}" type="button" data-crm-seller-only="${seller.id}">
        <strong>${escapeHtml(seller.name)}</strong>
        <span>${active.length} vigentes - ${formatMoney(activeTotal)}</span>
      </button>
    `;
  }).join("");
  const opportunityCards = visibleOpportunities.filter((opp) => crmMatchesSearch(opp, selectedSeller)).sort((a, b) => String(a.deadline || a.nextDate || "").localeCompare(String(b.deadline || b.nextDate || ""))).map((opp) => {
    const migrated = Boolean(opp.migratedToResults) || opportunityMigratedFromCrm(opp.id);
    const resultAction = migrated ? "Migrado a Oportunidades / Gerencia" : "Migrar a Oportunidades / Gerencia";
    return `
      <article class="crm-tracking-card crm-tracking-list-row ${migrated ? "is-migrated" : ""}" data-crm-opportunity="${opp.id}">
        <div class="crm-tracking-list-stage"><small>Etapa</small><strong>${escapeHtml(opp.stage?.name || `${opp.stageId}. Etapa`)}</strong></div>
        <div class="crm-tracking-list-client"><small>Empresa / oportunidad</small><strong>${escapeHtml(opp.company)}</strong><p>${escapeHtml(opp.product || "Producto pendiente")}</p></div>
        <div class="crm-tracking-list-amount"><small>Monto</small><strong>${formatMoney(opp.estimatedAmount || 0)}</strong></div>
        <div class="crm-tracking-list-probability"><small>Cierre</small><strong>${opp.closePercent || 0}%</strong></div>
        <div class="crm-tracking-list-status"><small>Estado</small><span class="${migrated ? "is-migrated" : "is-active"}">${migrated ? "Migrada · pendiente" : escapeHtml(opp.status || "Vigente")}</span>${hasOutstandingSamples(opp) ? `<span class="closure-badge samples-assigned">Muestras asignadas</span>` : ""}</div>
        <div class="crm-tracking-card-actions" aria-label="Acciones de la oportunidad">
          <button class="crm-card-icon-action is-management" type="button" data-crm-management="${opp.id}" aria-label="Gestiones y custodia de muestras" title="Gestiones y custodia de muestras">📋</button>
          <button class="crm-card-icon-action is-result ${migrated ? "is-complete" : ""}" type="button" data-crm-migrate="${opp.id}" aria-label="${resultAction}" title="${resultAction}" ${migrated ? "disabled" : ""}>
            <svg viewBox="0 0 24 24" aria-hidden="true">${migrated ? `<path d="M5 12.5l4.2 4.2L19 7"></path>` : `<path d="M4 12h14M13 6l6 6-6 6"></path>`}</svg>
          </button>
        </div>
      </article>
    `;
  }).join("");
  const wonHistoryCards = filteredWins.map((win) => {
    const identityKeys = crmWonIdentityKeys(win);
    const financialOrder = [...identityKeys].map((key) => financialOrderByOpportunityId.get(key)).find(Boolean);
    const detailOrder = (financialOrder ? controlSalesByFinancialOrderId.get(String(financialOrder.id)) : null)
      || [...identityKeys].map((key) => controlSalesByOpportunityId.get(key)).find(Boolean);
    const quotation = latestQuotationForWonOpportunity(win);
    return `
    <article class="crm-won-history-card crm-won-history-row" title="${escapeHtml(win.comment || "Cierre ganado registrado.")}">
      <div class="crm-won-history-date"><small>Fecha</small><time>${formatDate(win.date)}</time><span>${formatTime(win.time)}</span></div>
      <div class="crm-won-history-client"><small>Oportunidad</small><strong>${escapeHtml(win.company)}</strong><span>${escapeHtml(win.segment || "Sin producto registrado")}</span></div>
      <div class="crm-won-history-result"><small>Monto ganado</small><strong>${formatMoney(win.amount)}</strong></div>
      <div class="crm-won-history-seller"><small>Vendedor</small><strong>${escapeHtml(win.seller || "Sin vendedor")}</strong></div>
      <div class="crm-won-history-documents" aria-label="Documentos asociados">
        <button type="button" class="crm-won-doc-action is-quotation" data-crm-won-quotation="${escapeHtml(win.id)}" data-crm-won-quotation-id="${escapeHtml(quotation?.id || "")}" title="${quotation ? "Ver o editar cotización" : "Sin cotización asociada"}" ${quotation ? "" : "disabled"} aria-label="${quotation ? "Ver cotización" : "Sin cotización asociada"}">📄<span>Cotización</span></button>
        <button type="button" class="crm-won-doc-action is-order ${detailOrder ? "is-ready" : ""}" data-crm-won-order="${escapeHtml(win.id)}" title="${detailOrder ? "Ver, editar o imprimir orden" : quotation ? "Crear orden desde cotización" : "Crear detalle de orden"}" aria-label="${detailOrder ? "Ver orden" : "Crear orden"}">📋<span>${detailOrder ? "Orden" : "Crear orden"}</span></button>
      </div>
    </article>
  `;
  }).join("");
  return `
    <section class="crm-shell crm-original-module">
      <section class="crm-panel crm-tracking-overview">
        <div class="crm-module-head">
          <div>
            <span class="eyebrow">Seguimiento individual</span>
            <h3>${escapeHtml(selectedSeller?.name || "Selecciona vendedor")}</h3>
            <p>Vista enfocada por vendedor, estatus y etapa.</p>
          </div>
          <button class="primary-btn" type="button" data-crm-new>Abrir oportunidad</button>
        </div>
        <div class="crm-tracking-metrics crm-tracking-metrics-reconciled">
          <div><span>Vigentes</span><strong>${activeOpportunities.length}</strong></div>
          <div><span>Valor vendedor</span><strong>${formatMoney(activeValue)}</strong></div>
          <div class="crm-global-reconciliation"><span>${linkedSellerId ? "Pipeline personal" : "Pipeline global conciliado"}</span><strong>${formatMoney(globalActiveValue)}</strong><small>${globalActiveOpportunities.length} oportunidades</small></div>
          <div><span>Ganadas</span><strong>${formatMoney(wonValue)}</strong></div>
          <div><span>Conversion</span><strong>${conversion}%</strong></div>
        </div>
      </section>
      <div class="crm-tracking-layout crm-tracking-layout-refined">
        <aside class="crm-panel crm-tracking-sidebar">
          <span class="eyebrow">Vendedores</span>
          <div class="crm-seller-chip-list">${sellerButtons || `<div class="empty-state">No hay vendedores con oportunidades registradas.</div>`}</div>
        </aside>
        <section class="crm-tracking-main">
          <div class="crm-tracking-view-tabs" role="tablist" aria-label="Vistas de seguimiento">
            <button type="button" role="tab" data-crm-tracking-view="active" aria-selected="${state.crmTrackingView === "active"}" class="${state.crmTrackingView === "active" ? "is-active" : ""}">Vigentes y migradas <span>${visibleOpportunities.length}</span></button>
            <button type="button" role="tab" data-crm-tracking-view="won" aria-selected="${state.crmTrackingView === "won"}" class="${state.crmTrackingView === "won" ? "is-active" : ""}">Histórico de ganadas <span>${resultWins.length}</span></button>
          </div>
          ${state.crmTrackingView === "won" ? `
            <section class="crm-won-history-panel">
              <div class="crm-won-history-toolbar">
                <div><span class="eyebrow">Histórico comercial</span><strong>${filteredWins.length} cierres ganados · ${formatMoney(filteredWins.reduce((sum, win) => sum + win.amount, 0))}</strong></div>
                <div class="crm-won-date-filters">
                  <label>Desde<input type="date" data-crm-won-date-from value="${state.crmWonDateFrom}"></label>
                  <label>Hasta<input type="date" data-crm-won-date-to value="${state.crmWonDateTo}"></label>
                  <button type="button" data-crm-won-date-clear>Limpiar</button>
                </div>
              </div>
              <div class="crm-won-history-list crm-won-history-table">
                <div class="crm-won-history-head" aria-hidden="true"><span>Fecha</span><span>Oportunidad</span><span>Monto ganado</span><span>Vendedor</span><span>Documentos</span></div>
                ${wonHistoryCards || `<div class="empty-state">No hay oportunidades ganadas en el rango seleccionado.</div>`}
              </div>
            </section>
          ` : `
            <label class="opportunity-search crm-tracking-search">
              <span aria-hidden="true">⌕</span>
              <input type="search" data-crm-tracking-search value="${escapeHtml(state.crmSearch)}" placeholder="Buscar empresa, etapa, estatus o producto..." autocomplete="off">
            </label>
            <div class="crm-tracking-grid crm-tracking-list">
              <div class="crm-tracking-list-head" aria-hidden="true"><span>Etapa</span><span>Empresa / oportunidad</span><span>Monto</span><span>Cierre</span><span>Estado</span><span>Acciones</span></div>
              ${opportunityCards || `<div class="empty-state">No hay oportunidades para este filtro.</div>`}
            </div>
          `}
        </section>
      </div>
    </section>
  `;
}

function renderCrmAgenda() {
  const data = crmData();
  const sellers = crmSellersWithOpportunityMovement();
  const linkedSellerId = crmLinkedSellerId();
  const agenda = data.agenda.slice(0, 80);
  const slots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
  const date = state.crmAgendaDate || new Date().toISOString().slice(0, 10);
  const selectedSellerId = linkedSellerId || state.crmSellerId || "all";
  const selectedSeller = sellers.find((seller) => seller.id === selectedSellerId);
  const dayItems = agenda.filter((item) => item.date === date);
  const visibleDayItems = dayItems.filter((item) => selectedSellerId === "all" || item.ownerId === selectedSellerId);
  const availableCount = Math.max(0, sellers.length * slots.length - dayItems.length);
  const sellerRail = [
    linkedSellerId ? "" : `
      <button class="crm-seller-chip ${selectedSellerId === "all" ? "is-active" : ""}" type="button" data-crm-seller-only="all">
        <strong>Todos los vendedores</strong>
        <span>${dayItems.length} programadas · ${availableCount} libres</span>
      </button>
    `,
    ...sellers.map((seller) => {
    const items = dayItems.filter((item) => item.ownerId === seller.id);
    return `
      <button class="crm-seller-chip ${seller.id === selectedSellerId ? "is-active" : ""}" type="button" data-crm-seller-only="${seller.id}">
        <strong>${escapeHtml(seller.name)}</strong>
        <span>${items.length} programadas · ${Math.max(0, slots.length - items.length)} libres</span>
      </button>
    `;
  })
  ].join("");
  const timeline = slots.map((slot) => {
    const slotItems = visibleDayItems.filter((item) => String(item.time || "").slice(0, 2) === slot.slice(0, 2));
    const availableSellers = selectedSeller ? [selectedSeller] : sellers.filter((seller) => !slotItems.some((item) => item.ownerId === seller.id));
    return `
      <article class="crm-agenda-hour">
        <div><strong>${slot}</strong><span>${slotItems.length ? `${slotItems.length} actividades` : "Sin actividades"}</span></div>
        <section>
          ${slotItems.filter((item) => crmMatchesSearch(item.opportunity || {}, item.owner)).map((item) => `
            <article class="crm-agenda-visit" data-crm-opportunity="${item.opportunityId}">
              <strong>${escapeHtml(item.opportunity?.company || "Sin cliente")}</strong>
              <span>${escapeHtml(item.owner?.name || crmOwnerName(item.ownerId))} · ${escapeHtml(item.type || "Gestion")}</span>
              <em>${escapeHtml(item.place || item.status || "Por definir")}</em>
              <div class="crm-agenda-actions">
                <button type="button" data-crm-agenda-status="${item.id}:En visita">Iniciar</button>
                <button type="button" data-crm-agenda-status="${item.id}:Realizada">OK</button>
              </div>
            </article>
          `).join("") || `
            <div class="crm-open-slot">
              <strong>Sin actividades programadas</strong>
              <span>Horario libre para asignar visitas o llamadas.</span>
              <em>${availableSellers.length} vendedores disponibles</em>
            </div>
          `}
        </section>
      </article>
    `;
  }).join("");
  return `
    <section class="crm-shell crm-original-module">
      <section class="crm-panel crm-agenda-hero">
        <div class="crm-module-head">
          <div>
            <span class="eyebrow">${linkedSellerId ? "Agenda personal" : "Agenda integral"}</span>
            <h3>${linkedSellerId ? `Disponibilidad por hora de ${escapeHtml(selectedSeller?.name || "vendedor")}` : "Disponibilidad por hora de todos los vendedores"}</h3>
            <p>${linkedSellerId ? "Visitas, llamadas y espacios disponibles asignados a tu usuario." : "Vista unificada para detectar espacios libres, visitas programadas y carga diaria."}</p>
          </div>
          <div class="crm-agenda-datebar">
            <button class="primary-btn" type="button" data-crm-agenda-today>Hoy</button>
            <span class="crm-total-pill">Calendario&nbsp; ${escapeHtml(date)}</span>
          </div>
        </div>
        <div class="crm-tracking-metrics">
          <div><span>Fecha</span><strong>${escapeHtml(date)}</strong></div>
          <div><span>Programadas</span><strong>${visibleDayItems.length}</strong></div>
          <div><span>Disponibles</span><strong>${selectedSeller ? Math.max(0, slots.length - visibleDayItems.length) : availableCount}</strong></div>
          <div><span>Vendedores</span><strong>${sellers.length}</strong></div>
        </div>
      </section>
      <div class="crm-agenda-layout">
        <aside class="crm-panel crm-tracking-sidebar">
          <span class="eyebrow">Equipo</span>
          <div class="crm-seller-chip-list">${sellerRail}</div>
        </aside>
        <section class="crm-panel crm-agenda-main">
          <div class="crm-module-head compact">
            <div>
              <span class="eyebrow">Bitacora por hora</span>
              <h3>${selectedSeller ? escapeHtml(selectedSeller.name) : "Agenda integral del equipo"}</h3>
            </div>
            <span class="crm-total-pill">${escapeHtml(date)}</span>
          </div>
          <div class="crm-agenda-timeline">${timeline}</div>
        </section>
      </div>
    </section>
  `;
}

function renderCrmResponses() {
  const data = crmData();
  const responses = [
    ...data.gestiones,
    ...data.agenda
      .filter((item) => item.status === "Programada")
      .map((item) => ({
        id: `pending-${item.id}`,
        date: item.date,
        time: item.time,
        type: item.type || "Seguimiento",
        status: "Pendiente",
        company: item.opportunity?.company,
        owner: item.owner,
        note: item.place
      }))
  ].filter((item) => crmMatchesSearch(item.opportunity || { company: item.company, status: item.status }, item.owner)).slice(0, 80);
  return `
    <section class="crm-shell crm-original-module">
      <section class="crm-panel">
        <div class="crm-module-head">
          <div>
            <span class="eyebrow">Respuestas</span>
            <h3>Bandeja de compromisos y respuestas</h3>
            <p>Filas tipo correo: vendedor, cliente, compromiso, respuesta, nota, ubicacion, fecha y estado.</p>
          </div>
          <span class="crm-total-pill">${responses.length} registros</span>
        </div>
        <div class="crm-mail-table">
          <div class="crm-mail-row crm-mail-head"><span>De</span><span>Cliente</span><span>Compromiso</span><span>Respuesta</span><span>Nota</span><span>Fecha</span><span>Estado</span></div>
          ${responses.map((item) => `
            <article class="crm-mail-row">
              <strong>${escapeHtml(item.owner?.name || crmOwnerName(item.ownerId))}</strong>
              <span>${escapeHtml(item.company || item.opportunity?.company || "Sin cliente")}</span>
              <span>${escapeHtml(item.type || "Gestion")}</span>
              <span>${escapeHtml(item.result || "Sin respuesta")}</span>
              <span>${escapeHtml(item.note || "Sin nota registrada")}</span>
              <time>${escapeHtml(item.date || "")} ${escapeHtml(item.time || "")}</time>
              <em class="${item.status === "Realizada" ? "is-done" : "is-pending"}">${escapeHtml(item.status || "Pendiente")}</em>
            </article>
          `).join("") || `<div class="empty-state">No hay respuestas CRM.</div>`}
        </div>
      </section>
    </section>
  `;
}

function crmMasterCustomers(includeInactive = false) {
  return (crmData().customers || [])
    .filter((customer) => includeInactive || customer.active !== false)
    .sort((a, b) => String(a.commercialName || a.legalName).localeCompare(String(b.commercialName || b.legalName), "es"));
}

function refreshOpportunityCustomerOptions(selectedId = "", fallbackName = "") {
  if (!opportunityCustomerSearch) return;
  const customer = crmMasterCustomers(true).find((item) => String(item.id) === String(selectedId));
  opportunityCustomerId.value = customer?.id || "";
  opportunityCustomerSearch.value = customer
    ? (customer.commercialName || customer.legalName || "")
    : String(fallbackName || "").trim();
  closeOpportunityCustomerResults();
}

function opportunityCustomerMatches(customer, query) {
  return [customer.clientNumber, customer.commercialName, customer.legalName, customer.taxId, customer.contactName, customer.phone, customer.customerCode]
    .some((value) => normalizeKey(value || "").includes(query));
}

function closeOpportunityCustomerResults() {
  if (!opportunityCustomerResults) return;
  opportunityCustomerResults.hidden = true;
  opportunityCustomerSearch?.setAttribute("aria-expanded", "false");
}

function renderOpportunityCustomerResults(search = "", showAll = false) {
  if (!opportunityCustomerResults) return;
  const query = normalizeKey(search);
  if (!query && !showAll) {
    closeOpportunityCustomerResults();
    return;
  }
  const matches = crmMasterCustomers().filter((customer) => !query || opportunityCustomerMatches(customer, query));
  const visible = matches.slice(0, 10);
  opportunityCustomerResults.innerHTML = `${visible.map((customer) => `
    <button type="button" role="option" data-opportunity-customer="${escapeHtml(customer.id)}">
      <span><strong>${escapeHtml(customer.commercialName || customer.legalName)}</strong><small>${escapeHtml(customer.legalName && customer.legalName !== customer.commercialName ? customer.legalName : customer.contactName || "Contacto pendiente")}</small></span>
          <em>${escapeHtml(`ID ${customer.clientNumber || "—"} · ${customer.taxId || customer.customerCode || "Sin identificación"}`)}</em>
    </button>`).join("") || `<div class="crm-customer-combobox-empty">No encontramos clientes con ese criterio.</div>`}
    ${matches.length > visible.length ? `<small class="crm-customer-combobox-more">Mostrando 10 de ${matches.length}. Escribe más para precisar.</small>` : ""}`;
  opportunityCustomerResults.hidden = false;
  opportunityCustomerSearch.setAttribute("aria-expanded", "true");
}

function inheritCustomerInOpportunity(customerId) {
  const customer = crmMasterCustomers(true).find((item) => String(item.id) === String(customerId));
  opportunityCustomerId.value = customer?.id || "";
  if (!customer) return;
  opportunityCompany.value = customer.commercialName || customer.legalName || "";
  opportunityContact.value = customer.contactName || customer.manager || "";
  opportunityPhone.value = customer.phone || "";
  ensureSelectOption(opportunitySegment, customer.businessActivity || customer.businessLine || "");
  ensureSelectOption(opportunityLocation, customer.address || customer.department || "");
}

function ensureOpportunityCustomerDirectoryDialog() {
  let dialog = document.getElementById("opportunityCustomerDirectoryDialog");
  if (dialog) return dialog;

  dialog = document.createElement("dialog");
  dialog.id = "opportunityCustomerDirectoryDialog";
  dialog.className = "crm-customer-directory-dialog";
  dialog.innerHTML = `
    <section class="crm-customer-directory-card">
      <header class="crm-customer-directory-head">
        <div>
          <span>DIRECTORIO COMERCIAL</span>
          <h2>Clientes registrados</h2>
          <p>Seleccione un cliente para heredar sus datos o cierre la ventana y escriba un nombre libre.</p>
        </div>
        <button type="button" class="crm-customer-directory-close" aria-label="Cerrar">×</button>
      </header>
      <div class="crm-customer-directory-search">
        <span aria-hidden="true">⌕</span>
        <input type="search" placeholder="Buscar por nombre, ID, NIT o contacto..." aria-label="Buscar clientes">
      </div>
      <div class="crm-customer-directory-results"></div>
    </section>`;
  document.body.appendChild(dialog);

  dialog.querySelector(".crm-customer-directory-close")?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.querySelector("input")?.addEventListener("input", (event) => {
    renderOpportunityCustomerDirectory(event.target.value);
  });
  dialog.querySelector(".crm-customer-directory-results")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-customer-id]");
    if (!button) return;
    const customerId = button.dataset.customerId;
    inheritCustomerInOpportunity(customerId);
    refreshOpportunityCustomerOptions(customerId);
    dialog.close();
  });
  return dialog;
}

function renderOpportunityCustomerDirectory(search = "") {
  const dialog = ensureOpportunityCustomerDirectoryDialog();
  const results = dialog.querySelector(".crm-customer-directory-results");
  const customers = crmMasterCustomers(true)
    .filter((customer) => opportunityCustomerMatches(customer, search))
    .sort((left, right) => {
      const numberDifference = Number(left.clientNumber || 0) - Number(right.clientNumber || 0);
      if (numberDifference) return numberDifference;
      return String(left.commercialName || left.legalName || "").localeCompare(
        String(right.commercialName || right.legalName || ""),
        "es",
        { sensitivity: "base" }
      );
    });

  results.innerHTML = customers.length
    ? customers.map((customer) => `
        <article class="crm-customer-directory-row">
          <div class="crm-customer-directory-id">${escapeHtml(String(customer.clientNumber || "").padStart(4, "0"))}</div>
          <div>
            <strong>${escapeHtml(customer.commercialName || customer.legalName || "Cliente sin nombre")}</strong>
            <small>${escapeHtml(customer.contactName || "Sin contacto")} · ${escapeHtml(customer.nit || "Sin NIT")}</small>
          </div>
          <button type="button" data-customer-id="${escapeHtml(customer.id)}">Seleccionar</button>
        </article>`).join("")
    : `<div class="crm-customer-directory-empty">No hay clientes que coincidan con la búsqueda.</div>`;
}

function openOpportunityCustomerDirectory() {
  const dialog = ensureOpportunityCustomerDirectoryDialog();
  const search = dialog.querySelector("input");
  if (search) search.value = "";
  renderOpportunityCustomerDirectory();
  if (!dialog.open) dialog.showModal();
  window.setTimeout(() => search?.focus(), 0);
}

function ensureCrmCustomerDialog() {
  let dialog = document.querySelector("#crmCustomerDialog");
  if (dialog) return dialog;
  dialog = document.createElement("dialog");
  dialog.id = "crmCustomerDialog";
  dialog.className = "crm-customer-dialog";
  dialog.innerHTML = `<form class="dialog-card crm-customer-glass" id="crmCustomerForm">
    <header class="crm-customer-dialog-head"><div><p class="eyebrow">Maestro comercial</p><h3 id="crmCustomerDialogTitle">Nuevo cliente</h3><p>Centraliza la información que heredarán oportunidades, cotizaciones y pedidos.</p></div><button type="button" class="crm-customer-close" data-customer-close aria-label="Cerrar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></header>
    <input type="hidden" id="crmCustomerId">
    <div class="crm-customer-dialog-body">
      <section class="crm-customer-form-section"><div class="crm-customer-section-title"><span>01</span><div><strong>Identidad del cliente</strong><small>Datos principales para reconocerlo en todo el sistema.</small></div></div><div class="crm-customer-fields">
        <label>Nombre comercial <em>*</em><input id="crmCustomerCommercialName" maxlength="120" placeholder="Ej. Industrias Konfi" required></label>
        <label>Razón social<input id="crmCustomerLegalName" maxlength="160" placeholder="Nombre legal de la empresa"></label>
        <label>Código de cliente<input id="crmCustomerCode" maxlength="40" placeholder="Código interno (opcional)"></label>
        <label>Tipo de cliente<input id="crmCustomerType" maxlength="80" placeholder="Empresa privada, gobierno..."></label>
      </div></section>
      <section class="crm-customer-form-section"><div class="crm-customer-section-title"><span>02</span><div><strong>Contacto</strong><small>Persona y canales para dar seguimiento comercial.</small></div></div><div class="crm-customer-fields">
        <label>Contacto principal<input id="crmCustomerContact" maxlength="100" placeholder="Nombre completo"></label>
        <label>Teléfono<input id="crmCustomerPhone" maxlength="30" placeholder="0000-0000"></label>
        <label class="span-2">Correo<input id="crmCustomerEmail" type="email" maxlength="120" placeholder="contacto@empresa.com"></label>
      </div></section>
      <section class="crm-customer-form-section"><div class="crm-customer-section-title"><span>03</span><div><strong>Información fiscal</strong><small>Identificación para cotizaciones y documentación.</small></div></div><div class="crm-customer-fields">
        <label>NIT / identificación fiscal<input id="crmCustomerTaxId" maxlength="40" placeholder="Número de identificación"></label>
        <label>NRC / registro<input id="crmCustomerRegistration" maxlength="40" placeholder="Número de registro"></label>
        <label>Tipo de contribuyente<input id="crmCustomerTaxpayerType" maxlength="80" placeholder="Grande, mediano, otro"></label>
        <label>Giro / actividad económica<input id="crmCustomerBusiness" maxlength="120" placeholder="Actividad principal"></label>
      </div></section>
      <section class="crm-customer-form-section"><div class="crm-customer-section-title"><span>04</span><div><strong>Operación comercial</strong><small>Información reutilizable en órdenes y pedidos.</small></div></div><div class="crm-customer-fields">
        <label class="span-2">Dirección<input id="crmCustomerAddress" maxlength="220" placeholder="Dirección completa"></label>
        <label>Departamento / municipio<input id="crmCustomerDepartment" maxlength="100" placeholder="Ubicación"></label>
        <label>Condiciones de pago<input id="crmCustomerTerms" maxlength="160" placeholder="Ej. crédito a 30 días"></label>
        <label class="span-2">Estrategia comercial<input id="crmCustomerStrategy" maxlength="100" placeholder="Enfoque o estrategia asignada"></label>
      </div></section>
    </div>
    <footer class="crm-customer-dialog-actions"><span><i></i> Los datos se reutilizan automáticamente</span><div><button type="button" class="ghost-btn" data-customer-close>Cancelar</button><button type="submit" class="primary-btn">Guardar cliente</button></div></footer>
  </form>`;
  document.body.appendChild(dialog);
  dialog.querySelectorAll("[data-customer-close]").forEach((button) => button.addEventListener("click", () => dialog.close()));
  dialog.querySelector("#crmCustomerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = dialog.querySelector("#crmCustomerId").value;
    const value = (selector) => dialog.querySelector(selector).value.trim();
    const payload = {
      commercialName: value("#crmCustomerCommercialName"), legalName: value("#crmCustomerLegalName"),
      customerCode: value("#crmCustomerCode"), taxId: value("#crmCustomerTaxId"), registrationNumber: value("#crmCustomerRegistration"),
      taxpayerType: value("#crmCustomerTaxpayerType"), contactName: value("#crmCustomerContact"), phone: value("#crmCustomerPhone"),
      email: value("#crmCustomerEmail"), businessActivity: value("#crmCustomerBusiness"), address: value("#crmCustomerAddress"),
      department: value("#crmCustomerDepartment"), clientType: value("#crmCustomerType"), paymentTerms: value("#crmCustomerTerms"), strategy: value("#crmCustomerStrategy")
    };
    try {
      const response = await crmApi(id ? `/customers/${encodeURIComponent(id)}` : "/customers", { method: id ? "PATCH" : "POST", body: JSON.stringify(payload) });
      const returnToDirectOrder = dialog.dataset.returnToDirectOrder === "true";
      dialog.dataset.returnToDirectOrder = "false";
      dialog.close();
      refreshOpportunityCustomerOptions(response.selectedCustomerId || id);
      if (opportunityDialog.open && response.selectedCustomerId) inheritCustomerInOpportunity(response.selectedCustomerId);
      renderCurrentArea();
      if (returnToDirectOrder) {
        await loadCrmData();
        openDirectOrderFlow();
      }
    } catch (error) { alert(error.message || "No fue posible guardar el cliente."); }
  });
  return dialog;
}

function openCrmCustomerDialog(customer = {}) {
  const dialog = ensureCrmCustomerDialog();
  const set = (selector, value) => { dialog.querySelector(selector).value = value || ""; };
  set("#crmCustomerId", customer.id); set("#crmCustomerCommercialName", customer.commercialName); set("#crmCustomerLegalName", customer.legalName);
  set("#crmCustomerCode", customer.customerCode); set("#crmCustomerTaxId", customer.taxId); set("#crmCustomerRegistration", customer.registrationNumber);
  set("#crmCustomerTaxpayerType", customer.taxpayerType); set("#crmCustomerContact", customer.contactName || customer.manager); set("#crmCustomerPhone", customer.phone);
  set("#crmCustomerEmail", customer.email); set("#crmCustomerBusiness", customer.businessActivity || customer.businessLine); set("#crmCustomerAddress", customer.address);
  set("#crmCustomerDepartment", customer.department); set("#crmCustomerType", customer.clientType); set("#crmCustomerTerms", customer.paymentTerms); set("#crmCustomerStrategy", customer.strategy);
  dialog.querySelector("#crmCustomerDialogTitle").textContent = customer.id ? "Editar cliente" : "Nuevo cliente";
  dialog.showModal();
}

function ensureDirectOrderCustomerDialog() {
  let dialog = document.querySelector("#directOrderCustomerDialog");
  if (dialog) return dialog;
  dialog = document.createElement("dialog");
  dialog.id = "directOrderCustomerDialog";
  dialog.className = "direct-order-customer-dialog";
  dialog.innerHTML = `<section class="direct-order-customer-card">
    <header><div><span>Pedido sin oportunidad</span><h3>Selecciona el cliente</h3><p>El sistema generará primero la cotización y luego la nota de pedido para autorización final.</p></div><button type="button" data-direct-order-close aria-label="Cerrar">×</button></header>
    <div class="direct-order-customer-toolbar"><label><span>⌕</span><input type="search" autocomplete="off" data-direct-order-customer-search placeholder="Buscar cliente, razón social, NIT o contacto..." aria-expanded="false"><button type="button" data-direct-order-customer-toggle aria-label="Mostrar clientes" title="Mostrar clientes">⌄</button></label><button type="button" data-direct-order-new-customer>+ Nuevo cliente</button></div>
    <div class="direct-order-customer-list" data-direct-order-customer-list hidden></div>
  </section>`;
  document.body.appendChild(dialog);
  dialog.querySelector("[data-direct-order-close]").addEventListener("click", () => dialog.close());
  dialog.querySelector("[data-direct-order-customer-search]").addEventListener("input", (event) => renderDirectOrderCustomers(event.target.value));
  dialog.querySelector("[data-direct-order-customer-search]").addEventListener("keydown", (event) => {
    const list = dialog.querySelector("[data-direct-order-customer-list]");
    if (event.key === "Escape") return hideDirectOrderCustomers(dialog);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (list.hidden) renderDirectOrderCustomers(event.currentTarget.value, true);
      list.querySelector("[data-direct-order-customer]")?.focus();
    }
  });
  dialog.querySelector("[data-direct-order-customer-toggle]").addEventListener("click", () => {
    const list = dialog.querySelector("[data-direct-order-customer-list]");
    if (!list.hidden) return hideDirectOrderCustomers(dialog);
    renderDirectOrderCustomers(dialog.querySelector("[data-direct-order-customer-search]").value, true);
  });
  dialog.querySelector("[data-direct-order-new-customer]").addEventListener("click", () => {
    dialog.close();
    const customerDialog = ensureCrmCustomerDialog();
    customerDialog.dataset.returnToDirectOrder = "true";
    openCrmCustomerDialog();
  });
  dialog.querySelector("[data-direct-order-customer-list]").addEventListener("click", (event) => {
    const button = event.target.closest("[data-direct-order-customer]");
    if (!button) return;
    const customer = crmMasterCustomers(true).find((item) => String(item.id) === String(button.dataset.directOrderCustomer));
    if (!customer) return;
    const seller = state.currentUser?.name || "Sistema Gerencial";
    const directOpportunity = {
      id: `direct-order:${customer.id}:${Date.now()}`,
      company: customer.commercialName || customer.legalName,
      seller,
      contact: customer.contactName || customer.manager || "",
      phone: customer.phone || "",
      location: customer.address || customer.department || "",
      customerId: customer.id,
      date: todayISO(),
      estimatedAmount: 0,
      quotationReferenceAmount: 0,
      stageId: "Pedido directo"
    };
    dialog.close();
    openQuotationDialog(directOpportunity.id, "", directOpportunity, customer, true);
  });
  return dialog;
}

function hideDirectOrderCustomers(dialog = ensureDirectOrderCustomerDialog()) {
  dialog.querySelector("[data-direct-order-customer-list]").hidden = true;
  dialog.querySelector("[data-direct-order-customer-search]").setAttribute("aria-expanded", "false");
}

function renderDirectOrderCustomers(search = "", showAll = false) {
  const dialog = ensureDirectOrderCustomerDialog();
  const query = normalizeKey(search);
  if (!query && !showAll) {
    hideDirectOrderCustomers(dialog);
    return;
  }
  const customers = crmMasterCustomers().filter((customer) => !query || [
    customer.commercialName, customer.legalName, customer.taxId, customer.contactName,
    customer.phone, customer.customerCode, customer.clientNumber
  ].some((value) => normalizeKey(value || "").includes(query)));
  const visible = customers.slice(0, 10);
  const list = dialog.querySelector("[data-direct-order-customer-list]");
  list.innerHTML = visible.map((customer) => `
    <button type="button" class="direct-order-customer-option" data-direct-order-customer="${escapeHtml(customer.id)}">
      <span><strong>${escapeHtml(customer.commercialName || customer.legalName)}</strong><small>${escapeHtml(customer.legalName && customer.legalName !== customer.commercialName ? customer.legalName : customer.contactName || "Contacto pendiente")}</small></span>
      <em>ID ${escapeHtml(customer.clientNumber || "—")} · ${escapeHtml(customer.taxId || customer.customerCode || "Sin código")}</em><b>Continuar →</b>
    </button>`).join("") || `<div class="direct-order-customer-empty">No encontramos clientes con ese criterio.</div>`;
  if (customers.length > visible.length) list.insertAdjacentHTML("beforeend", `<small class="direct-order-customer-more">Mostrando 10 de ${customers.length}. Escribe más para precisar.</small>`);
  list.hidden = false;
  dialog.querySelector("[data-direct-order-customer-search]").setAttribute("aria-expanded", "true");
}

function openDirectOrderFlow() {
  const dialog = ensureDirectOrderCustomerDialog();
  const search = dialog.querySelector("[data-direct-order-customer-search]");
  search.value = "";
  hideDirectOrderCustomers(dialog);
  dialog.showModal();
  requestAnimationFrame(() => search.focus());
}

function renderCrmClients() {
  const allClients = crmMasterCustomers(true);
  const query = normalizeKey(state.crmCustomerSearch || "");
  const status = state.crmCustomerStatus || "active";
  const clientSequenceValue = (client) => {
    const sequence = Number.parseInt(String(client.clientNumber || "").replace(/\D/g, ""), 10);
    return Number.isFinite(sequence) ? sequence : Number.MAX_SAFE_INTEGER;
  };
  const searchable = (client) => [
    client.clientNumber, client.customerCode, client.commercialName, client.legalName, client.contactName,
    client.manager, client.phone, client.email, client.taxId, client.registrationNumber,
    client.address, client.department, client.businessActivity, client.clientType
  ].some((value) => normalizeKey(value || "").includes(query));
  const clients = allClients
    .filter((client) => {
      const matchesStatus = status === "all" || (status === "active" ? client.active !== false : client.active === false);
      return matchesStatus && (!query || searchable(client));
    })
    .sort((left, right) => {
      const sequenceDifference = clientSequenceValue(left) - clientSequenceValue(right);
      if (sequenceDifference !== 0) return sequenceDifference;
      return String(left.commercialName || left.legalName || "").localeCompare(
        String(right.commercialName || right.legalName || ""),
        "es",
        { sensitivity: "base" }
      );
    });
  const requiredFields = ["commercialName", "legalName", "contactName", "phone", "email", "taxId", "businessActivity", "address", "department", "paymentTerms"];
  const completeness = (client) => Math.round(requiredFields.filter((field) => String(client[field] || "").trim()).length / requiredFields.length * 100);
  const pageSize = 8;
  const pageCount = Math.max(1, Math.ceil(clients.length / pageSize));
  state.crmCustomerPage = Math.min(Math.max(1, state.crmCustomerPage || 1), pageCount);
  const pageStart = (state.crmCustomerPage - 1) * pageSize;
  const pageRows = clients.slice(pageStart, pageStart + pageSize);
  const activeCount = allClients.filter((client) => client.active !== false).length;
  const completeCount = allClients.filter((client) => client.active !== false && completeness(client) >= 80).length;
  const archivedCount = allClients.filter((client) => client.active === false).length;
  return `
    <section class="crm-shell crm-customers-module">
      <header class="crm-customers-hero crm-customers-compact-head">
        <div><p class="eyebrow">Directorio comercial</p><h3>Maestro de clientes</h3></div>
        <div class="crm-customer-metrics" aria-label="Resumen de clientes">
          <span><b>${activeCount}</b> activos</span>
          <span><b>${completeCount}</b> completos</span>
          <span><b>${archivedCount}</b> archivados</span>
        </div>
        <button class="primary-btn" type="button" data-crm-customer-new>+ Nuevo cliente</button>
      </header>
      <div class="crm-customer-toolbar">
        <label class="crm-customer-search"><span aria-hidden="true">⌕</span><input type="search" data-crm-customer-search value="${escapeHtml(state.crmCustomerSearch || "")}" placeholder="Buscar ID, cliente, contacto, NIT, teléfono o ubicación..."></label>
        <label class="crm-customer-filter">Estado<select data-crm-customer-status><option value="active" ${status === "active" ? "selected" : ""}>Activos</option><option value="archived" ${status === "archived" ? "selected" : ""}>Archivados</option><option value="all" ${status === "all" ? "selected" : ""}>Todos</option></select></label>
        <div class="crm-customer-result"><strong>${clients.length}</strong><span>clientes</span></div>
      </div>
      <div class="crm-customer-table-wrap"><div class="crm-customer-table">
        <div class="crm-customer-row crm-customer-head"><span>ID cliente</span><span>Cliente</span><span>Contacto</span><span>Ubicación</span><span>Acciones</span></div>
        ${pageRows.map((client) => `
          <article class="crm-customer-row">
            <span class="crm-customer-number"><strong>${escapeHtml(client.clientNumber || "—")}</strong></span>
            <span class="crm-customer-name"><strong>${escapeHtml(client.commercialName || client.legalName)}</strong><small>${escapeHtml(client.legalName && client.legalName !== client.commercialName ? client.legalName : (client.customerCode || "Sin código"))}</small></span>
            <span><strong>${escapeHtml(client.contactName || client.manager || "Sin contacto")}</strong><small>${escapeHtml(client.phone || client.email || "Sin dato de contacto")}</small></span>
            <span><strong>${escapeHtml(client.department || "Sin ubicación")}</strong><small>${escapeHtml(client.businessActivity || client.clientType || "Actividad pendiente")}</small></span>
            <span class="crm-row-actions">
              <button type="button" data-crm-customer-edit="${escapeHtml(client.id)}" aria-label="Ver o editar cliente" title="Ver o editar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4l10.5-10.5a2.8 2.8 0 0 0-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/></svg></button>
              ${client.active === false ? `<button type="button" data-crm-customer-restore="${escapeHtml(client.id)}" aria-label="Restaurar cliente" title="Restaurar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4v6h6"/><path d="M5.5 15a8 8 0 1 0 1.8-8.3L4 10"/></svg></button>` : `<button class="danger" type="button" data-crm-customer-delete="${escapeHtml(client.id)}" aria-label="Archivar cliente" title="Archivar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="m7 7 1 13h8l1-13"/><path d="M10 11v5M14 11v5"/></svg></button>`}
            </span>
          </article>
        `).join("") || `<div class="empty-state">No hay clientes que coincidan con esta vista.</div>`}
      </div></div>
      <footer class="crm-customer-pagination"><span>Mostrando ${clients.length ? pageStart + 1 : 0}-${Math.min(pageStart + pageSize, clients.length)} de ${clients.length}</span><div><button type="button" data-crm-customer-page="${state.crmCustomerPage - 1}" ${state.crmCustomerPage <= 1 ? "disabled" : ""}>Anterior</button><strong>Página ${state.crmCustomerPage} de ${pageCount}</strong><button type="button" data-crm-customer-page="${state.crmCustomerPage + 1}" ${state.crmCustomerPage >= pageCount ? "disabled" : ""}>Siguiente</button></div></footer>
    </section>
  `;
}

function renderCrmModule(submenuKey) {
  if (!state.crmData) {
    loadCrmData();
    return `<div class="empty-state">Cargando CRM comercial...</div>`;
  }
  const views = {
    crm: renderCrmDashboard,
    "crm-seguimiento": renderCrmTracking,
    "crm-agenda": renderCrmAgenda,
    "crm-respuestas": renderCrmResponses,
    "crm-clientes": renderCrmClients
  };
  return (views[submenuKey] || renderCrmDashboard)();
}


function opportunityManagementReportRows(options = {}) {
  const { active, history } = opportunityCycleRows(getOpportunitySubmenu().items);
  const query = normalizeKey(options.query || "");
  const matchesSearch = ({ item, result }) => !query || [
    item.date, item.company, item.seller, item.contact, item.phone, item.segment, item.location,
    item.stage, item.priority, probabilityLabel(item.probability), item.amount, item.nextAction,
    item.agendaDate, item.agendaType, item.agendaPlace, item.note, result?.result, result?.comment
  ].some((value) => searchTokenMatches(value, query));
  const statusRows = options.status === "active" ? active : options.status === "closed" ? history : [...active, ...history];
  return statusRows.filter((row) => {
    const closedDate = row.result?.date || row.item.date || "";
    const matchesDate = (!options.dateFrom || closedDate >= options.dateFrom) && (!options.dateTo || closedDate <= options.dateTo);
    const matchesResult = !options.result || options.result === "all"
      || (options.result === "won" && row.result?.result === "ganado")
      || (options.result === "lost" && row.result && row.result.result !== "ganado")
      || (options.result === "pending" && !row.result);
    const matchesAmount = (!options.amountMin || Number(row.item.amount || 0) >= Number(options.amountMin))
      && (!options.amountMax || Number(row.item.amount || 0) <= Number(options.amountMax));
    return matchesDate && matchesResult && matchesAmount && matchesSearch(row)
      && (!options.seller || row.item.seller === options.seller)
      && (!options.stage || row.item.stage === options.stage)
      && (!options.temperature || row.item.probability === options.temperature)
      && (!options.priority || row.item.priority === options.priority);
  });
}

function printOpportunityManagementReport(options = {}) {
  const rows = opportunityManagementReportRows(options);
  const isClosed = options.status === "closed";
  const amount = rows.reduce((sum, row) => sum + Number(row.item.amount || 0), 0);
  const sellerSubtotals = Object.values(rows.reduce((groups, row) => {
    const seller = row.item.seller || "Sin vendedor";
    const current = groups[seller] || { seller, count: 0, amount: 0 };
    const opportunityAmount = Number(row.item.amount || 0);
    current.count += 1;
    current.amount += opportunityAmount;
    groups[seller] = current;
    return groups;
  }, {})).sort((a, b) => b.amount - a.amount || a.seller.localeCompare(b.seller, "es"));
  const sellerSubtotalRows = sellerSubtotals.map((row) => `<tr><td>${escapeHtml(row.seller)}</td><td>${row.count}</td><td class="money">${formatMoney(row.amount)}</td></tr>`).join("");
  const temperatureOrder = ["caliente", "tibio", "frio", "congelado", "sin-definir"];
  const temperatureSubtotals = rows.reduce((groups, row) => {
    const key = temperatureOrder.includes(row.item.probability) ? row.item.probability : "sin-definir";
    groups[key].count += 1;
    groups[key].amount += Number(row.item.amount || 0);
    return groups;
  }, Object.fromEntries(temperatureOrder.map((key) => [key, { count: 0, amount: 0 }])));
  const temperatureSubtotalRows = temperatureOrder.map((key) => {
    const subtotal = temperatureSubtotals[key];
    const label = key === "sin-definir" ? "Sin definir" : probabilityLabel(key);
    return `<tr><td>${escapeHtml(label)}</td><td>${subtotal.count}</td><td class="money">${formatMoney(subtotal.amount)}</td></tr>`;
  }).join("");
  const won = rows.filter((row) => row.result?.result === "ganado");
  const wonAmount = won.reduce((sum, row) => sum + Number(row.item.amount || 0), 0);
  const groupSummary = (key, label) => Object.entries(rows.reduce((groups, row) => {
    const value = label(row.item[key], row) || "Sin definir";
    groups[value] = (groups[value] || 0) + 1;
    return groups;
  }, {})).sort((a, b) => b[1] - a[1]).map(([name, count]) => `<li><span>${escapeHtml(name)}</span><strong>${count}</strong></li>`).join("");
  const generatedAt = new Intl.DateTimeFormat("es-SV", { dateStyle: "long", timeStyle: "short", timeZone: "America/El_Salvador" }).format(new Date());
  const reportRows = rows.map(({ item, result }, index) => {
    const latest = orderedManagements(normalizeManagements(item)).filter((management) => !management.canceled).at(-1) || {};
    const resultLabel = result?.result === "ganado" ? "Ganada" : result ? "Perdida" : "En venta";
    return `<tr><td>${index + 1}</td><td>${escapeHtml(formatDate(result?.date || item.date))}</td>
      <td><strong>${escapeHtml(item.company || "Sin empresa")}</strong><small>${escapeHtml(item.segment || "Sin producto")}</small></td>
      <td>${escapeHtml(item.seller || "Sin vendedor")}</td><td>${escapeHtml(item.stage || "Sin etapa")}</td>
      <td>${escapeHtml(probabilityLabel(item.probability))}</td><td>${escapeHtml(item.priority || "Sin definir")}</td>
      <td class="money">${formatMoney(item.amount || 0)}</td><td>${escapeHtml(resultLabel)}</td>
      <td><small><b>Contacto:</b> ${escapeHtml(item.contact || "—")} · ${escapeHtml(item.phone || "—")}</small>
      <small><b>Ubicación:</b> ${escapeHtml(item.location || "—")}</small>
      <small><b>Próxima acción:</b> ${escapeHtml(item.nextAction || "—")}</small>
      <small><b>Agenda:</b> ${escapeHtml([formatDate(item.agendaDate), formatTime(item.agendaTime), item.agendaType, item.agendaPlace].filter(Boolean).join(" · ") || "—")}</small>
      <small><b>Última gestión:</b> ${escapeHtml([formatDate(latest.date), latest.stage, latest.comment].filter(Boolean).join(" · ") || "—")}</small>
      <small><b>Observación:</b> ${escapeHtml(result?.comment || item.note || "—")}</small></td></tr>`;
  }).join("");
  const popup = window.open("", "_blank", "width=1280,height=900");
  if (!popup) return alert("El navegador bloqueó el reporte. Habilite las ventanas emergentes e intente nuevamente.");
  popup.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Reporte gerencial de oportunidades</title><style>
  :root{font-family:Arial,sans-serif;color:#18243a}*{box-sizing:border-box}body{margin:0;background:#eef2f6}.report{width:1180px;max-width:calc(100% - 32px);margin:24px auto;background:#fff;padding:38px;box-shadow:0 8px 28px #18243a22}.head{display:flex;justify-content:space-between;border-bottom:4px solid #22a98b;padding-bottom:18px}.head h1{margin:4px 0;font-size:28px}.head p,.head small{display:block;margin:3px 0;color:#5d6879}.brand{font-weight:900;font-size:24px}.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:22px 0}.card{border:1px solid #d8e0e9;border-radius:10px;padding:13px}.card span{display:block;text-transform:uppercase;font-size:10px;font-weight:800;color:#647184}.card strong{display:block;font-size:21px;margin-top:6px;color:#087f69}.subtotal-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:18px}.subtotal-box{border:1px solid #d8e0e9;border-radius:10px;padding:14px}.subtotal-box h2{font-size:14px;margin:0 0 9px}.subtotal-box table{font-size:10px}.subtotal-box th,.subtotal-box td{padding:7px}.subtotal-box tfoot td{font-weight:900;background:#eef7f5;color:#087f69}.groups{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-bottom:22px}.groups section{border:1px solid #d8e0e9;border-radius:10px;padding:14px}.groups h2{font-size:13px;margin:0 0 8px}.groups ul{list-style:none;padding:0;margin:0}.groups li{display:flex;justify-content:space-between;padding:5px 0;border-top:1px solid #edf0f4;font-size:11px}table{width:100%;border-collapse:collapse;font-size:9px}th{background:#162743;color:#fff;text-align:left;padding:8px 5px}td{vertical-align:top;border-bottom:1px solid #dce3eb;padding:8px 5px}td small{display:block;line-height:1.45;min-width:245px}.money{white-space:nowrap;font-weight:700}.empty{text-align:center;padding:35px;color:#687386}.footer{margin-top:18px;font-size:10px;color:#6b7482}.actions{position:sticky;bottom:0;display:flex;gap:10px;justify-content:center;padding:14px;background:#13233e}.actions button{border:0;border-radius:8px;padding:11px 18px;font-weight:800;cursor:pointer}.actions button:first-child{background:#39d6b5;color:#10243b}@page{size:landscape;margin:10mm}@media print{body{background:#fff}.report{width:auto;max-width:none;margin:0;padding:0;box-shadow:none}.actions{display:none}.head h1{font-size:22px}.cards{margin:12px 0}.subtotal-grid{gap:10px;margin-bottom:12px}.groups{margin-bottom:12px}tr{break-inside:avoid}}</style></head><body><main class="report">
  <header class="head"><div><div class="brand">KONFI</div><h1>Reporte gerencial de oportunidades</h1><p>${isClosed ? "Oportunidades cerradas" : options.status === "active" ? "Pipeline de oportunidades en venta" : "Reporte integral de oportunidades"}</p></div><div><small>Periodo: ${escapeHtml(state.period)}</small><small>Generado: ${escapeHtml(generatedAt)}</small><small>Usuario: ${escapeHtml(state.currentUser?.name || roleDisplayName())}</small></div></header>
  <section class="cards"><article class="card"><span>Registros</span><strong>${rows.length}</strong></article><article class="card"><span>Monto total</span><strong>${formatMoney(amount)}</strong></article><article class="card"><span>Ganadas</span><strong>${won.length}</strong></article><article class="card"><span>Monto ganado</span><strong>${formatMoney(wonAmount)}</strong></article></section>
  <section class="subtotal-grid">
    <section class="subtotal-box"><h2>Subtotales por vendedor</h2><table><thead><tr><th>Vendedor</th><th>Oportunidades</th><th>Monto total</th></tr></thead><tbody>${sellerSubtotalRows || `<tr><td colspan="3">Sin registros</td></tr>`}</tbody><tfoot><tr><td>Total general</td><td>${rows.length}</td><td class="money">${formatMoney(amount)}</td></tr></tfoot></table></section>
    <section class="subtotal-box"><h2>Totales por temperatura</h2><table><thead><tr><th>Categoría</th><th>Oportunidades</th><th>Monto total</th></tr></thead><tbody>${temperatureSubtotalRows}</tbody><tfoot><tr><td>Total general</td><td>${rows.length}</td><td class="money">${formatMoney(amount)}</td></tr></tfoot></table></section>
  </section>
  <section class="groups"><section><h2>Distribución por vendedor</h2><ul>${groupSummary("seller", (value) => value)}</ul></section><section><h2>Distribución por etapa</h2><ul>${groupSummary("stage", (value) => value)}</ul></section></section>
  <table><thead><tr><th>#</th><th>Fecha</th><th>Empresa / producto</th><th>Vendedor</th><th>Etapa</th><th>Temperatura</th><th>Prioridad</th><th>Monto</th><th>Estado</th><th>Detalle comercial</th></tr></thead><tbody>${reportRows || `<tr><td class="empty" colspan="10">No hay oportunidades que coincidan con los filtros actuales.</td></tr>`}</tbody></table>
  <p class="footer">Documento generado por Sistema Gerencial KONFI. Los montos y resultados corresponden a la información registrada al momento de emisión.</p></main><nav class="actions"><button onclick="window.print()">Imprimir / Guardar PDF</button><button onclick="window.close()">Cerrar</button></nav></body></html>`);
  popup.document.close();
}

function openOpportunityReportDialog() {
  document.querySelector("#opportunityReportDialog")?.remove();
  const items = getOpportunitySubmenu().items;
  const uniqueOptions = (values) => [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b), "es"));
  const optionMarkup = (values) => values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("");
  const dialog = document.createElement("dialog");
  dialog.id = "opportunityReportDialog";
  dialog.className = "opportunity-report-dialog";
  dialog.innerHTML = `<form method="dialog" class="opportunity-report-form">
    <header><div><span>Reporte gerencial</span><h3>Configurar reporte de oportunidades</h3><p>Seleccione las variables que desea incluir antes de imprimir o guardar en PDF.</p></div><button type="button" data-report-close aria-label="Cerrar">×</button></header>
    <div class="opportunity-report-filter-grid">
      <label><span>Estado de oportunidad</span><select name="status"><option value="all" ${state.opportunityMainStatusFilter === "all" ? "selected" : ""}>Todas</option><option value="active" ${state.opportunityMainStatusFilter === "active" ? "selected" : ""}>En venta / pendientes</option><option value="closed" ${state.opportunityMainStatusFilter === "closed" ? "selected" : ""}>Cerradas</option></select></label>
      <label><span>Resultado</span><select name="result"><option value="all" ${state.opportunityMainResultFilter === "all" ? "selected" : ""}>Todos</option><option value="pending" ${state.opportunityMainResultFilter === "pending" ? "selected" : ""}>Pendientes</option><option value="won" ${state.opportunityMainResultFilter === "won" ? "selected" : ""}>Ganadas</option><option value="lost" ${state.opportunityMainResultFilter === "lost" ? "selected" : ""}>Perdidas</option></select></label>
      <label><span>Desde</span><input type="date" name="dateFrom"></label><label><span>Hasta</span><input type="date" name="dateTo"></label>
      <label><span>Vendedor</span><select name="seller"><option value="">Todos</option>${optionMarkup(uniqueOptions(items.map((item) => item.seller)))}</select></label>
      <label><span>Etapa</span><select name="stage"><option value="">Todas</option>${optionMarkup(uniqueOptions(items.map((item) => item.stage)))}</select></label>
      <label><span>Temperatura</span><select name="temperature"><option value="">Todas</option><option value="caliente">Caliente</option><option value="tibio">Tibio</option><option value="frio">Frío</option><option value="congelado">Congelado</option></select></label>
      <label><span>Prioridad</span><select name="priority"><option value="">Todas</option>${optionMarkup(uniqueOptions(items.map((item) => item.priority)))}</select></label>
      <label><span>Monto mínimo</span><input type="number" name="amountMin" min="0" step="0.01" placeholder="$0.00"></label><label><span>Monto máximo</span><input type="number" name="amountMax" min="0" step="0.01" placeholder="Sin límite"></label>
      <label class="wide"><span>Buscar en el reporte</span><input type="search" name="query" value="${escapeHtml(state.opportunitySearch)}" placeholder="Empresa, producto, contacto, gestión..."></label>
    </div>
    <div class="opportunity-report-preview"><span data-report-count>0 oportunidades seleccionadas</span><strong data-report-total>${formatMoney(0)}</strong></div>
    <footer><button class="ghost-btn" type="button" data-report-reset>Limpiar filtros</button><button class="secondary-btn" type="button" data-report-close>Cancelar</button><button class="primary-btn" type="submit">Generar reporte</button></footer>
  </form>`;
  document.body.append(dialog);
  const form = dialog.querySelector("form");
  const values = () => Object.fromEntries(new FormData(form).entries());
  const refreshPreview = () => {
    const rows = opportunityManagementReportRows(values());
    dialog.querySelector("[data-report-count]").textContent = `${rows.length} ${rows.length === 1 ? "oportunidad seleccionada" : "oportunidades seleccionadas"}`;
    dialog.querySelector("[data-report-total]").textContent = formatMoney(rows.reduce((sum, row) => sum + Number(row.item.amount || 0), 0));
  };
  form.addEventListener("input", refreshPreview);
  form.addEventListener("submit", (event) => { event.preventDefault(); const filters = values(); dialog.close(); printOpportunityManagementReport(filters); });
  dialog.querySelectorAll("[data-report-close]").forEach((button) => button.addEventListener("click", () => dialog.close()));
  dialog.querySelector("[data-report-reset]").addEventListener("click", () => { form.reset(); form.elements.status.value = "all"; form.elements.result.value = "all"; refreshPreview(); });
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  dialog.showModal();
  refreshPreview();
}

function renderCommercialSubmenu(area) {
  if (!Array.isArray(area.submenus)) {
    commercialPanel.classList.add("hidden");
    return;
  }

  const submenu = area.submenus.find((item) => item.key === state.activeSubmenu) || area.submenus[0];
  commercialPanel.classList.remove("hidden");
  commercialPanel.classList.remove("opportunity-mode");
  commercialPanel.classList.remove("crm-opportunity-tabs");
  opportunityTotalAmount.classList.add("hidden");
  commercialSubmenuTitle.classList.remove("hidden");
  financialOrdersViewTabs?.classList.add("hidden");
  accountsReceivableViewTabs?.classList.add("hidden");
  purchaseOrdersViewTabs?.classList.add("hidden");
  crmOpportunitiesViewTabs?.classList.add("hidden");
  opportunitySearchField.classList.add("hidden");
  commercialSubmenuTitle.textContent = submenu.label;
  commercialSubmenuStatus.textContent = submenu.status;

  if (state.activeArea === "comercializacion" && submenu.key === "cotizaciones") {
    newOpportunityBtn.classList.add("hidden");
    newRiskBtn.classList.add("hidden");
    newManagementRequestBtn.classList.add("hidden");
    goalsMatrixBtn.classList.add("hidden");
    opportunityTable.classList.remove("hidden");
    opportunityDashboard.classList.add("hidden");
    commercialSubmenuStatus.textContent = `${state.quotations.length} ${state.quotations.length === 1 ? "cotización" : "cotizaciones"}`;
    opportunityTable.innerHTML = renderQuotationsModule();
    wireQuotationsModule();
    return;
  }

  if (state.activeArea === "comercializacion" && submenu.key === "autorizacion-pedidos") {
    newOpportunityBtn.classList.add("hidden");
    newRiskBtn.classList.add("hidden");
    newManagementRequestBtn.classList.add("hidden");
    goalsMatrixBtn.classList.add("hidden");
    opportunityTable.classList.remove("hidden");
    opportunityDashboard.classList.add("hidden");
    const pendingOrders = commercialPendingApprovalOrders();
    commercialSubmenuStatus.textContent = `${pendingOrders.length} pendientes · ${savedQuotationRows().length} cotizaciones`;
    opportunityTable.innerHTML = renderCommercialOrderAuthorization();
    wireCommercialOrderAuthorization();
    return;
  }

  if (submenu.key === "resultados-pedidos") {
    newOpportunityBtn.classList.add("hidden");
    newRiskBtn.classList.add("hidden");
    newManagementRequestBtn.classList.add("hidden");
    goalsMatrixBtn.classList.add("hidden");
    opportunityTable.classList.remove("hidden");
    opportunityDashboard.classList.add("hidden");
    financialOrdersViewTabs?.classList.remove("hidden");
    const pendingNotifications = financePendingApprovalOrders();
    if (financialOrdersNotificationCount) {
      financialOrdersNotificationCount.textContent = String(pendingNotifications.length);
      financialOrdersNotificationCount.classList.toggle("empty", pendingNotifications.length === 0);
    }
    financialOrdersViewTabs?.querySelectorAll("[data-financial-orders-view]").forEach((button) => {
      const isActive = button.dataset.financialOrdersView === state.financialOrdersView;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
    const visibleOrders = state.financialOrdersView === "list" ? filteredFinancialOrders().length : financialOrdersForSelectedPeriod().length;
    commercialSubmenuStatus.textContent = state.financialOrdersView === "notifications"
      ? `${pendingNotifications.length} pedidos pendientes del segundo visto bueno`
      : `${visibleOrders} de ${financialOrderLedgerRows().length} pedidos`;
    opportunityTable.innerHTML = renderFinancialOrders();
    wireFinancialOrders();
    return;
  }

  if (state.activeArea === "financiera" && submenu.key === "resultados-cuentas-por-cobrar") {
    newOpportunityBtn.classList.add("hidden");
    newRiskBtn.classList.add("hidden");
    newManagementRequestBtn.classList.add("hidden");
    goalsMatrixBtn.classList.add("hidden");
    opportunityTable.classList.remove("hidden");
    opportunityDashboard.classList.add("hidden");
    accountsReceivableViewTabs?.classList.remove("hidden");
    accountsReceivableViewTabs?.querySelectorAll("[data-accounts-receivable-view]").forEach((button) => {
      const isActive = button.dataset.accountsReceivableView === state.accountsReceivableView;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
    const pendingCount = state.accountsReceivable.filter((item) => Number(item.balance || 0) > 0.009).length;
    commercialSubmenuStatus.textContent = state.accountsReceivable.length
      ? `${pendingCount} pendientes · ${state.accountsReceivable.length} documentos`
      : "Cargando matriz de cartera...";
    opportunityTable.innerHTML = renderAccountsReceivable();
    wireAccountsReceivable();
    return;
  }

  if (state.activeArea === "financiera" && submenu.key === "resultados-ordenes-de-pedido") {
    newOpportunityBtn.classList.add("hidden");
    newRiskBtn.classList.add("hidden");
    newManagementRequestBtn.classList.add("hidden");
    goalsMatrixBtn.classList.add("hidden");
    opportunityTable.classList.remove("hidden");
    opportunityDashboard.classList.add("hidden");
    purchaseOrdersViewTabs?.classList.remove("hidden");
    purchaseOrdersViewTabs?.querySelectorAll("[data-purchase-orders-view]").forEach((button) => {
      const isActive = button.dataset.purchaseOrdersView === state.purchaseOrderView;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
    const activeOrders = state.purchaseOrders.filter(purchaseOrderHasBalance);
    const totals = purchaseOrderSummary(activeOrders);
    commercialSubmenuStatus.textContent = state.purchaseOrders.length ? `${totals.count} con saldo · ${formatMoney(totals.remaining)} pendiente` : "Cargando matriz de órdenes...";
    opportunityTable.innerHTML = renderPurchaseOrders();
    wirePurchaseOrders();
    return;
  }

  if (state.activeArea === "operaciones" && submenu.key === "resultados-control-ventas") {
    newOpportunityBtn.classList.add("hidden");
    newRiskBtn.classList.add("hidden");
    newManagementRequestBtn.classList.add("hidden");
    goalsMatrixBtn.classList.add("hidden");
    opportunityTable.classList.remove("hidden");
    opportunityDashboard.classList.add("hidden");
    commercialSubmenuStatus.textContent = state.controlSales.length
      ? `${state.controlSalesCounts.orders || state.controlSales.length} órdenes · ${state.controlSalesCounts.details || 0} detalles`
      : "Cargando historial normalizado...";
    opportunityTable.innerHTML = renderControlSales();
    wireControlSales();
    return;
  }

  if (state.activeArea === "operaciones" && submenu.key === "produccion-semanal") {
    newOpportunityBtn.classList.add("hidden");
    newRiskBtn.classList.add("hidden");
    newManagementRequestBtn.classList.add("hidden");
    goalsMatrixBtn.classList.add("hidden");
    opportunityTable.classList.remove("hidden");
    opportunityDashboard.classList.add("hidden");
    commercialSubmenuStatus.textContent = `${state.productionSchedule.length} grupos programados`;
    opportunityTable.innerHTML = renderProductionSchedule();
    wireProductionSchedule();
    return;
  }

  if (state.activeArea !== "comercializacion" && !["riesgos", "solicitudes"].includes(submenu.key)) {
    newOpportunityBtn.classList.add("hidden");
    newRiskBtn.classList.add("hidden");
    newManagementRequestBtn.classList.add("hidden");
    goalsMatrixBtn.classList.add("hidden");
    opportunityTable.classList.remove("hidden");
    opportunityDashboard.classList.add("hidden");
    commercialSubmenuStatus.textContent = "Seccion limpia";
    opportunityTable.innerHTML = renderCleanManagementSection(area, submenu);
    return;
  }

  const opportunitySubmenu = getOpportunitySubmenu();
  const resultViews = {
    resultados: "active",
    "resultados-oportunidades": "active",
    "resultados-dashboard": "dashboard"
  };

  if (submenu.key === "kpi") {
    newOpportunityBtn.classList.add("hidden");
    newRiskBtn.classList.add("hidden");
    newManagementRequestBtn.classList.add("hidden");
    goalsMatrixBtn.classList.remove("hidden");
    opportunityTable.classList.add("hidden");
    opportunityTable.innerHTML = "";
    opportunityDashboard.classList.remove("hidden");
    commercialSubmenuStatus.textContent = "Ventas ganadas / meta";
    renderOpportunityDashboard(opportunitySubmenu.items);
    return;
  }

  if (submenu.key.startsWith("crm")) {
    const isCrmOpportunityView = submenu.key === "crm";
    commercialPanel.classList.toggle("opportunity-mode", isCrmOpportunityView);
    commercialPanel.classList.toggle("crm-opportunity-tabs", isCrmOpportunityView);
    commercialSubmenuTitle.classList.toggle("hidden", false);
    commercialSubmenuTitle.textContent = isCrmOpportunityView ? "Oportunidades / Vendedores" : submenu.label;
    opportunitySearchField.classList.toggle("hidden", !isCrmOpportunityView);
    opportunitySearchInput.value = state.crmSearch;
    opportunityTotalAmount.classList.toggle("hidden", !isCrmOpportunityView);
    if (isCrmOpportunityView) {
      const activeCrm = crmData().opportunities.filter((opportunity) => !isCrmArchivedOpportunity(opportunity) && String(opportunity.status || "Vigente").toLowerCase() !== "ganada");
      opportunityTotalAmount.querySelector("strong").textContent = formatMoney(
        activeCrm.reduce((sum, opportunity) => sum + Number(opportunity.estimatedAmount || 0), 0)
      );
    }
    newOpportunityBtn.classList.toggle("hidden", !isCrmOpportunityView);
    crmOpportunitiesViewTabs?.classList.toggle("hidden", !isCrmOpportunityView);
    if (isCrmOpportunityView) {
      crmOpportunitiesViewTabs?.querySelectorAll("[data-crm-opportunities-view]").forEach((button) => {
        const isActive = button.dataset.crmOpportunitiesView === state.crmOpportunitiesView;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-selected", String(isActive));
      });
    }
    newRiskBtn.classList.add("hidden");
    newManagementRequestBtn.classList.add("hidden");
    goalsMatrixBtn.classList.add("hidden");
    opportunityTable.classList.remove("hidden");
    opportunityDashboard.classList.add("hidden");
    opportunityDashboard.innerHTML = "";
    commercialSubmenuStatus.textContent = submenu.status;
    opportunityTable.innerHTML = renderCrmModule(submenu.key);
    opportunityTable.querySelector("[data-crm-refresh]")?.addEventListener("click", loadCrmData);
    opportunityTable.querySelector("[data-crm-new]")?.addEventListener("click", () => openCrmOpportunityDialog());
    opportunityTable.querySelector("[data-crm-customer-new]")?.addEventListener("click", () => openCrmCustomerDialog());
    opportunityTable.querySelectorAll("[data-crm-customer-edit]").forEach((button) => button.addEventListener("click", () => {
      const customer = crmMasterCustomers(true).find((item) => String(item.id) === String(button.dataset.crmCustomerEdit));
      if (customer) openCrmCustomerDialog(customer);
    }));
    opportunityTable.querySelectorAll("[data-crm-customer-delete]").forEach((button) => button.addEventListener("click", async () => {
      if (!confirm("¿Archivar este cliente? Sus documentos y oportunidades conservarán la relación.")) return;
      try { await crmApi(`/customers/${encodeURIComponent(button.dataset.crmCustomerDelete)}`, { method: "DELETE" }); renderCurrentArea(); }
      catch (error) { alert(error.message || "No fue posible archivar el cliente."); }
    }));
    opportunityTable.querySelectorAll("[data-crm-customer-restore]").forEach((button) => button.addEventListener("click", async () => {
      const customer = crmMasterCustomers(true).find((item) => String(item.id) === String(button.dataset.crmCustomerRestore));
      if (!customer) return;
      try { await crmApi(`/customers/${encodeURIComponent(customer.id)}`, { method: "PATCH", body: JSON.stringify({ ...customer, active: true }) }); renderCurrentArea(); }
      catch (error) { alert(error.message || "No fue posible restaurar el cliente."); }
    }));
    opportunityTable.querySelector("[data-crm-customer-search]")?.addEventListener("input", (event) => {
      state.crmCustomerSearch = event.target.value;
      state.crmCustomerPage = 1;
      renderCommercialSubmenu(areas.comercializacion);
      const input = opportunityTable.querySelector("[data-crm-customer-search]");
      input?.focus();
      input?.setSelectionRange(input.value.length, input.value.length);
    });
    opportunityTable.querySelector("[data-crm-customer-status]")?.addEventListener("change", (event) => {
      state.crmCustomerStatus = event.target.value;
      state.crmCustomerPage = 1;
      renderCommercialSubmenu(areas.comercializacion);
    });
    opportunityTable.querySelectorAll("[data-crm-customer-page]").forEach((button) => button.addEventListener("click", () => {
      state.crmCustomerPage = Number(button.dataset.crmCustomerPage) || 1;
      renderCommercialSubmenu(areas.comercializacion);
    }));
    opportunityTable.querySelector("[data-crm-search]")?.addEventListener("input", (event) => {
      state.crmSearch = event.target.value;
      renderCommercialSubmenu(areas.comercializacion);
      const input = opportunityTable.querySelector("[data-crm-search]");
      input?.focus();
      input?.setSelectionRange(input.value.length, input.value.length);
    });
    opportunityTable.querySelector("[data-crm-tracking-search]")?.addEventListener("input", (event) => {
      state.crmSearch = event.target.value;
      renderCommercialSubmenu(areas.comercializacion);
      const input = opportunityTable.querySelector("[data-crm-tracking-search]");
      input?.focus();
      input?.setSelectionRange(input.value.length, input.value.length);
    });
    opportunityTable.querySelectorAll("[data-crm-tracking-view]").forEach((button) => {
      button.addEventListener("click", () => {
        state.crmTrackingView = button.dataset.crmTrackingView;
        renderCommercialSubmenu(areas.comercializacion);
      });
    });
    opportunityTable.querySelector("[data-crm-won-date-from]")?.addEventListener("change", (event) => {
      state.crmWonDateFrom = event.target.value;
      renderCommercialSubmenu(areas.comercializacion);
    });
    opportunityTable.querySelector("[data-crm-won-date-to]")?.addEventListener("change", (event) => {
      state.crmWonDateTo = event.target.value;
      renderCommercialSubmenu(areas.comercializacion);
    });
    opportunityTable.querySelector("[data-crm-won-date-clear]")?.addEventListener("click", () => {
      state.crmWonDateFrom = "";
      state.crmWonDateTo = "";
      renderCommercialSubmenu(areas.comercializacion);
    });
    opportunityTable.querySelectorAll("[data-crm-won-quotation]").forEach((button) => {
      button.addEventListener("click", () => openQuotationDialog(
        button.dataset.crmWonQuotation,
        button.dataset.crmWonQuotationId
      ));
    });
    opportunityTable.querySelectorAll("[data-crm-won-order]").forEach((button) => {
      button.addEventListener("click", () => openCrmWonOrder(button.dataset.crmWonOrder));
    });
    opportunityTable.querySelectorAll("[data-crm-seller]").forEach((button) => {
      button.addEventListener("click", () => {
        state.crmSellerId = button.dataset.crmSeller;
        state.activeSubmenu = "crm-seguimiento";
        renderDashboard();
      });
    });
    opportunityTable.querySelectorAll("[data-crm-seller-only]").forEach((button) => {
      button.addEventListener("click", () => {
        state.crmSellerId = button.dataset.crmSellerOnly === "all" ? "" : button.dataset.crmSellerOnly;
        renderCommercialSubmenu(areas.comercializacion);
      });
    });
    opportunityTable.querySelectorAll("[data-crm-agenda-today]").forEach((button) => {
      button.addEventListener("click", () => {
        state.crmAgendaDate = new Date().toISOString().slice(0, 10);
        renderCommercialSubmenu(areas.comercializacion);
      });
    });
    opportunityTable.querySelectorAll("[data-crm-migrate]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        migrateCrmOpportunityToResults(button.dataset.crmMigrate, button);
      });
    });
    opportunityTable.querySelectorAll("[data-crm-management]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        openCrmManagementDialog(button.dataset.crmManagement);
      });
    });
    opportunityTable.querySelectorAll("[data-crm-opportunity]").forEach((item) => {
      item.addEventListener("click", () => openCrmOpportunityById(item.dataset.crmOpportunity));
    });
    opportunityTable.querySelectorAll("[data-crm-edit]").forEach((button) => {
      button.addEventListener("click", () => openCrmOpportunityById(button.dataset.crmEdit));
    });
    opportunityTable.querySelectorAll("[data-crm-delete]").forEach((button) => {
      button.addEventListener("click", () => {
        openCrmCancellationDialog(button.dataset.crmDelete);
      });
    });
    opportunityTable.querySelectorAll("[data-crm-history-purge]").forEach((button) => {
      button.addEventListener("click", async () => {
        const opportunity = crmData().opportunities.find((item) => item.id === button.dataset.crmHistoryPurge);
        if (!opportunity) return;
        const confirmed = confirm(
          `¿Eliminar definitivamente “${opportunity.company || "esta oportunidad"}”?\n\n` +
          "Se borrará del Historial, Vendedores, Seguimiento y Gerencia. También se eliminarán sus cotizaciones no convertidas. Esta acción no se puede deshacer."
        );
        if (!confirmed) return;
        button.disabled = true;
        button.textContent = "Eliminando...";
        try {
          await crmApi(`/opportunities/${encodeURIComponent(opportunity.id)}/purge`, { method: "POST", body: "{}" });
          getOpportunitySubmenu().items = getOpportunitySubmenu().items.filter((item) => item.crmOpportunityId !== opportunity.id && item.id !== opportunity.resultOpportunityId);
          state.quotations = state.quotations.filter((item) => item.opportunityId !== opportunity.id);
          localStorage.setItem(opportunitiesStorageKey, JSON.stringify(getOpportunitySubmenu().items));
          persistLocalQuotations();
          renderCommercialSubmenu(areas.comercializacion);
        } catch (error) {
          button.disabled = false;
          button.textContent = "Eliminar definitivamente";
          alert(error.message || "No se pudo eliminar completamente la oportunidad.");
        }
      });
    });
    opportunityTable.querySelectorAll("[data-crm-page]").forEach((button) => {
      button.addEventListener("click", () => {
        state.crmOpportunityPage += button.dataset.crmPage === "next" ? 1 : -1;
        renderCommercialSubmenu(areas.comercializacion);
      });
    });
    opportunityTable.querySelectorAll("[data-crm-agenda-status]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const [agendaId, status] = button.dataset.crmAgendaStatus.split(":");
        crmApi(`/agenda/${agendaId}`, { method: "PATCH", body: JSON.stringify({ status }) });
      });
    });
    opportunityTable.querySelectorAll("[data-crm-status]").forEach((button) => {
      button.addEventListener("click", () => {
        state.crmStatusFilter = button.dataset.crmStatus;
        renderCommercialSubmenu(areas.comercializacion);
      });
    });
    return;
  }

  if (submenu.key === "riesgos") {
    newOpportunityBtn.classList.add("hidden");
    newRiskBtn.classList.remove("hidden");
    newManagementRequestBtn.classList.add("hidden");
    goalsMatrixBtn.classList.add("hidden");
    opportunityTable.classList.remove("hidden");
    opportunityDashboard.classList.add("hidden");
    const visibleRisks = visibleStrategicRiskItems();
    commercialSubmenuStatus.textContent = `${visibleRisks.length} riesgos notificados`;
    opportunityTable.innerHTML = renderStrategicRisks(visibleRisks);
    return;
  }

  if (submenu.key === "solicitudes") {
    newOpportunityBtn.classList.add("hidden");
    newRiskBtn.classList.add("hidden");
    newManagementRequestBtn.classList.remove("hidden");
    goalsMatrixBtn.classList.add("hidden");
    opportunityTable.classList.remove("hidden");
    opportunityDashboard.classList.add("hidden");
    const visibleRequests = visibleManagementRequestItems();
    commercialSubmenuStatus.textContent = `${visibleRequests.length} solicitudes enviadas`;
    opportunityTable.innerHTML = renderManagementRequests(visibleRequests);
    return;
  }

  const resultView = resultViews[submenu.key] || "active";
  state.opportunityCycleView = resultView === "active"
    ? (["active", "closed"].includes(state.opportunityCycleView) ? state.opportunityCycleView : "active")
    : resultView;
  commercialSubmenuTitle.classList.toggle("hidden", resultView === "active");
  commercialPanel.classList.toggle("opportunity-mode", resultView === "active");
  opportunityTotalAmount.classList.toggle("hidden", resultView !== "active");
  opportunitySearchField.classList.toggle("hidden", resultView !== "active");
  opportunitySearchInput.value = state.opportunitySearch;
  newOpportunityBtn.classList.toggle("hidden", resultView !== "active");
  newRiskBtn.classList.add("hidden");
  newManagementRequestBtn.classList.add("hidden");
  goalsMatrixBtn.classList.add("hidden");
  opportunityTable.classList.remove("hidden");
  opportunityDashboard.classList.add("hidden");
  const cycleRows = opportunityCycleRows(opportunitySubmenu.items);
  const activeRows = cycleRows.active;
  const historyRows = cycleRows.history;
  const searchQuery = normalizeKey(state.opportunitySearch);
  const filteredActiveRows = searchQuery
    ? activeRows.filter(({ item, result }) => [
        item.date,
        formatDate(item.date),
        item.company,
        item.seller,
        item.stage,
        item.probability,
        probabilityLabel(item.probability),
        item.amount,
        formatMoney(item.amount),
        result?.result
      ].some((value) => searchTokenMatches(value, searchQuery)))
    : activeRows;
  const filteredClosedRows = historyRows.filter(({ item, result }) => {
    const closedDate = result?.date || item.date || "";
    const matchesDate = (!state.opportunityClosedDateFrom || closedDate >= state.opportunityClosedDateFrom)
      && (!state.opportunityClosedDateTo || closedDate <= state.opportunityClosedDateTo);
    const matchesSearch = !searchQuery || [
      closedDate,
      formatDate(closedDate),
      item.company,
      item.seller,
      item.stage,
      item.probability,
      probabilityLabel(item.probability),
      item.amount,
      formatMoney(item.amount),
      result?.result,
      result?.comment
    ].some((value) => searchTokenMatches(value, searchQuery));
    return matchesDate && matchesSearch;
  });
  const wonClosedRows = filteredClosedRows.filter(({ result }) => result?.result === "ganado");
  const lostClosedRows = filteredClosedRows.filter(({ result }) => result?.result !== "ganado");
  const closedRowsByResult = state.opportunityClosedResultFilter === "won"
    ? wonClosedRows
    : (state.opportunityClosedResultFilter === "lost" ? lostClosedRows : filteredClosedRows);
  const closedTotalAmount = filteredClosedRows.reduce((sum, row) => sum + Number(row.item.amount || 0), 0);
  const wonClosedAmount = wonClosedRows.reduce((sum, row) => sum + Number(row.item.amount || 0), 0);
  const lostClosedAmount = lostClosedRows.reduce((sum, row) => sum + Number(row.item.amount || 0), 0);
  const mainStatus = state.opportunityMainStatusFilter || "active";
  const mainResult = state.opportunityMainResultFilter || "pending";
  const isClosedView = mainStatus === "closed";
  const statusRows = mainStatus === "active"
    ? filteredActiveRows
    : mainStatus === "closed" ? filteredClosedRows : [...filteredActiveRows, ...filteredClosedRows];
  const displayRows = statusRows.filter(({ result }) => (
    mainResult === "all"
    || (mainResult === "pending" && !result)
    || (mainResult === "won" && result?.result === "ganado")
    || (mainResult === "lost" && result && result.result !== "ganado")
  ));
  const visibleTotal = displayRows.reduce((sum, row) => sum + Number(row.item.amount || 0), 0);
  opportunityTotalAmount.querySelector("strong").textContent = formatMoney(visibleTotal);
  const effectivePageSize = isClosedView ? 5 : opportunityManagementPageSize;
  const pageCount = Math.max(1, Math.ceil(displayRows.length / effectivePageSize));
  state.opportunityPage = Math.min(Math.max(Number(state.opportunityPage) || 1, 1), pageCount);
  const pageStart = (state.opportunityPage - 1) * effectivePageSize;
  const pageEnd = pageStart + effectivePageSize;
  const pagedRows = displayRows.slice(pageStart, pageEnd);
  commercialSubmenuStatus.textContent = "";

  if (!opportunitySubmenu.items.length) {
    opportunityTable.innerHTML = `
      <div class="empty-state">
        No hay oportunidades ingresadas. Usa el formulario para crear el primer registro.
      </div>
    `;
    return;
  }

  opportunityTable.innerHTML = `
    ${resultView === "dashboard" ? renderCycleDashboard(opportunitySubmenu.items) : resultView === "history" ? renderHistoryList(historyRows) : `
    <section class="opportunity-cycle-toolbar" aria-label="Vista de oportunidades">
      <div class="opportunity-cycle-tabs" role="tablist" aria-label="Estado del ciclo comercial">
        <button class="${mainStatus === "active" ? "active" : ""}" type="button" role="tab" data-cycle-view="active" aria-selected="${mainStatus === "active"}">
          En venta <b>${filteredActiveRows.length}</b>
        </button>
        <button class="${mainStatus === "closed" ? "active closed" : ""}" type="button" role="tab" data-cycle-view="closed" aria-selected="${mainStatus === "closed"}">
          Cerradas <b>${filteredClosedRows.length}</b>
        </button>
      </div>
      <button class="opportunity-report-launch" type="button" data-opportunity-report><span aria-hidden="true">🖨</span> Reporte</button>
      <div class="opportunity-main-filters" aria-label="Filtros principales de oportunidades">
        <label><span>Estado de oportunidad</span><select data-main-opportunity-status>
          <option value="active" ${mainStatus === "active" ? "selected" : ""}>En venta / pendientes</option>
          <option value="closed" ${mainStatus === "closed" ? "selected" : ""}>Cerradas</option>
          <option value="all" ${mainStatus === "all" ? "selected" : ""}>Todas</option>
        </select></label>
        <label><span>Resultado</span><select data-main-opportunity-result>
          <option value="pending" ${mainResult === "pending" ? "selected" : ""}>Pendientes</option>
          <option value="won" ${mainResult === "won" ? "selected" : ""}>Ganadas</option>
          <option value="lost" ${mainResult === "lost" ? "selected" : ""}>Perdidas</option>
          <option value="all" ${mainResult === "all" ? "selected" : ""}>Todos</option>
        </select></label>
        <div><span>Métrica filtrada</span><strong>${displayRows.length} oportunidades · ${formatMoney(visibleTotal)}</strong></div>
      </div>
      ${isClosedView ? `
        <div class="opportunity-closed-filters">
          <label>
            <span>Desde</span>
            <input type="date" data-opportunity-closed-from value="${state.opportunityClosedDateFrom}">
          </label>
          <label>
            <span>Hasta</span>
            <input type="date" data-opportunity-closed-to value="${state.opportunityClosedDateTo}">
          </label>
          <button class="ghost-btn compact-btn" type="button" data-opportunity-closed-reset>Desde 1 de julio</button>
          <div class="opportunity-closed-result-switch" role="group" aria-label="Resultado de oportunidades cerradas">
            <button type="button" data-closed-result-filter="all" class="${state.opportunityClosedResultFilter === "all" ? "active" : ""}">
              <span>Total</span><b>${filteredClosedRows.length}</b><strong>${formatMoney(closedTotalAmount)}</strong>
            </button>
            <button type="button" data-closed-result-filter="won" class="won ${state.opportunityClosedResultFilter === "won" ? "active" : ""}">
              <span>Ganadas</span><b>${wonClosedRows.length}</b><strong>${formatMoney(wonClosedAmount)}</strong>
            </button>
            <button type="button" data-closed-result-filter="lost" class="lost ${state.opportunityClosedResultFilter === "lost" ? "active" : ""}">
              <span>Perdidas</span><b>${lostClosedRows.length}</b><strong>${formatMoney(lostClosedAmount)}</strong>
            </button>
          </div>
        </div>
      ` : `
        <p class="opportunity-cycle-note">Solo se contabilizan oportunidades que continúan en venta.</p>
      `}
    </section>
    <div class="opportunity-row opportunity-header">
      <strong>Fecha</strong>
      <strong>Empresa</strong>
      <strong>Vendedor</strong>
      <strong>Etapa</strong>
      <strong>Temperatura</strong>
      <strong>Monto</strong>
      <strong>Acciones</strong>
    </div>
    <div class="opportunity-table-body">
      ${displayRows.length ? pagedRows.map(({ item, result, isInherited, isHistory, isPendingOrder, isImportedHistory }) => `
        <div class="opportunity-row ${isInherited ? "inherited" : ""} ${isHistory ? "archived" : ""} ${isImportedHistory ? "imported-history" : ""}">
          <span>${formatDate(item.date)}</span>
          <strong class="company-cell">
            <span class="company-name">${item.company}</span>
            <span class="company-badges">
              ${isInherited ? `<span class="closure-badge inherited">Heredada</span>` : ""}
              ${isImportedHistory ? `<span class="closure-badge historical">Historico</span>` : ""}
              ${result ? `<span class="closure-badge ${result.result === "ganado" ? "won" : "lost"}" ${isPendingOrder ? 'title="La venta está ganada y falta convertir la cotización en orden de pedido"' : ""}>${isPendingOrder ? "Ganada · pendiente de orden" : (result.result === "ganado" ? "Ganada" : "Perdida")}</span>` : ""}
              ${hasOutstandingSamples(item) ? `<span class="closure-badge samples-assigned">Muestras asignadas</span>` : ""}
            </span>
          </strong>
          <span>${item.seller}</span>
          <span>${item.stage}</span>
          <span class="tag ${probabilityClass(item.probability)}">${probabilityLabel(item.probability)}</span>
          <strong>${formatMoney(item.amount)}</strong>
          <span class="row-actions">
          ${!isHistory ? `
            <button class="action-icon-btn" type="button" data-action="edit" data-id="${item.id}" aria-label="Editar">
              <span aria-hidden="true">✏️</span>
            </button>
          ` : ""}
          ${isImportedHistory ? `<span class="history-lock">Cierre real</span>` : `
            <button class="action-icon-btn manage-action-btn" type="button" data-action="manage" data-id="${item.id}" aria-label="Abrir gestiones" title="Abrir y registrar gestiones">
              <span aria-hidden="true">📋</span>
            </button>
          `}
          ${isPendingOrder ? `
            <button class="action-icon-btn order-action-btn" type="button" data-action="convert-order" data-id="${item.id}" aria-label="Convertir a orden de pedido" title="Convertir la cotización ganada en orden de pedido">
              <span aria-hidden="true">🧾</span>
            </button>
          ` : ""}
          ${canDeleteOpportunities() ? `
            <button class="action-icon-btn delete-record-btn" type="button" data-action="delete-record" data-id="${item.id}" aria-label="Eliminar registro completo" title="Eliminar oportunidad, cotización y gestiones">
              <span aria-hidden="true">🗑️</span>
            </button>
          ` : ""}
          ${canManageMigratedOpportunityLifecycle() && !isHistory ? `
            <button class="action-icon-btn return-followup" type="button" data-action="return-followup" data-id="${item.id}" aria-label="Volver a Seguimiento" title="Volver a Seguimiento">
              <span aria-hidden="true">↩️</span>
            </button>
          ` : ""}
          ${canManageMigratedOpportunityLifecycle() && !isHistory ? `
            <button class="action-icon-btn danger" type="button" data-action="cancel" data-id="${item.id}" aria-label="Anular oportunidad" title="Anular oportunidad">
              <span aria-hidden="true">🗑️</span>
            </button>
          ` : ""}
          </span>
        </div>
      `).join("") : `
        <div class="empty-state">
          ${isClosedView ? "No hay oportunidades cerradas dentro del rango seleccionado." : "No hay oportunidades vigentes para este periodo."}
        </div>
      `}
    </div>
    <div class="opportunity-pagination" aria-label="Paginacion de oportunidades">
      <span>Mostrando ${displayRows.length ? pageStart + 1 : 0}-${Math.min(pageEnd, displayRows.length)} de ${displayRows.length}</span>
      <div>
        <button class="ghost-btn compact-btn" type="button" data-opportunity-page="prev" ${state.opportunityPage <= 1 ? "disabled" : ""}>Anterior</button>
        <strong>Pagina ${state.opportunityPage} de ${pageCount}</strong>
        <button class="ghost-btn compact-btn" type="button" data-opportunity-page="next" ${state.opportunityPage >= pageCount ? "disabled" : ""}>Siguiente</button>
      </div>
    </div>
    `}
  `;
}

function renderOpportunityDashboard(items) {
  items = visibleResultOpportunities(items);
  state.opportunityFilter = null;
  state.kpiView = "dashboard";
  const fulfillmentRows = wonSalesFulfillmentRows(items);
  const selectedSeller = commercialSellerNames({ includeInactive: true }).includes(state.kpiSeller) ? state.kpiSeller : "all";
  const summaryRows = selectedSeller === "all"
    ? fulfillmentRows
    : fulfillmentRows.filter((row) => row.seller === selectedSeller);
  const titleSales = fulfillmentRows.reduce((sum, row) => sum + row.sales, 0);
  const titleGoal = fulfillmentRows.reduce((sum, row) => sum + row.goal, 0);
  const titlePercent = titleGoal ? Math.round((titleSales / titleGoal) * 100) : 0;
  pageTitle.classList.add("with-results-summary");
  pageTitle.innerHTML = `
    <span>KPI</span>
    <span class="results-title-metrics">
      <span>${formatMoney(titleSales)}</span>
      <span><strong>${titlePercent}%</strong> general</span>
    </span>
  `;
  const maxFulfillment = Math.max(...fulfillmentRows.map((row) => row.percent), 100);
  const targetMarker = Math.min((100 / maxFulfillment) * 100, 100);
  opportunityDashboard.innerHTML = `
    <section class="won-sales-kpi" aria-label="Cumplimiento de ventas ganadas">
      <div class="won-kpi-sticky">
        <div class="kpi-selection-bar">
          <span>${selectedSeller === "all" ? "Resumen general" : `Vendedor seleccionado: ${selectedSeller}`}</span>
          ${selectedSeller !== "all" ? `<button class="ghost-btn compact-btn" type="button" data-kpi-seller-clear>Ver resumen general</button>` : ""}
        </div>
      </div>

      <div class="won-kpi-table">
        <div class="won-kpi-caption">
          <strong>Avance contra plan operativo final</strong>
          <span>Vendido acumulado mas oportunidades cerradas positivas en ${state.period}</span>
        </div>
        <div class="won-kpi-row won-kpi-header">
          <strong>Vendedor</strong>
          <strong>Oportunidades</strong>
          <strong>Ganadas</strong>
          <strong>Perdidas</strong>
          <strong>Historico</strong>
          <strong>Venta ganada</strong>
          <strong>Plan operativo final</strong>
          <strong>Cumplimiento</strong>
          <strong>Diferencia</strong>
          <strong>Estado</strong>
        </div>
        ${fulfillmentRows.map((row) => {
          const [statusClass, statusLabel] = kpiSemaphore(row.percent);
          const scaledPercent = maxFulfillment ? Math.min((row.percent / maxFulfillment) * 100, 100) : 0;
          return `
            <div class="won-kpi-row ${row.seller === "Vacante" ? "vacancy" : ""} ${selectedSeller === row.seller ? "selected" : ""}" data-kpi-seller-row="${row.seller}">
              <strong>${row.seller}</strong>
              <button class="count-chip total" type="button" data-kpi-detail="all" data-kpi-seller-detail="${row.seller}" aria-label="Ver oportunidades de ${row.seller}">${row.opportunityCount}</button>
              <button class="count-chip won" type="button" data-kpi-detail="won" data-kpi-seller-detail="${row.seller}" aria-label="Ver oportunidades ganadas de ${row.seller}">${row.wonCount}</button>
              <button class="count-chip lost" type="button" data-kpi-detail="lost" data-kpi-seller-detail="${row.seller}" aria-label="Ver oportunidades perdidas de ${row.seller}">${row.lostCount}</button>
              <button class="count-chip pending" type="button" data-kpi-detail="historical" data-kpi-seller-detail="${row.seller}" aria-label="Ver historico enero a junio de ${row.seller}">${row.historicalCount}</button>
              <span class="money-cell">${formatMoney(row.sales)}</span>
              <span>${formatMoney(row.goal)}</span>
              <span>
                <span class="achievement-progress" style="--target:${targetMarker}%">
                  <i style="width:${scaledPercent}%"></i>
                </span>
                <small>${row.percent}%</small>
              </span>
              <span>${varianceLabel(row.variance)}</span>
              <span class="semaphore ${statusClass}"><i></i>${statusLabel}</span>
            </div>
          `;
        }).join("")}
      </div>
    </section>
  `;
  return;

  if (state.kpiView === "table") {
    opportunityDashboard.innerHTML = `
      ${renderKpiTabs()}
      ${renderKpiComplianceTable(items)}
    `;
    return;
  }

  const filter = state.opportunityFilter;
  const filteredItems = filter
    ? items.filter((item) => item[filter.type] === filter.value)
    : items;
  const total = sumAmounts(filteredItems);
  const won = filteredItems.filter((item) => closureResult(item)?.result === "ganado");
  const lost = filteredItems.filter((item) => closureResult(item)?.result === "perdida");
  const open = filteredItems.filter((item) => !closureResult(item));
  const weightedTotal = filteredItems.reduce((sum, item) => {
    const probabilityWeight = { caliente: .8, tibio: .55, frio: .3, congelado: .1 }[item.probability] || .2;
    return sum + Number(item.amount || 0) * probabilityWeight;
  }, 0);

  const byStage = opportunityStages.map((stage) => {
    const stageItems = items.filter((item) => item.stage === stage);
    return { label: stage, count: stageItems.length, amount: sumAmounts(stageItems) };
  });
  const maxStageAmount = Math.max(...byStage.map((stage) => stage.amount), 1);

  const probabilityGroups = opportunityProbabilities.map(([key, label]) => {
    const probabilityItems = items.filter((item) => item.probability === key);
    return { key, label, count: probabilityItems.length, amount: sumAmounts(probabilityItems) };
  });

  const sellerGroups = Object.entries(groupBy(filteredItems, "seller"))
    .map(([seller, sellerItems]) => ({ seller, count: sellerItems.length, amount: sumAmounts(sellerItems) }))
    .sort((a, b) => b.amount - a.amount);
  const maxSellerAmount = Math.max(...sellerGroups.map((seller) => seller.amount), 1);

  const closedAmount = sumAmounts(won) + sumAmounts(lost);
  const wonRate = filteredItems.length ? Math.round((won.length / filteredItems.length) * 100) : 0;
  const planRows = sellerPlanRows(items);
  const totalPlan = planTotal();
  const planFulfillment = totalPlan ? Math.round((sumAmounts(items) / totalPlan) * 100) : 0;
  const filterLabel = filter
    ? `${filter.type === "stage" ? "Etapa" : "Temperatura"}: ${filter.label}`
    : "Vista general";

  opportunityDashboard.innerHTML = `
    ${renderKpiTabs()}
    <div class="dashboard-filter-bar">
      <span>${filterLabel}</span>
      ${filter ? `<button class="ghost-btn compact-btn" type="button" data-dashboard-filter-clear>Limpiar filtro</button>` : ""}
    </div>
    <section class="opportunity-hero-metrics" aria-label="Metricas visuales de oportunidades">
      <article class="metric-tile total">
        <span>Pipeline total</span>
        <strong>${formatMoney(total)}</strong>
        <small>${filteredItems.length} de ${items.length} oportunidades</small>
      </article>
      <article class="metric-tile">
        <span>Pipeline ponderado</span>
        <strong>${formatMoney(weightedTotal)}</strong>
        <small>Segun temperatura comercial</small>
      </article>
      <article class="metric-tile">
        <span>Abiertas</span>
        <strong>${open.length}</strong>
        <small>${formatMoney(sumAmounts(open))} en seguimiento</small>
      </article>
      <article class="metric-tile">
        <span>Cierre ganado</span>
        <strong>${wonRate}%</strong>
        <small>${won.length} ganadas / ${lost.length} perdidas</small>
      </article>
    </section>

    <section class="plan-dashboard" aria-label="Cumplimiento del plan operativo">
      <div class="plan-overview">
        <div>
          <p class="eyebrow">Plan operativo 2026</p>
          <h3>Cumplimiento por vendedor</h3>
          <small>Kevin Hernandez se controla como Vacante mientras se cubre la plaza.</small>
        </div>
        <div class="plan-total-card">
          <span>Plan total</span>
          <strong>${formatMoney(totalPlan)}</strong>
          <small>Pipeline actual: ${formatMoney(sumAmounts(items))} · ${planFulfillment}%</small>
        </div>
      </div>
      <div class="seller-plan-grid">
        ${planRows.map((row) => `
          <article class="seller-plan-card ${row.type === "vacancy" ? "vacancy" : ""}">
            <div class="seller-plan-top">
              <strong>${row.seller}</strong>
              <span class="semaphore ${kpiSemaphore(row.percent)[0]}"><i></i>${kpiSemaphore(row.percent)[1]}</span>
            </div>
            <div class="seller-plan-meta">
              <span>Plan ${formatMoney(row.plan)}</span>
              <span>Actual ${formatMoney(row.actual)}</span>
            </div>
            <div class="seller-plan-bar">
              <span style="width:${Math.min(row.plan ? (row.actual / row.plan) * 100 : 0, 100)}%"></span>
            </div>
            <small>${row.count} oportunidades · brecha ${formatMoney(row.gap)}</small>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="visual-grid">
      <article class="visual-panel funnel-panel">
        <div class="panel-head compact-head">
          <div>
            <p class="eyebrow">Embudo</p>
            <h3>Pipeline por etapa</h3>
          </div>
        </div>
        <div class="funnel-list">
          ${byStage.map((stage) => `
            <button class="funnel-step ${filter?.type === "stage" && filter.value === stage.label ? "selected" : ""}" type="button" data-dashboard-filter-type="stage" data-dashboard-filter-value="${stage.label}" data-dashboard-filter-label="${stage.label}">
              <div class="funnel-meta">
                <strong>${stage.label}</strong>
                <span>${stage.count} ops · ${formatMoney(stage.amount)}</span>
              </div>
              <div class="funnel-bar"><span style="width:${Math.max((stage.amount / maxStageAmount) * 100, stage.count ? 12 : 0)}%"></span></div>
            </button>
          `).join("")}
        </div>
      </article>

      <article class="visual-panel">
        <div class="panel-head compact-head">
          <div>
            <p class="eyebrow">Temperatura</p>
            <h3>Probabilidad de cierre</h3>
          </div>
        </div>
        <div class="temperature-grid">
          ${probabilityGroups.map((group) => `
            <button class="temperature-card ${group.key} ${filter?.type === "probability" && filter.value === group.key ? "selected" : ""}" type="button" data-dashboard-filter-type="probability" data-dashboard-filter-value="${group.key}" data-dashboard-filter-label="${group.label}">
              <span>${group.label}</span>
              <strong>${group.count}</strong>
              <small>${formatMoney(group.amount)}</small>
            </button>
          `).join("")}
        </div>
      </article>

      <article class="visual-panel">
        <div class="panel-head compact-head">
          <div>
            <p class="eyebrow">Cierres</p>
            <h3>Resultado comercial</h3>
          </div>
        </div>
        <div class="closure-visual">
          <div class="donut" style="--won:${closedAmount ? (sumAmounts(won) / closedAmount) * 100 : 0}">
            <span>${won.length}/${won.length + lost.length}</span>
          </div>
          <div class="closure-legend">
            <span><i class="legend-dot won"></i>Ganadas ${formatMoney(sumAmounts(won))}</span>
            <span><i class="legend-dot lost"></i>Perdidas ${formatMoney(sumAmounts(lost))}</span>
            <span><i class="legend-dot open"></i>Abiertas ${formatMoney(sumAmounts(open))}</span>
          </div>
        </div>
      </article>

      <article class="visual-panel">
        <div class="panel-head compact-head">
          <div>
            <p class="eyebrow">Vendedores</p>
            <h3>Ranking por monto</h3>
          </div>
        </div>
        <div class="seller-ranking">
          ${sellerGroups.map((seller) => `
            <div class="seller-row">
              <div>
                <strong>${seller.seller}</strong>
                <span>${seller.count} oportunidades</span>
              </div>
              <div class="seller-meter"><span style="width:${(seller.amount / maxSellerAmount) * 100}%"></span></div>
              <strong>${formatMoney(seller.amount)}</strong>
            </div>
          `).join("")}
        </div>
      </article>
    </section>
  `;
}

function renderGoalsMatrix() {
  const totalRow = goalsMatrixTotals();
  goalsMatrixTable.innerHTML = `
    <table class="goals-matrix">
      <thead>
        <tr>
          ${goalsMatrixColumns.map((column, index) => `
            <th class="${index === 0 ? "sticky-col" : ""} ${column === "Total" ? "total-col" : ""}">${column}</th>
          `).join("")}
        </tr>
      </thead>
      <tbody>
        ${goalsMatrixRows.map((row) => `
          <tr>
            ${row.map((value, index) => `
              <td class="${index === 0 ? "sticky-col" : ""} ${goalsMatrixColumns[index] === "Total" ? "total-col" : ""}">
                ${index === 0 ? value : formatMoney(value)}
              </td>
            `).join("")}
          </tr>
        `).join("")}
      </tbody>
      <tfoot>
        <tr>
          ${totalRow.map((value, index) => `
            <td class="${index === 0 ? "sticky-col" : ""} ${goalsMatrixColumns[index] === "Total" ? "total-col" : ""}">
              ${index === 0 ? value : formatMoney(value)}
            </td>
          `).join("")}
        </tr>
      </tfoot>
    </table>
  `;
}

function renderKpiTabs() {
  return `
    <div class="kpi-tabs" role="tablist" aria-label="Vistas de KPI">
      <button class="kpi-tab ${state.kpiView === "dashboard" ? "active" : ""}" type="button" data-kpi-view="dashboard">
        Dashboard
      </button>
      <button class="kpi-tab ${state.kpiView === "table" ? "active" : ""}" type="button" data-kpi-view="table">
        Semaforo KPI
      </button>
    </div>
  `;
}

function commercialKpiRows(items) {
  items = visibleResultOpportunities(items);
  const total = sumAmounts(items);
  const weightedTotal = items.reduce((sum, item) => {
    const probabilityWeight = { caliente: .8, tibio: .55, frio: .3, congelado: .1 }[item.probability] || .2;
    return sum + Number(item.amount || 0) * probabilityWeight;
  }, 0);
  const won = items.filter((item) => closureResult(item)?.result === "ganado");
  const lost = items.filter((item) => closureResult(item)?.result === "perdida");
  const closedCount = won.length + lost.length;
  const hotCount = items.filter((item) => item.probability === "caliente").length;
  const openCount = items.filter((item) => !closureResult(item)).length;
  const wonRate = closedCount ? (won.length / closedCount) * 100 : 0;
  const hotRate = items.length ? (hotCount / items.length) * 100 : 0;
  const closingDiscipline = items.length ? (closedCount / items.length) * 100 : 0;
  const planRows = sellerPlanRows(items);
  const totalPlan = planTotal();
  const planFulfillment = totalPlan ? Math.round((total / totalPlan) * 100) : 0;
  const averagePlanFulfillment = sellerPlanAverage(planRows);

  const globalRows = [
    {
      name: "Pipeline total",
      target: "$350,000.00",
      actual: formatMoney(total),
      percent: Math.round((total / 350000) * 100),
      note: "Meta mensual de oportunidades registradas"
    },
    {
      name: "Pipeline ponderado",
      target: "$250,000.00",
      actual: formatMoney(weightedTotal),
      percent: Math.round((weightedTotal / 250000) * 100),
      note: "Monto ajustado por probabilidad de cierre"
    },
    {
      name: "Oportunidades calientes",
      target: "40% o mas",
      actual: `${Math.round(hotRate)}%`,
      percent: Math.round((hotRate / 40) * 100),
      note: `${hotCount} oportunidades con probabilidad alta`
    },
    {
      name: "Disciplina de cierre",
      target: "35% cerradas",
      actual: `${Math.round(closingDiscipline)}%`,
      percent: Math.round((closingDiscipline / 35) * 100),
      note: `${closedCount} cerradas y ${openCount} abiertas`
    },
    {
      name: "Efectividad de cierre",
      target: "60% ganadas",
      actual: `${Math.round(wonRate)}%`,
      percent: Math.round((wonRate / 60) * 100),
      note: `${won.length} ganadas / ${lost.length} perdidas`
    },
    {
      name: "Plan operativo total",
      target: formatMoney(totalPlan),
      actual: formatMoney(total),
      percent: planFulfillment,
      note: "Cumplimiento acumulado contra plan operativo 2026"
    },
    {
      name: "Promedio plan vendedores",
      target: "100%",
      actual: `${averagePlanFulfillment}%`,
      percent: averagePlanFulfillment,
      note: "Promedio simple de cumplimiento por vendedor"
    }
  ];

  const sellerRows = planRows
    .filter((row) => row.type !== "channel")
    .map((row) => ({
      name: `Plan ${row.seller}`,
      target: formatMoney(row.plan),
      actual: formatMoney(row.actual),
      percent: row.percent,
      note: `${row.count} oportunidades${row.type === "vacancy" ? " · plaza vacante" : ""}`
    }));

  return [...globalRows, ...sellerRows];
}

function kpiSemaphore(percent) {
  if (percent >= 100) return ["green", "Cumplido"];
  if (percent >= 80) return ["yellow", "En riesgo"];
  return ["red", "Atencion"];
}

function renderKpiComplianceTable(items) {
  const rows = commercialKpiRows(items);
  const fulfilled = rows.filter((row) => row.percent >= 100).length;
  return `
    <section class="kpi-compliance" aria-label="Tabla de cumplimiento KPI">
      <div class="kpi-compliance-head">
        <div>
          <p class="eyebrow">Control KPI</p>
          <h3>Cumplimiento con semaforo</h3>
        </div>
        <span class="status-pill">${fulfilled} de ${rows.length} cumplidos</span>
      </div>
      <div class="kpi-compliance-table">
        <div class="kpi-compliance-row kpi-compliance-header">
          <strong>KPI</strong>
          <strong>Meta</strong>
          <strong>Actual</strong>
          <strong>Cumplimiento</strong>
          <strong>Semaforo</strong>
          <strong>Lectura</strong>
        </div>
        ${rows.map((row) => {
          const [statusClass, statusLabel] = kpiSemaphore(row.percent);
          return `
            <div class="kpi-compliance-row">
              <strong>${row.name}</strong>
              <span>${row.target}</span>
              <span>${row.actual}</span>
              <span>
                <span class="kpi-progress"><i style="width:${Math.min(row.percent, 120)}%"></i></span>
                <small>${row.percent}%</small>
              </span>
              <span class="semaphore ${statusClass}">
                <i></i>${statusLabel}
              </span>
              <span>${row.note}</span>
            </div>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function adminPermissionSummary(user) {
  if (isAdminUser(user)) return "Todos los permisos";
  const permissions = userPermissions(user);
  const areaLabels = areaKeys
    .map((areaKey) => {
      const count = areaPermissionSections(areaKey)
        .filter((section) => permissions.has(permissionKey(areaKey, section.key)))
        .length;
      return count ? `${areas[areaKey].nav}: ${count}` : "";
    })
    .filter(Boolean);
  const managementCount = adminManagementPermissionSections
    .filter((section) => permissions.has(permissionKey(adminAreaKey, section.key))).length;
  if (managementCount) areaLabels.push(`Administración: ${managementCount}`);
  const consolidatedCount = adminConsolidatedPermissionSections
    .filter((section) => permissions.has(permissionKey(adminAreaKey, section.key))).length;
  if (consolidatedCount) areaLabels.push(`Consolidados: ${consolidatedCount}`);
  const minuteCount = adminMinutePermissionSections
    .filter((section) => permissions.has(permissionKey(adminAreaKey, section.key))).length;
  if (minuteCount) areaLabels.push(`Actas: ${minuteCount}`);
  return areaLabels.length ? areaLabels.join(" · ") : "Sin permisos";
}

function adminPermissionModules(user) {
  if (isAdminUser(user)) {
    return [{ label: "Acceso total", count: allPermissionKeys().length, total: true }];
  }
  const permissions = userPermissions(user);
  const modules = areaKeys
    .map((areaKey) => {
      const count = areaPermissionSections(areaKey)
        .filter((section) => permissions.has(permissionKey(areaKey, section.key)))
        .length;
      return count ? { label: areas[areaKey].nav, count } : null;
    })
    .filter(Boolean);
  const managementCount = adminManagementPermissionSections
    .filter((section) => permissions.has(permissionKey(adminAreaKey, section.key))).length;
  if (managementCount) modules.push({ label: "Administración", count: managementCount });
  const consolidatedCount = adminConsolidatedPermissionSections
    .filter((section) => permissions.has(permissionKey(adminAreaKey, section.key))).length;
  if (consolidatedCount) modules.push({ label: "Consolidados", count: consolidatedCount });
  const minuteCount = adminMinutePermissionSections
    .filter((section) => permissions.has(permissionKey(adminAreaKey, section.key))).length;
  if (minuteCount) modules.push({ label: "Actas", count: minuteCount });
  return modules;
}

function adminUserInitials(user) {
  const source = user.name || user.email || user.username || "Usuario";
  return source
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function renderAdminPermissionControls(existingUser = null) {
  if (!adminPermissionGrid) return;
  const role = adminUserRole?.value || existingUser?.role || "gerencias";
  const fullAccessProfile = role === "gerencias";
  const selected = userPermissions({
    ...(existingUser || {}),
    role,
    permissions: existingUser?.role === role
      ? existingUser.permissions
      : defaultPermissionsForRole(role)
  });
  adminPermissionGrid.innerHTML = `${areaKeys.map((areaKey) => `
    <fieldset class="permission-group">
      <legend>${areas[areaKey].nav}</legend>
      ${areaPermissionSections(areaKey).map((section) => {
        const key = permissionKey(areaKey, section.key);
        return `
          <label class="permission-check">
            <input type="checkbox" value="${key}" ${selected.has(key) ? "checked" : ""} ${fullAccessProfile ? "disabled" : ""}>
            <span>${section.label}</span>
          </label>
        `;
      }).join("")}
    </fieldset>
  `).join("")}
    <fieldset class="permission-group">
      <legend>Administración</legend>
      ${adminManagementPermissionSections.map((section) => {
        const key = permissionKey(adminAreaKey, section.key);
        return `
          <label class="permission-check">
            <input type="checkbox" value="${key}" ${selected.has(key) ? "checked" : ""} ${fullAccessProfile ? "disabled" : ""}>
            <span>${section.label}</span>
          </label>
        `;
      }).join("")}
    </fieldset>
    <fieldset class="permission-group">
      <legend>Riesgos y solicitudes</legend>
      ${adminConsolidatedPermissionSections.map((section) => {
        const key = permissionKey(adminAreaKey, section.key);
        return `
          <label class="permission-check">
            <input type="checkbox" value="${key}" ${selected.has(key) ? "checked" : ""} ${fullAccessProfile ? "disabled" : ""}>
            <span>${section.label}</span>
          </label>
        `;
      }).join("")}
    </fieldset>
    <fieldset class="permission-group">
      <legend>Actas</legend>
      ${adminMinutePermissionSections.map((section) => {
        const key = permissionKey(adminAreaKey, section.key);
        return `
          <label class="permission-check">
            <input type="checkbox" value="${key}" ${selected.has(key) ? "checked" : ""} ${fullAccessProfile ? "disabled" : ""}>
            <span>${section.label}</span>
          </label>
        `;
      }).join("")}
    </fieldset>`;
}

function collectAdminPermissions() {
  if (!adminPermissionGrid) return [];
  return [...adminPermissionGrid.querySelectorAll("input[type='checkbox']:checked")]
    .map((input) => input.value);
}

function openAdminUserDialog(userId = "") {
  if (!adminUserDialog) return;
  const user = systemUsers.find((item) => item.id === userId);
  adminUserDialogTitle.textContent = user ? "Editar usuario" : "Nuevo usuario";
  adminUserId.value = user?.id || "";
  adminUserName.value = user?.name || "";
  adminUsername.value = user?.username || "";
  adminUserEmail.value = user?.email || "";
  adminUserRole.innerHTML = accessRoles
    .map(([key, label]) => `<option value="${key}">${label}</option>`)
    .join("");
  adminUserRole.value = user?.role || "gerencias";
  adminUserPassword.value = user?.password || "";
  adminUserPassword.dataset.originalPassword = user?.password || "";
  adminUserPassword.required = !user;
  renderAdminPermissionControls(user || null);
  adminUserDialog.showModal();
}

function syncCurrentUserFromSystem() {
  if (!state.currentUser) return;
  const current = systemUsers.find((user) =>
    user.id === state.currentUser.id ||
    normalizeKey(user.email) === normalizeKey(state.currentUser.email) ||
    normalizeKey(user.username) === normalizeKey(state.currentUser.username)
  );
  if (current) {
    state.currentUser = current;
    state.role = current.role;
  }
}

async function saveAdminUserFromForm(event) {
  event.preventDefault();
  const userId = adminUserId.value;
  const username = adminUsername.value.trim();
  const email = adminUserEmail.value.trim();
  const conflict = systemUsers.some((user) => user.id !== userId && (
    normalizeKey(user.username) === normalizeKey(username) ||
    normalizeKey(user.email) === normalizeKey(email)
  ));
  if (conflict) {
    alert("Ya existe un usuario con ese correo o usuario.");
    return;
  }
  const existing = systemUsers.find((user) => user.id === userId);
  const admin = normalizeKey(email) === adminEmail;
  const role = admin ? "gerencias" : adminUserRole.value;
  const newPassword = adminUserPassword.value;
  const passwordChanged = !existing || newPassword !== (adminUserPassword.dataset.originalPassword || "");
  const payload = {
    id: userId || crypto.randomUUID(),
    name: adminUserName.value.trim(),
    username,
    email,
    role,
    admin,
    permissionsCustomized: role !== "gerencias",
    permissions: (admin || role === "gerencias") ? allPermissionKeys() : collectAdminPermissions()
  };
  if (passwordChanged) payload.password = newPassword;

  try {
    let savedUser = { ...existing, ...payload, password: newPassword || existing?.password || "admin123" };
    if (apiEnabled) {
      const result = await apiJson(userId ? `/api/users/${encodeURIComponent(userId)}` : "/api/users", {
        method: userId ? "PATCH" : "POST",
        body: JSON.stringify(payload)
      });
      savedUser = result.user;
    }
    systemUsers = userId
      ? systemUsers.map((user) => user.id === userId ? savedUser : user)
      : [...systemUsers, savedUser];
    saveUsers({ sync: false });
    fillUserAccessOptions();
    adminUserDialog.close();
    renderDashboard();
    alert(passwordChanged ? "Usuario y contraseña guardados correctamente." : "Usuario guardado. La contraseña actual se conservó.");
  } catch (error) {
    alert("No se pudo guardar el usuario. La contraseña no fue modificada. Intenta nuevamente.");
  }
}

function openAdminPasswordDialog(userId) {
  if (!adminPasswordDialog) return;
  const user = systemUsers.find((item) => item.id === userId);
  if (!user) return;
  adminPasswordUserId.value = user.id;
  adminPasswordUserLabel.textContent = `${user.name} · ${user.email || user.username}`;
  adminPasswordValue.value = "";
  adminPasswordDialog.showModal();
}

async function resetAdminPasswordFromForm(event) {
  event.preventDefault();
  const userId = adminPasswordUserId.value;
  const password = adminPasswordValue.value;
  try {
    let savedUser = systemUsers.find((user) => user.id === userId);
    if (apiEnabled) {
      const result = await apiJson(`/api/users/${encodeURIComponent(userId)}`, {
        method: "PATCH",
        body: JSON.stringify({ password })
      });
      savedUser = result.user;
    } else {
      savedUser = { ...savedUser, password };
    }
    systemUsers = systemUsers.map((user) => user.id === userId ? savedUser : user);
    saveUsers({ sync: false });
    adminPasswordDialog.close();
    renderDashboard();
    alert("Contraseña actualizada correctamente para web y app.");
  } catch (error) {
    alert("No se pudo actualizar la contraseña. Intenta nuevamente.");
  }
}

function openAccountPasswordDialog() {
  if (!accountPasswordDialog || !state.currentUser) return;
  accountPasswordForm.reset();
  accountPasswordError.textContent = "";
  accountPasswordError.classList.add("hidden");
  accountPasswordDialog.showModal();
  accountCurrentPassword.focus();
}

function showAccountPasswordError(message) {
  accountPasswordError.textContent = message;
  accountPasswordError.classList.remove("hidden");
}

async function changeCurrentUserPassword(event) {
  event.preventDefault();
  if (!state.currentUser) return;
  const currentPassword = accountCurrentPassword.value;
  const newPassword = accountNewPassword.value;
  const confirmation = accountConfirmPassword.value;
  if (newPassword !== confirmation) {
    showAccountPasswordError("La confirmacion no coincide con la nueva contrasena.");
    return;
  }
  if (newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
    showAccountPasswordError("La nueva contrasena debe tener 8 caracteres, una letra y un numero.");
    return;
  }
  if (newPassword === currentPassword) {
    showAccountPasswordError("La nueva contrasena debe ser diferente de la actual.");
    return;
  }
  try {
    let savedUser;
    if (apiEnabled) {
      const result = await apiJson(`/api/users/${encodeURIComponent(state.currentUser.id)}/password`, {
        method: "PATCH",
        body: JSON.stringify({ currentPassword, newPassword })
      });
      savedUser = result.user;
    } else {
      if (state.currentUser.password !== currentPassword) throw new Error("current-password");
      savedUser = { ...state.currentUser, password: newPassword };
    }
    systemUsers = systemUsers.map((user) => user.id === savedUser.id ? savedUser : user);
    state.currentUser = savedUser;
    saveUsers({ sync: false });
    persistSession(savedUser);
    accountPasswordDialog.close();
    alert("Contrasena actualizada correctamente para web y app.");
  } catch (error) {
    showAccountPasswordError("La contrasena actual no es correcta o no se pudo guardar el cambio.");
  }
}

function deleteAdminUser(userId) {
  const user = systemUsers.find((item) => item.id === userId);
  if (!user || isAdminUser(user)) return;
  if (!confirm(`Eliminar usuario ${user.name}?`)) return;
  systemUsers = systemUsers.filter((item) => item.id !== userId);
  saveUsers();
  renderDashboard();
}

function modulePermissionCount(user, areaKey) {
  const permissions = userPermissions(user);
  return areaPermissionSections(areaKey)
    .filter((section) => permissions.has(permissionKey(areaKey, section.key))).length;
}

function updateUserModulePermission(userId, areaKey, enabled) {
  systemUsers = systemUsers.map((user) => {
    if (user.id !== userId || isAdminUser(user)) return user;
    const existing = new Set(normalizePermissionList(user.permissions, user.role));
    areaPermissionSections(areaKey).forEach((section) => {
      const key = permissionKey(areaKey, section.key);
      if (enabled) existing.add(key);
      else existing.delete(key);
    });
    return { ...user, permissions: [...existing], permissionsCustomized: true };
  });
  saveUsers();
  renderAdminPanel();
}

function adminOperationalPermissionColumns() {
  return [
    ...areaKeys.flatMap((areaKey) => areaPermissionSections(areaKey).map((section) => ({
      areaKey,
      areaLabel: areas[areaKey].nav,
      sectionKey: section.key,
      label: section.label,
      key: permissionKey(areaKey, section.key)
    }))),
    ...adminManagementPermissionSections.map((section) => ({
      areaKey: adminAreaKey,
      areaLabel: "Administración",
      sectionKey: section.key,
      label: section.label,
      key: permissionKey(adminAreaKey, section.key)
    })),
    ...adminConsolidatedPermissionSections.map((section) => ({
      areaKey: adminAreaKey,
      areaLabel: "Riesgos y solicitudes",
      sectionKey: section.key,
      label: section.label,
      key: permissionKey(adminAreaKey, section.key)
    })),
    ...adminMinutePermissionSections.map((section) => ({
      areaKey: adminAreaKey,
      areaLabel: "Actas",
      sectionKey: section.key,
      label: section.label,
      key: permissionKey(adminAreaKey, section.key)
    }))
  ];
}

function setUserOperationalPermission(userId, permission, enabled) {
  systemUsers = systemUsers.map((user) => {
    if (user.id !== userId || isAdminUser(user)) return user;
    const permissions = new Set(normalizePermissionList(user.permissions, user.role));
    if (enabled) permissions.add(permission);
    else permissions.delete(permission);
    return { ...user, permissions: [...permissions], permissionsCustomized: true };
  });
  saveUsers();
  renderAdminPanel();
}

function setUsersOperationalPermission(permission, enabled) {
  systemUsers = systemUsers.map((user) => {
    if (isAdminUser(user)) return user;
    const permissions = new Set(normalizePermissionList(user.permissions, user.role));
    if (enabled) permissions.add(permission);
    else permissions.delete(permission);
    return { ...user, permissions: [...permissions], permissionsCustomized: true };
  });
  saveUsers();
  renderAdminPanel();
}

function setUserAllOperationalPermissions(userId, enabled) {
  const operationalKeys = adminOperationalPermissionColumns().map((column) => column.key);
  systemUsers = systemUsers.map((user) => {
    if (user.id !== userId || isAdminUser(user)) return user;
    const permissions = new Set(normalizePermissionList(user.permissions, user.role));
    operationalKeys.forEach((key) => enabled ? permissions.add(key) : permissions.delete(key));
    return { ...user, permissions: [...permissions], permissionsCustomized: true };
  });
  saveUsers();
  renderAdminPanel();
}

function grantAllOperationalPermissionsToUsers() {
  const operationalKeys = adminOperationalPermissionColumns().map((column) => column.key);
  systemUsers = systemUsers.map((user) => isAdminUser(user) ? user : {
    ...user,
    permissionsCustomized: true,
    permissions: [...new Set([...normalizePermissionList(user.permissions, user.role), ...operationalKeys])]
  });
  saveUsers();
  renderAdminPanel();
}

function renderAdminPermissionsPanel() {
  if (!adminPanel) return;
  adminPanel.classList.remove("hidden");
  const users = [...systemUsers].sort((a, b) => a.name.localeCompare(b.name));
  const query = normalizeKey(state.adminQuery);
  const filteredUsers = users.filter((user) => {
    const haystack = normalizeKey([
      user.name,
      user.email,
      user.username,
      roleDisplayName(user.role),
      adminPermissionSummary(user)
    ].join(" "));
    return !query || haystack.includes(query);
  });
  const permissionColumns = adminOperationalPermissionColumns();
  const permissionAreaKeys = [...new Set(permissionColumns.map((column) => column.areaKey))];
  const areaGroups = permissionAreaKeys.map((areaKey) => ({
    areaKey,
    label: areaKey === adminAreaKey ? "Administracion" : areas[areaKey].nav,
    count: permissionColumns.filter((column) => column.areaKey === areaKey).length
  }));
  return `
    <div class="admin-shell admin-permissions-shell">
      <div class="admin-permissions-toolbar">
        <div class="admin-permissions-heading">
          <span>Control de accesos</span>
          <strong>Asignación de permisos</strong>
        </div>
        <label class="admin-search" for="adminSearchInput">
          <span>Buscar usuario</span>
          <input id="adminSearchInput" type="search" value="${escapeHtml(state.adminQuery)}" placeholder="Nombre, correo o perfil">
        </label>
        <div class="admin-permissions-actions">
          <span class="admin-toolbar-pill"><i aria-hidden="true"></i>${filteredUsers.length} de ${users.length} usuarios</span>
          <button class="admin-grant-all" type="button" data-admin-action="grant-all-users"><span>✓</span> Dar acceso total</button>
          <button class="admin-new-user" type="button" data-admin-action="new"><span aria-hidden="true">+</span> Nuevo usuario</button>
        </div>
      </div>

      <div class="permission-matrix-shell" style="--permission-columns:${permissionColumns.length}">
        ${filteredUsers.length ? `<table class="permission-access-table" aria-label="Matriz de permisos por usuario">
          <colgroup>
            <col class="permission-access-user-column">
            ${permissionColumns.map(() => `<col class="permission-access-module-column">`).join("")}
          </colgroup>
          <thead>
            <tr class="permission-access-area-row">
              <th class="permission-access-user-head" scope="col"><span>Usuarios</span><small>Fijos al desplazar</small></th>
              ${areaGroups.map((group) => `<th class="permission-access-area-head" colspan="${group.count}" scope="colgroup"><strong>${escapeHtml(group.label)}</strong><small>${group.count} ${group.count === 1 ? "acceso" : "accesos"}</small></th>`).join("")}
            </tr>
            <tr class="permission-access-module-row">
              <th class="permission-access-bulk-head" scope="row">
                <strong>Aplicar a todos</strong>
                <small>Estas casillas modifican el módulo para todos los usuarios.</small>
              </th>
              ${permissionColumns.map((column) => {
                const enabledCount = filteredUsers.filter((user) => userPermissions(user).has(column.key)).length;
                return `<th class="permission-access-module-head" scope="col"><label aria-label="Aplicar ${escapeHtml(column.areaLabel)} · ${escapeHtml(column.label)} a todos los usuarios" title="Aplicar este módulo a todos los usuarios">
                  <input type="checkbox" data-admin-action="column-permission" data-permission="${column.key}" ${enabledCount === filteredUsers.length ? "checked" : ""}>
                  <span aria-hidden="true"></span><strong>${escapeHtml(column.label)}</strong>
                </label></th>`;
              }).join("")}
            </tr>
          </thead>
          <tbody>
          ${filteredUsers.map((user) => {
            const permissions = userPermissions(user);
            const activeCount = permissionColumns.filter((column) => permissions.has(column.key)).length;
            const isProtected = isAdminUser(user);
            const permissionsLocked = isProtected || user.role === "gerencias";
            return `<tr class="permission-access-row ${permissionsLocked ? "admin-owner" : ""}">
              <th class="permission-access-user" scope="row">
                <div class="permission-access-user-inner">
                  <span class="admin-avatar" aria-hidden="true">${escapeHtml(adminUserInitials(user))}</span>
                  <div class="permission-access-user-copy"><strong>${escapeHtml(user.name)}</strong><span>${escapeHtml(roleDisplayName(user.role))}</span><small>${activeCount}/${permissionColumns.length} permisos</small></div>
                  <label class="permission-row-toggle" aria-label="Cambiar todos los permisos de ${escapeHtml(user.name)}"><input type="checkbox" data-admin-action="row-permission" data-user-id="${user.id}" ${activeCount === permissionColumns.length ? "checked" : ""} ${permissionsLocked ? "disabled" : ""}><span aria-hidden="true"></span></label>
                  <div class="permission-access-user-actions">
                    <button type="button" aria-label="Editar usuario" data-admin-action="edit" data-user-id="${user.id}"><b aria-hidden="true">✎</b><span>Editar</span></button>
                    <button type="button" aria-label="Cambiar clave" data-admin-action="password" data-user-id="${user.id}"><b aria-hidden="true">⌁</b><span>Clave</span></button>
                    ${isProtected ? "" : `<button class="danger" type="button" aria-label="Eliminar usuario" data-admin-action="delete" data-user-id="${user.id}"><b aria-hidden="true">⌫</b><span>Eliminar</span></button>`}
                  </div>
                </div>
              </th>
              ${permissionColumns.map((column) => `<td class="permission-access-cell ${permissionsLocked ? "locked" : ""}"><label aria-label="${escapeHtml(user.name)} · ${escapeHtml(column.areaLabel)} · ${escapeHtml(column.label)}"><input type="checkbox" data-admin-action="cell-permission" data-user-id="${user.id}" data-permission="${column.key}" ${permissions.has(column.key) ? "checked" : ""} ${permissionsLocked ? "disabled" : ""}><span aria-hidden="true"></span></label></td>`).join("")}
            </tr>`;
          }).join("")}
          </tbody>
        </table>` : `
          <div class="admin-empty">
            <strong>No hay usuarios con ese criterio.</strong>
            <span>Prueba con otro nombre, correo o gerencia.</span>
          </div>
        `}
      </div>
    </div>
  `;
}

function wireAdminPermissionsPanel() {
  const searchInput = adminPanel.querySelector("#adminSearchInput");
  searchInput?.addEventListener("input", (event) => {
    state.adminQuery = event.target.value;
    renderAdminPanel();
  });
  adminPanel.querySelector("[data-admin-action='new']")?.addEventListener("click", () => openAdminUserDialog());
  adminPanel.querySelector("[data-admin-action='grant-all-users']")?.addEventListener("click", () => {
    if (confirm("Asignar todas las vistas operativas a todos los usuarios registrados?")) grantAllOperationalPermissionsToUsers();
  });
  adminPanel.querySelectorAll("[data-admin-action='edit']").forEach((button) => {
    button.addEventListener("click", () => openAdminUserDialog(button.dataset.userId));
  });
  adminPanel.querySelectorAll("[data-admin-action='password']").forEach((button) => {
    button.addEventListener("click", () => openAdminPasswordDialog(button.dataset.userId));
  });
  adminPanel.querySelectorAll("[data-admin-action='delete']").forEach((button) => {
    button.addEventListener("click", () => deleteAdminUser(button.dataset.userId));
  });
  adminPanel.querySelectorAll("[data-admin-action='cell-permission']").forEach((input) => {
    input.addEventListener("change", () => {
      setUserOperationalPermission(input.dataset.userId, input.dataset.permission, input.checked);
    });
  });
  adminPanel.querySelectorAll("[data-admin-action='column-permission']").forEach((input) => input.addEventListener("change", () => setUsersOperationalPermission(input.dataset.permission, input.checked)));
  adminPanel.querySelectorAll("[data-admin-action='row-permission']").forEach((input) => input.addEventListener("change", () => setUserAllOperationalPermissions(input.dataset.userId, input.checked)));
}

function crmSellerReferenceCount(sellerId) {
  const data = state.crmData || {};
  return (data.opportunities || []).filter((item) => item.ownerId === sellerId).length
    + (data.agenda || []).filter((item) => item.ownerId === sellerId).length;
}

function crmSellerLinkedSystemUser(seller = {}) {
  if (!seller?.id || !Array.isArray(systemUsers)) return null;
  const sellerIdentities = [seller.name, seller.email, seller.username]
    .map(crmIdentityKey)
    .filter(Boolean);
  return systemUsers.find((user) => {
    const userIdentities = [user.name, user.email, user.username, String(user.email || "").split("@")[0]]
      .map(crmIdentityKey)
      .filter(Boolean);
    return userIdentities.some((identity) => {
      return sellerIdentities.includes(identity) || crmSellerAccountLinks.get(identity) === seller.id;
    });
  }) || null;
}

function crmDuplicateSeller(values = {}, excludedId = "") {
  const identityFields = ["name", "email", "username"];
  return crmMasterSalesUsers({ includeInactive: true }).find((seller) => {
    if (seller.id === excludedId) return false;
    return identityFields.some((field) => {
      const incoming = crmIdentityKey(values[field]);
      return incoming && incoming === crmIdentityKey(seller[field]);
    });
  }) || null;
}

function adminSellerInitials(name = "") {
  return String(name).split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "V";
}

function renderAdminSellersPanel() {
  const sellers = [...crmMasterSalesUsers({ includeInactive: true })].sort((a, b) => {
    return Number(isActiveCrmSeller(b)) - Number(isActiveCrmSeller(a)) || String(a.name).localeCompare(String(b.name));
  });
  const query = normalizeKey(state.adminSellerQuery);
  const filtered = sellers.filter((seller) => !query || normalizeKey([seller.name, seller.email, seller.username, seller.phone, seller.territory].join(" ")).includes(query));
  const editing = sellers.find((seller) => seller.id === state.adminSellerEditingId) || null;
  const activeCount = sellers.filter(isActiveCrmSeller).length;
  const references = editing ? crmSellerReferenceCount(editing.id) : 0;
  const linkedSystemUser = editing ? crmSellerLinkedSystemUser(editing) : null;
  return `<section class="seller-admin-shell">
    <header class="seller-admin-hero">
      <div><span>Catálogo maestro</span><h2>Vendedores</h2><p>Una sola fuente para oportunidades, seguimiento, cotizaciones, pedidos y filtros.</p></div>
      <div class="seller-admin-stats"><span><strong>${activeCount}</strong>Activos</span><span><strong>${sellers.length - activeCount}</strong>Inactivos</span><span><strong>${sellers.length}</strong>Total</span></div>
    </header>
    <div class="seller-admin-layout">
      <aside class="seller-admin-directory">
        <div class="seller-admin-tools"><label><span>⌕</span><input id="adminSellerSearch" type="search" value="${escapeHtml(state.adminSellerQuery)}" placeholder="Buscar vendedor..."></label><button type="button" data-seller-action="new">+ Nuevo</button></div>
        <div class="seller-admin-list">${filtered.length ? filtered.map((seller) => {
          const linked = crmSellerReferenceCount(seller.id);
          return `<button type="button" class="seller-admin-item ${editing?.id === seller.id ? "is-selected" : ""} ${isActiveCrmSeller(seller) ? "" : "is-inactive"}" data-seller-action="edit" data-seller-id="${escapeHtml(seller.id)}">
            <i>${escapeHtml(adminSellerInitials(seller.name))}</i><span><strong>${escapeHtml(seller.name)}</strong><small>${escapeHtml(seller.email || seller.phone || "Sin contacto")}</small></span>
            <em>${linked ? `${linked} vínculos` : isActiveCrmSeller(seller) ? "Activo" : "Inactivo"}</em>
          </button>`;
        }).join("") : `<div class="seller-admin-empty">No hay vendedores con ese criterio.</div>`}</div>
      </aside>
      <form class="seller-admin-form" id="adminSellerForm" data-seller-id="${escapeHtml(editing?.id || "")}">
        <div class="seller-admin-form-head"><div><span>${editing ? "Mantenimiento" : "Nuevo registro"}</span><h3>${editing ? escapeHtml(editing.name) : "Agregar vendedor"}</h3></div>${editing && references ? `<b>Vinculado a ${references} movimientos</b>` : ""}</div>
        ${state.adminSellerNotice ? `<div class="seller-admin-notice">${escapeHtml(state.adminSellerNotice)}</div>` : ""}
        ${linkedSystemUser ? `<div class="seller-admin-notice">Usuario operativo vinculado: <strong>${escapeHtml(linkedSystemUser.name || linkedSystemUser.email || linkedSystemUser.username)}</strong>. Se conserva el mismo vendedor, identificador e historial.</div>` : ""}
        <div class="seller-admin-fields">
          <label class="wide"><span>Nombre completo</span><input name="name" required value="${escapeHtml(editing?.name || "")}" placeholder="Nombre y apellido"></label>
          <label><span>Teléfono</span><input name="phone" value="${escapeHtml(editing?.phone || "")}" placeholder="+503 ..."></label>
          <label><span>Correo</span><input name="email" type="email" value="${escapeHtml(editing?.email || "")}" placeholder="correo@empresa.com"></label>
          <label><span>Usuario CRM</span><input name="username" value="${escapeHtml(editing?.username || "")}" placeholder="usuario"></label>
          <label><span>Territorio / zona</span><input name="territory" value="${escapeHtml(editing?.territory || "")}" placeholder="Zona asignada"></label>
          <label><span>Estado</span><select name="status"><option value="Activo" ${isActiveCrmSeller(editing || {}) ? "selected" : ""}>Activo</option><option value="Inactivo" ${editing && !isActiveCrmSeller(editing) ? "selected" : ""}>Inactivo</option></select></label>
        </div>
        <p class="seller-admin-rule">Los vendedores con movimientos no se eliminan: se desactivan para conservar oportunidades, cotizaciones y pedidos. Marjorie y Gabriela mantienen sus registros e identificadores actuales.</p>
        <div class="seller-admin-actions">
          ${editing ? `<button class="seller-danger" type="button" data-seller-action="delete">${references ? "Eliminar vendedor y vínculos" : "Eliminar"}</button>` : ""}
          <span></span><button type="button" data-seller-action="cancel">Cancelar</button><button class="seller-primary" type="submit">${editing ? "Guardar cambios" : "Crear vendedor"}</button>
        </div>
      </form>
    </div>
  </section>`;
}

function wireAdminSellersPanel() {
  adminPanel.querySelector("#adminSellerSearch")?.addEventListener("input", (event) => {
    state.adminSellerQuery = event.target.value;
    renderAdminPanel();
  });
  adminPanel.querySelectorAll("[data-seller-action='edit']").forEach((button) => button.addEventListener("click", () => {
    state.adminSellerEditingId = button.dataset.sellerId;
    state.adminSellerNotice = "";
    renderAdminPanel();
  }));
  adminPanel.querySelector("[data-seller-action='new']")?.addEventListener("click", () => {
    state.adminSellerEditingId = "";
    state.adminSellerNotice = "";
    renderAdminPanel();
  });
  adminPanel.querySelector("[data-seller-action='cancel']")?.addEventListener("click", () => {
    state.adminSellerEditingId = "";
    state.adminSellerNotice = "";
    renderAdminPanel();
  });
  adminPanel.querySelector("#adminSellerForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const sellerId = form.dataset.sellerId;
    const duplicate = crmDuplicateSeller(values, sellerId);
    if (duplicate) {
      state.adminSellerEditingId = duplicate.id;
      state.adminSellerNotice = "Ya existe un vendedor con ese nombre, correo o usuario. Se abrió su registro actual para evitar duplicados.";
      renderAdminPanel();
      return;
    }
    const payload = { ...values, roleId: "sales_exec", initials: adminSellerInitials(values.name) };
    try {
      await crmApi(sellerId ? `/users/${encodeURIComponent(sellerId)}` : "/users", { method: sellerId ? "PATCH" : "POST", body: JSON.stringify(payload) });
      state.adminSellerEditingId = sellerId || crmMasterSalesUsers({ includeInactive: true }).find((seller) => normalizeKey(seller.name) === normalizeKey(values.name))?.id || "";
      state.adminSellerNotice = "Vendedor guardado. Los paneles ya utilizan este catálogo centralizado.";
      renderAdminPanel();
    } catch (error) {
      state.adminSellerNotice = error.message || "No fue posible guardar el vendedor.";
      renderAdminPanel();
    }
  });
  adminPanel.querySelector("[data-seller-action='delete']")?.addEventListener("click", async () => {
    const sellerId = state.adminSellerEditingId;
    const seller = crmMasterSalesUsers({ includeInactive: true }).find((item) => item.id === sellerId);
    if (!seller) return;
    const references = crmSellerReferenceCount(sellerId);
    const warning = references
      ? `¿Eliminar definitivamente a ${seller.name} y sus ${references} vínculos?\n\nSe borrarán sus oportunidades, historial, seguimiento, agenda y cotizaciones no convertidas. La cuenta de acceso al sistema no será eliminada.`
      : `¿Eliminar definitivamente a ${seller.name}? No tiene movimientos vinculados.`;
    if (!confirm(warning)) return;
    try {
      state.adminSellerEditingId = "";
      await crmApi(references ? `/users/${encodeURIComponent(sellerId)}/purge` : `/users/${encodeURIComponent(sellerId)}`, { method: references ? "POST" : "DELETE", body: references ? "{}" : undefined });
      getOpportunitySubmenu().items = getOpportunitySubmenu().items.filter((item) => normalizeKey(item.seller) !== normalizeKey(seller.name));
      state.quotations = state.quotations.filter((item) => normalizeKey(item.seller) !== normalizeKey(seller.name));
      localStorage.setItem(opportunitiesStorageKey, JSON.stringify(getOpportunitySubmenu().items));
      persistLocalQuotations();
      state.adminSellerNotice = "Vendedor y vínculos comerciales eliminados. La cuenta de acceso se conservó.";
      renderAdminPanel();
    } catch (error) {
      state.adminSellerNotice = `${error.message}. Puedes cambiar su estado a Inactivo.`;
      renderAdminPanel();
    }
  });
}

function sanitizeMinuteBody(html = "") {
  const template = document.createElement("template");
  template.innerHTML = html;
  const allowedTags = new Set(["B", "STRONG", "I", "EM", "U", "P", "BR", "UL", "OL", "LI", "DIV"]);
  template.content.querySelectorAll("*").forEach((node) => {
    if (!allowedTags.has(node.tagName)) {
      node.replaceWith(document.createTextNode(node.textContent || ""));
      return;
    }
    [...node.attributes].forEach((attribute) => node.removeAttribute(attribute.name));
  });
  return template.innerHTML;
}

function normalizeMinute(item = {}) {
  return {
    id: item.id || `acta-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: item.title || "Acta sin titulo",
    area: item.area || "Comite de apoyo",
    date: item.date || new Date().toISOString().slice(0, 10),
    body: sanitizeMinuteBody(item.body || ""),
    createdBy: item.createdBy || state.currentUser?.name || "KMI",
    createdAt: item.createdAt || new Date().toISOString()
  };
}

function loadMinutes() {
  const loadLocalMinutes = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(minutesStorageKey) || "[]");
      return Array.isArray(saved) ? saved.map(normalizeMinute) : [];
    } catch {
      return [];
    }
  };
  state.minutes = loadLocalMinutes();
  if (!apiEnabled) return;
  apiJson("/api/minutes")
    .then((items) => {
      state.minutes = Array.isArray(items) ? items.map(normalizeMinute) : [];
      localStorage.setItem(minutesStorageKey, JSON.stringify(state.minutes));
      if (state.activeArea === adminAreaKey && state.activeSubmenu === "actas") renderAdminPanel();
    })
    .catch(() => {});
}

function saveMinute(item) {
  const minute = normalizeMinute(item);
  state.minutes = [minute, ...state.minutes.filter((entry) => entry.id !== minute.id)];
  localStorage.setItem(minutesStorageKey, JSON.stringify(state.minutes));
  if (apiEnabled) {
    apiJson("/api/minutes", {
      method: "POST",
      body: JSON.stringify(minute)
    }).catch(() => {});
  }
  renderAdminPanel();
}

function deleteMinute(id) {
  const minute = state.minutes.find((item) => item.id === id);
  if (!minute) return;
  if (!confirm(`Eliminar el acta "${minute.title}"?`)) return;
  state.minutes = state.minutes.filter((item) => item.id !== id);
  localStorage.setItem(minutesStorageKey, JSON.stringify(state.minutes));
  if (apiEnabled) {
    apiJson(`/api/minutes/${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {});
  }
  renderAdminPanel();
}

function minuteAreaOptions(selectedArea = "Comite de apoyo") {
  const options = ["Comite de apoyo", ...areaKeys.map((key) => areas[key].nav)];
  return options.map((option) => `
    <option ${option === selectedArea ? "selected" : ""}>${escapeHtml(option)}</option>
  `).join("");
}

function minuteFormMarkup({ item = null, prefix = "minute", panoramic = false } = {}) {
  const minute = item ? {
    ...normalizeMinute(item),
    id: item.id || "",
    title: item.title || "",
    body: sanitizeMinuteBody(item.body || ""),
    createdAt: item.createdAt || "",
    createdBy: item.createdBy || ""
  } : null;
  const title = minute?.title || "";
  const area = minute?.area || "Comite de apoyo";
  const date = minute?.date || new Date().toISOString().slice(0, 10);
  const body = minute?.body || "";
  return `
    <section class="minutes-editor-card ${panoramic ? "panoramic-editor-card" : ""}" data-minute-form aria-label="${minute ? "Editar acta" : "Nueva acta"}">
      <input type="hidden" data-minute-field="id" value="${escapeHtml(minute?.id || "")}">
      <input type="hidden" data-minute-field="createdAt" value="${escapeHtml(minute?.createdAt || "")}">
      <input type="hidden" data-minute-field="createdBy" value="${escapeHtml(minute?.createdBy || "")}">
      <div class="minutes-editor-head">
        <div>
          <p class="eyebrow">${minute ? "Editar acta" : "Nueva acta"}</p>
          <h4>${minute ? escapeHtml(minute.title) : "Acuerdos del comite"}</h4>
          <p class="minute-editor-subtitle">${minute ? "Actualiza acuerdos, responsables y compromisos del acta." : "Redacta el acta con formato ejecutivo y guarda el historial automaticamente."}</p>
        </div>
        <div class="minutes-head-actions">
          ${panoramic ? "" : `<button class="action-icon-btn minute-action-icon" type="button" title="Vista panoramica" aria-label="Abrir nueva acta en vista panoramica" data-minutes-action="fullscreen-new">⛶</button>`}
          <div class="minutes-toolbar" aria-label="Herramientas de texto">
            <button type="button" data-editor-command="bold" title="Negrita">B</button>
            <button type="button" data-editor-command="italic" title="Cursiva">I</button>
            <button type="button" data-editor-command="underline" title="Subrayado">U</button>
            <button type="button" data-editor-command="insertUnorderedList" title="Lista">☷</button>
            <button type="button" data-editor-command="insertOrderedList" title="Numeracion">1.</button>
          </div>
        </div>
      </div>
      <div class="minutes-fields">
        <label>
          <span>Titulo</span>
          <input data-minute-field="title" type="text" value="${escapeHtml(title)}" placeholder="Ej. Comite de Apoyo - acuerdos semanales">
        </label>
        <label>
          <span>Gerencia / reunion</span>
          <select data-minute-field="area">
            ${minuteAreaOptions(area)}
          </select>
        </label>
        <label>
          <span>Fecha</span>
          <input data-minute-field="date" type="date" value="${escapeHtml(date)}">
        </label>
      </div>
      <div class="minutes-editor" contenteditable="true" role="textbox" aria-multiline="true" data-minute-field="body" data-placeholder="Redacta acuerdos, responsables, fechas compromiso y observaciones...">${body}</div>
      <div class="minutes-actions">
        <button class="ghost-btn compact-btn" type="button" data-minutes-action="${minute ? "cancel-edit" : "clear"}">${minute ? "Cancelar edicion" : "Limpiar"}</button>
        <button class="primary-btn compact-btn" type="button" data-minutes-action="save">${minute ? "Guardar cambios" : "Guardar acta"}</button>
      </div>
    </section>
  `;
}

function collectMinuteFromForm(form) {
  const id = form.querySelector("[data-minute-field='id']")?.value || "";
  const createdAt = form.querySelector("[data-minute-field='createdAt']")?.value || "";
  const createdBy = form.querySelector("[data-minute-field='createdBy']")?.value || "";
  return {
    id: id || undefined,
    title: form.querySelector("[data-minute-field='title']")?.value.trim(),
    area: form.querySelector("[data-minute-field='area']")?.value || "Comite de apoyo",
    date: form.querySelector("[data-minute-field='date']")?.value || new Date().toISOString().slice(0, 10),
    body: form.querySelector("[data-minute-field='body']")?.innerHTML.trim() || "",
    createdAt: createdAt || undefined,
    createdBy: createdBy || undefined
  };
}

function openMinuteFullscreen(item = null) {
  document.querySelector(".minute-fullscreen-overlay")?.remove();
  const overlay = document.createElement("div");
  overlay.className = "minute-fullscreen-overlay";
  overlay.innerHTML = `
    <div class="minute-fullscreen-panel" role="dialog" aria-modal="true" aria-label="${item ? "Editar acta en vista panoramica" : "Nueva acta en vista panoramica"}">
      <button class="action-icon-btn minute-fullscreen-close" type="button" title="Cerrar" aria-label="Cerrar vista panoramica" data-minutes-action="close-fullscreen">×</button>
      ${minuteFormMarkup({ item, prefix: "fullscreen", panoramic: true })}
    </div>
  `;
  document.body.appendChild(overlay);
  wireMinuteForms(overlay);
  overlay.querySelector("[data-minute-field='title']")?.focus();
}

function closeMinuteFullscreen() {
  document.querySelector(".minute-fullscreen-overlay")?.remove();
}

function renderAdminMinutesPanel() {
  const query = normalizeKey(state.adminMinuteQuery);
  const minutes = [...state.minutes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const filtered = minutes.filter((item) => !query || normalizeKey([item.title, item.area, item.createdBy, item.body].join(" ")).includes(query));
  const canCreate = canCreateAdminMinutes();
  const canViewHistory = canViewAdminMinuteHistory();
  const availableViews = [canCreate ? "new" : "", canViewHistory ? "history" : ""].filter(Boolean);
  if (!availableViews.includes(state.adminMinuteView)) state.adminMinuteView = availableViews[0] || "new";
  const editingMinute = canCreate
    ? state.minutes.find((item) => item.id === state.adminMinuteEditId) || null
    : null;
  return `
    <div class="admin-shell minutes-shell">
      <div class="admin-hero minutes-hero">
        <div>
          <p class="eyebrow">Administracion / Actas</p>
          <h3>Actas</h3>
          <p class="muted-copy">Separa la redaccion del historial para trabajar con mayor claridad.</p>
        </div>
        <div class="minutes-counter">
          <span>Actas guardadas</span>
          <strong>${minutes.length}</strong>
        </div>
      </div>

      ${state.adminMinuteView === "new" ? `
        <div id="minuteInlineEditor">
          ${minuteFormMarkup({ item: editingMinute })}
        </div>
      ` : `
        <section class="minutes-history-card" aria-label="Historial de actas">
        <div class="minutes-history-head">
          <div>
            <p class="eyebrow">Historial</p>
            <h4>${filtered.length} actas registradas</h4>
          </div>
          <label class="admin-search compact-search">
            <span>Buscar acta</span>
            <input id="minuteSearchInput" type="search" value="${escapeHtml(state.adminMinuteQuery)}" placeholder="Titulo, gerencia o acuerdo">
          </label>
        </div>
        <div class="minutes-history-list">
          ${filtered.length ? filtered.map((item) => `
            <article class="minute-history-item">
              <div>
                <time>${formatDate(item.date)}</time>
                <strong>${escapeHtml(item.title)}</strong>
                <span>${escapeHtml(item.area)} · ${escapeHtml(item.createdBy)}</span>
              </div>
              <div class="minute-preview">${item.body || "<em>Sin contenido.</em>"}</div>
              <div class="minute-history-actions">
                <button class="action-icon-btn minute-action-icon" type="button" title="Vista panoramica" aria-label="Abrir acta en vista panoramica" data-minutes-action="fullscreen-existing" data-minute-id="${escapeHtml(item.id)}">⛶</button>
                ${canCreate ? `<button class="action-icon-btn minute-action-icon" type="button" title="Editar acta" aria-label="Editar acta" data-minutes-action="edit" data-minute-id="${escapeHtml(item.id)}">✎</button>` : ""}
                ${canCreate ? `<button class="action-icon-btn minute-action-icon danger" type="button" title="Eliminar acta" aria-label="Eliminar acta" data-minutes-action="delete" data-minute-id="${escapeHtml(item.id)}">⌫</button>` : ""}
              </div>
            </article>
          `).join("") : `
            <div class="admin-empty">
              <strong>No hay actas con ese criterio.</strong>
              <span>Guarda la primera acta para iniciar el historial.</span>
            </div>
          `}
        </div>
      </section>`}
    </div>
  `;
}

function resetInlineMinuteEditor() {
  state.adminMinuteEditId = "";
  const wrapper = adminPanel.querySelector("#minuteInlineEditor");
  if (!wrapper) return;
  wrapper.innerHTML = minuteFormMarkup();
  wireMinuteForms(wrapper);
}

function loadMinuteIntoInlineEditor(minuteId) {
  const minute = state.minutes.find((item) => item.id === minuteId);
  if (!minute || !canCreateAdminMinutes()) return;
  state.adminMinuteEditId = minuteId;
  state.adminMinuteView = "new";
  renderAdminPanel();
  adminPanel.querySelector("#minuteInlineEditor")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function wireMinuteForms(root = document) {
  root.querySelectorAll("[data-editor-command]").forEach((button) => {
    button.addEventListener("click", () => {
      const form = button.closest("[data-minute-form]");
      const editor = form?.querySelector("[data-minute-field='body']");
      editor?.focus();
      document.execCommand(button.dataset.editorCommand, false, null);
    });
  });
  root.querySelectorAll("[data-minutes-action='clear']").forEach((button) => {
    button.addEventListener("click", () => {
      const form = button.closest("[data-minute-form]");
      if (!form) return;
      form.querySelector("[data-minute-field='title']").value = "";
      form.querySelector("[data-minute-field='area']").value = "Comite de apoyo";
      form.querySelector("[data-minute-field='date']").value = new Date().toISOString().slice(0, 10);
      form.querySelector("[data-minute-field='body']").innerHTML = "";
    });
  });
  root.querySelectorAll("[data-minutes-action='cancel-edit']").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.closest(".minute-fullscreen-overlay")) closeMinuteFullscreen();
      else resetInlineMinuteEditor();
    });
  });
  root.querySelectorAll("[data-minutes-action='save']").forEach((button) => {
    button.addEventListener("click", () => {
      const form = button.closest("[data-minute-form]");
      if (!form) return;
      const payload = collectMinuteFromForm(form);
      if (!payload.title || !payload.body) {
        alert("Agrega titulo y contenido para guardar el acta.");
        return;
      }
      state.adminMinuteEditId = "";
      saveMinute(payload);
      closeMinuteFullscreen();
    });
  });
  root.querySelectorAll("[data-minutes-action='fullscreen-new']").forEach((button) => {
    button.addEventListener("click", () => {
      const form = button.closest("[data-minute-form]");
      openMinuteFullscreen(form ? collectMinuteFromForm(form) : null);
    });
  });
  root.querySelectorAll("[data-minutes-action='fullscreen-existing']").forEach((button) => {
    button.addEventListener("click", () => {
      const minute = state.minutes.find((item) => item.id === button.dataset.minuteId);
      openMinuteFullscreen(minute || null);
    });
  });
  root.querySelectorAll("[data-minutes-action='edit']").forEach((button) => {
    button.addEventListener("click", () => loadMinuteIntoInlineEditor(button.dataset.minuteId));
  });
  root.querySelectorAll("[data-minutes-action='delete']").forEach((button) => {
    button.addEventListener("click", () => deleteMinute(button.dataset.minuteId));
  });
  root.querySelectorAll("[data-minutes-action='close-fullscreen']").forEach((button) => {
    button.addEventListener("click", closeMinuteFullscreen);
  });
}

function wireAdminMinutesPanel() {
  wireMinuteForms(adminPanel);
  const searchInput = adminPanel.querySelector("#minuteSearchInput");
  searchInput?.addEventListener("input", (event) => {
    state.adminMinuteQuery = event.target.value;
    renderAdminPanel();
    requestAnimationFrame(() => {
      const nextSearchInput = adminPanel.querySelector("#minuteSearchInput");
      nextSearchInput?.focus();
      nextSearchInput?.setSelectionRange(nextSearchInput.value.length, nextSearchInput.value.length);
    });
  });
}

function renderAdminMinutesTopbar() {
  if (!minutesTopbarTabs) return;
  const canCreate = canCreateAdminMinutes();
  const canViewHistory = canViewAdminMinuteHistory();
  const availableViews = [canCreate ? "new" : "", canViewHistory ? "history" : ""].filter(Boolean);
  if (!availableViews.includes(state.adminMinuteView)) state.adminMinuteView = availableViews[0] || "new";
  minutesTopbarTabs.innerHTML = `
    ${canCreate ? `<button class="${state.adminMinuteView === "new" ? "active" : ""}" type="button" data-minute-view="new"><span aria-hidden="true">＋</span>Nueva acta</button>` : ""}
    ${canViewHistory ? `<button class="${state.adminMinuteView === "history" ? "active" : ""}" type="button" data-minute-view="history"><span aria-hidden="true">◷</span>Historial de actas</button>` : ""}
  `;
  minutesTopbarTabs.classList.toggle("hidden", !availableViews.length);
}

function renderAccountPasswordPanel() {
  const user = state.currentUser;
  return `
    <div class="admin-shell">
      <div class="admin-hero">
        <div>
          <p class="eyebrow">Administracion personal</p>
          <h3>Cambiar contraseña</h3>
          <p class="muted-copy">Actualiza de forma segura la clave que utilizas en el sistema web y en la app.</p>
        </div>
        <button class="primary-btn icon-text-btn" type="button" data-account-password-open>
          <span aria-hidden="true">⌁</span> Cambiar mi contraseña
        </button>
      </div>

      <div class="admin-summary-grid" aria-label="Cuenta actual">
        <article class="admin-metric">
          <span>Usuario</span>
          <strong>${escapeHtml(user?.name || "Usuario")}</strong>
        </article>
        <article class="admin-metric">
          <span>Correo</span>
          <strong>${escapeHtml(user?.email || user?.username || "Sin correo")}</strong>
        </article>
      </div>

      <div class="admin-empty">
        <strong>Tu contraseña es personal.</strong>
        <span>Debes confirmar la clave actual. La nueva clave se guardara en el servidor y funcionara tambien en la app.</span>
      </div>
    </div>
  `;
}

function wireAccountPasswordPanel() {
  adminPanel?.querySelector("[data-account-password-open]")?.addEventListener("click", openAccountPasswordDialog);
}

function renderAdminAppearancePanel() {
  const selectedTheme = currentSystemTheme();
  return `
    <section class="appearance-shell">
      <header class="appearance-head">
        <div><span class="eyebrow">Personalización del sistema</span><h3>Apariencia</h3><p>Selecciona la experiencia visual. El cambio es inmediato y se conservará en este navegador.</p></div>
        <span class="appearance-current">Tema actual · ${selectedTheme === "light" ? "Claro esmerilado" : "Oscuro ejecutivo"}</span>
      </header>
      <div class="appearance-options" role="radiogroup" aria-label="Tema visual del sistema">
        <button type="button" class="appearance-option appearance-option-dark ${selectedTheme === "dark" ? "is-selected" : ""}" data-system-theme="dark" role="radio" aria-checked="${selectedTheme === "dark"}">
          <span class="appearance-preview"><i></i><b></b><em></em></span>
          <span><strong>Oscuro ejecutivo</strong><small>Azul profundo, contraste alto y paneles de vidrio oscuro.</small></span>
          <i class="appearance-check" aria-hidden="true">✓</i>
        </button>
        <button type="button" class="appearance-option appearance-option-light ${selectedTheme === "light" ? "is-selected" : ""}" data-system-theme="light" role="radio" aria-checked="${selectedTheme === "light"}">
          <span class="appearance-preview"><i></i><b></b><em></em></span>
          <span><strong>Claro esmerilado</strong><small>Fondo blanco, transparencias suaves y sombras naturales.</small></span>
          <i class="appearance-check" aria-hidden="true">✓</i>
        </button>
      </div>
      <aside class="appearance-note"><strong>Colores funcionales preservados</strong><span>Los estados Tibio, Caliente, Frío, riesgos, alertas y resultados mantienen sus colores en ambos temas.</span></aside>
    </section>`;
}

function wireAdminAppearancePanel() {
  adminPanel?.querySelectorAll("[data-system-theme]").forEach((button) => {
    button.addEventListener("click", () => {
      applySystemTheme(button.dataset.systemTheme);
      renderAdminPanel();
    });
  });
}

function renderAdminPanel() {
  if (!adminPanel) return;
  adminPanel.classList.remove("hidden");
  const keepAdminSearchFocus = document.activeElement?.id === "adminSearchInput";
  const currentMatrix = adminPanel.querySelector(".permission-matrix-shell");
  const matrixScroll = currentMatrix
    ? { top: currentMatrix.scrollTop, left: currentMatrix.scrollLeft }
    : null;
  const activeAdminSubmenu = ["apariencia", "vendedores", "actas", "cambiar-contrasena"].includes(state.activeSubmenu)
    ? state.activeSubmenu
    : "permisos";
  adminPanel.innerHTML = activeAdminSubmenu === "apariencia"
    ? renderAdminAppearancePanel()
    : activeAdminSubmenu === "vendedores"
      ? renderAdminSellersPanel()
    : activeAdminSubmenu === "actas"
    ? renderAdminMinutesPanel()
    : activeAdminSubmenu === "cambiar-contrasena"
      ? renderAccountPasswordPanel()
      : renderAdminPermissionsPanel();
  if (activeAdminSubmenu === "apariencia") wireAdminAppearancePanel();
  else if (activeAdminSubmenu === "vendedores") wireAdminSellersPanel();
  else if (activeAdminSubmenu === "actas") wireAdminMinutesPanel();
  else if (activeAdminSubmenu === "cambiar-contrasena") wireAccountPasswordPanel();
  else {
    wireAdminPermissionsPanel();
    if (keepAdminSearchFocus || matrixScroll) {
      requestAnimationFrame(() => {
        const nextMatrix = adminPanel.querySelector(".permission-matrix-shell");
        if (nextMatrix && matrixScroll) {
          nextMatrix.scrollTop = matrixScroll.top;
          nextMatrix.scrollLeft = matrixScroll.left;
        }
        const nextSearchInput = adminPanel.querySelector("#adminSearchInput");
        if (keepAdminSearchFocus) {
          nextSearchInput?.focus();
          nextSearchInput?.setSelectionRange(nextSearchInput.value.length, nextSearchInput.value.length);
        }
      });
    }
  }
}

function renderPageTitle(area, activeSubmenu) {
  const isResultsView = state.activeArea === "comercializacion"
    && ["resultados-oportunidades", "resultados-dashboard"].includes(activeSubmenu?.key);
  const isKpiView = state.activeArea === "comercializacion" && activeSubmenu?.key === "kpi";
  const isFinancialOrdersView = activeSubmenu?.key === "resultados-pedidos";
  pageTitle.classList.toggle("with-results-summary", isResultsView || isKpiView);
  renderFinancialOrderTopbarFilters(isFinancialOrdersView);

  if (isFinancialOrdersView) {
    pageTitle.textContent = "Pedidos";
    return;
  }

  if (state.activeArea === "comercializacion" && activeSubmenu?.key === "crm") {
    pageTitle.textContent = "Oportunidades / Vendedores";
    return;
  }

  if (isKpiView) {
    const rows = wonSalesFulfillmentRows(getOpportunitySubmenu().items);
    const totalSales = rows.reduce((sum, row) => sum + row.sales, 0);
    const totalGoal = rows.reduce((sum, row) => sum + row.goal, 0);
    const totalPercent = totalGoal ? Math.round((totalSales / totalGoal) * 100) : 0;
    pageTitle.innerHTML = `
      <span>KPI</span>
      <span class="results-title-metrics">
        <span>${formatMoney(totalSales)}</span>
        <span><strong>${totalPercent}%</strong> general</span>
      </span>
    `;
    return;
  }

  if (!isResultsView) {
    pageTitle.textContent = activeSubmenu ? activeSubmenu.label : area.label;
    return;
  }

  pageTitle.textContent = activeSubmenu?.key === "resultados-dashboard" ? "Dashboard" : "Oportunidades / Gerencia";
}

function renderDashboard() {
  const availableAreas = allowedAreas();
  if (!availableAreas.includes(state.activeArea)) state.activeArea = availableAreas[0] || "comercializacion";
  const area = areas[state.activeArea];
  const visibleItems = visibleSubmenus(state.activeArea);
  const hasSubmenus = visibleItems.length > 0;
  activeRoleLabel.textContent = state.currentUser?.name
    ? state.currentUser.name
    : roleDisplayName();
  renderPresenceList();

  if (state.activeArea === adminAreaKey) {
    if (!visibleItems.some((item) => item.key === state.activeSubmenu)) {
      state.activeSubmenu = visibleItems[0]?.key || "permisos";
    }
    const activeAdminSubmenu = visibleItems.find((item) => item.key === state.activeSubmenu);
    dashboard.classList.add("admin-focus");
    dashboard.classList.remove("opportunity-focus");
    dashboard.classList.remove("production-focus");
    pageTitle.classList.remove("with-results-summary");
    pageTitle.textContent = activeAdminSubmenu?.label || area.label;
    if (state.activeSubmenu === "actas") renderAdminMinutesTopbar();
    else minutesTopbarTabs?.classList.add("hidden");
    periodLabel.textContent = state.activeSubmenu === "actas"
      ? (state.adminMinuteView === "history" ? "Historial de actas" : "Nueva acta")
      : state.activeSubmenu === "apariencia"
        ? "Tema visual"
      : state.activeSubmenu === "cambiar-contrasena"
        ? "Seguridad de la cuenta"
      : ["riesgos", "solicitudes"].includes(state.activeSubmenu)
        ? "Consolidado gerencial"
        : "Control de accesos";
    topbarActions?.classList.add("hidden");
    overallStatus.textContent = state.activeSubmenu === "actas"
      ? `${state.minutes.length} actas`
      : state.activeSubmenu === "apariencia"
        ? (currentSystemTheme() === "light" ? "Claro" : "Oscuro")
      : state.activeSubmenu === "cambiar-contrasena"
        ? "Cuenta personal"
      : state.activeSubmenu === "riesgos"
        ? `${visibleStrategicRiskItems().length} riesgos`
        : state.activeSubmenu === "solicitudes"
          ? `${visibleManagementRequestItems().length} solicitudes`
          : area.status;
    renderNav();
    summaryGrid.innerHTML = "";
    if (["riesgos", "solicitudes"].includes(state.activeSubmenu)) {
      adminPanel?.classList.add("hidden");
      renderCommercialSubmenu(area);
    } else {
      commercialPanel.classList.add("hidden");
      renderAdminPanel();
    }
    return;
  }

  dashboard.classList.remove("admin-focus");
  minutesTopbarTabs?.classList.add("hidden");
  topbarActions?.classList.remove("hidden");
  adminPanel?.classList.add("hidden");
  if (hasSubmenus && !visibleItems.some((item) => item.key === state.activeSubmenu)) {
    state.activeSubmenu = visibleItems[0].key;
  }
  const activeSubmenu = hasSubmenus ? visibleItems.find((item) => item.key === state.activeSubmenu) : null;
  const isExclusiveWorkspace = hasSubmenus && (
    [
      "kpi",
      "crm",
      "crm-seguimiento",
      "crm-agenda",
      "crm-respuestas",
      "crm-clientes",
      "riesgos",
      "solicitudes",
      "autorizacion-pedidos",
      "cotizaciones",
      "produccion-semanal"
    ].includes(state.activeSubmenu)
    || state.activeSubmenu.startsWith("resultados")
  );
  dashboard.classList.toggle("opportunity-focus", isExclusiveWorkspace);
  dashboard.classList.toggle("production-focus", state.activeArea === "operaciones" && state.activeSubmenu === "produccion-semanal");
  renderPageTitle(area, activeSubmenu);
  periodLabel.textContent = state.period;
  overallStatus.textContent = area.status;
  renderNav();
  renderSummary(area);
  renderCommercialSubmenu(area);
  renderResults(area);
  renderKpis(area);
  renderRisks(area);
  renderRequests(area);
}

function setSidebarCollapsed(collapsed) {
  appShell.classList.toggle("sidebar-collapsed", collapsed);
  sidebarRestoreBtn.classList.toggle("hidden", !collapsed);
  persistNavigationState();
}

function usesTabletDrawer() {
  const tabletWidth = window.matchMedia("(min-width: 600px) and (max-width: 1100px)").matches;
  const scaledTouchTablet = window.matchMedia(
    "(hover: none) and (pointer: coarse) and (min-width: 600px) and (max-width: 1366px)"
  ).matches;
  return explicitIPadLayout || tabletWidth || scaledTouchTablet;
}

function navigationStorageId(user = state.currentUser) {
  return `${navigationSessionKey}:${user?.id || user?.username || "guest"}`;
}

function persistNavigationState() {
  if (!state.currentUser) return;
  try {
    sessionStorage.setItem(navigationStorageId(), JSON.stringify({
      activeArea: state.activeArea,
      activeSubmenu: state.activeSubmenu,
      openMenus: [...state.openMenus],
      sidebarCollapsed: appShell.classList.contains("sidebar-collapsed")
    }));
  } catch {
    // Navigation persistence is progressive enhancement.
  }
}

function restoreNavigationState(user = state.currentUser) {
  try {
    const saved = JSON.parse(sessionStorage.getItem(navigationStorageId(user)) || "null");
    if (!saved) return false;
    const available = allowedAreas(user);
    if (available.includes(saved.activeArea)) state.activeArea = saved.activeArea;
    const submenus = visibleSubmenus(state.activeArea, user);
    const legacyDefaults = {
      comercializacion: "resultados-oportunidades",
      financiera: "resultados-cuentas-por-cobrar",
      operaciones: "resultados-control-ventas",
      rrhh: "riesgos"
    };
    const savedSubmenu = ["resultados", "kpi"].includes(saved.activeSubmenu)
      && state.activeArea !== "comercializacion"
      ? legacyDefaults[state.activeArea]
      : saved.activeSubmenu === "resultados"
        ? legacyDefaults.comercializacion
        : saved.activeSubmenu;
    state.activeSubmenu = submenus.some((item) => item.key === savedSubmenu)
      ? savedSubmenu
      : submenus[0]?.key || "";
    state.openMenus = new Set(
      (Array.isArray(saved.openMenus) ? saved.openMenus : [])
        .filter((areaKey) => available.includes(areaKey))
    );
    setSidebarCollapsed(Boolean(saved.sidebarCollapsed));
    return true;
  } catch {
    return false;
  }
}

function normalizeUsers(items) {
  const source = Array.isArray(items) && items.length ? items : defaultUsers;
  const byCredential = new Map();

  const addUser = (item, index) => {
    const email = String(item.email || "").trim();
    const normalizedEmail = normalizeKey(email);
    const username = String(item.username || email || `usuario${index + 1}`).trim();
    const normalizedUsername = normalizeKey(username);
    const migratedRole = legacyAccessRoleMap[item.role] || item.role;
    const requestedRole = accessRoles.some(([key]) => key === migratedRole) ? migratedRole : "gerencias";
    const admin = Boolean(item.admin) || normalizedEmail === adminEmail;
    const role = admin ? "gerencias" : requestedRole;
    const user = {
      id: item.id || `user-${index + 1}`,
      name: item.name || item.username || item.email || "Usuario",
      username,
      email,
      role,
      password: item.password || "admin123",
      permissionManager: Boolean(item.permissionManager)
        || item.role === "financiera"
        || normalizedUsername === "financiera"
        || normalizedEmail === "financiera@empresa.local",
      admin,
      permissionsCustomized: Boolean(item.permissionsCustomized),
      permissions: (admin || role === "gerencias")
        ? allPermissionKeys()
        : item.permissionsCustomized
          ? normalizePermissionList(item.permissions, role)
          : defaultPermissionsForRole(role)
    };
    byCredential.set(normalizedEmail || normalizedUsername || user.id, user);
  };

  source.forEach(addUser);

  if (![...byCredential.values()].some((user) => normalizeKey(user.email) === adminEmail)) {
    addUser(defaultUsers[0], source.length);
  }

  return [...byCredential.values()];
}

function loadUsers() {
  const loadSavedUsers = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(usersStorageKey) || "null");
      return normalizeUsers(Array.isArray(saved) && saved.length ? saved : defaultUsers);
    } catch {
      return normalizeUsers(defaultUsers);
    }
  };

  if (apiEnabled) {
    systemUsers = normalizeUsers(defaultUsers);
    fillUserAccessOptions();
    apiJson("/api/users")
      .then((users) => {
        systemUsers = normalizeUsers(users);
        saveUsers({ sync: false });
        fillUserAccessOptions();
        restoreSession();
      })
      .catch(() => {
        systemUsers = loadSavedUsers();
        saveUsers({ sync: false });
        fillUserAccessOptions();
        restoreSession();
      });
    return;
  }

  systemUsers = loadSavedUsers();
  saveUsers({ sync: false });
  fillUserAccessOptions();
  restoreSession();
}

function saveUsers(options = {}) {
  systemUsers = normalizeUsers(systemUsers);
  syncCurrentUserFromSystem();
  localStorage.setItem(usersStorageKey, JSON.stringify(systemUsers));
  if (apiEnabled && options.sync !== false) {
    apiJson("/api/users", {
      method: "POST",
      body: JSON.stringify({
        users: systemUsers.map(({ password, ...user }) => user)
      })
    }).catch(() => {});
  }
}

function renderPresenceList() {
  if (!presenceList || !onlineCount) return;
  const users = state.onlineUsers.length && state.currentUser
    ? state.onlineUsers
    : state.currentUser
      ? [{
          user_id: state.currentUser.id,
          name: state.currentUser.name,
          role: state.currentUser.role,
          last_seen: Date.now() / 1000
        }]
      : [];
  onlineCount.textContent = String(users.length);
  activeUserStatus?.classList.toggle("hidden", !state.currentUser);
  if (!users.length) {
    presenceList.innerHTML = `<span class="presence-empty">Sin usuarios activos</span>`;
    return;
  }
  presenceList.innerHTML = users.map((user) => `
    <div class="presence-user">
      <i aria-hidden="true"></i>
      <span>${escapeHtml(user.name || "Usuario")}</span>
    </div>
  `).join("");
}

function updatePresence(users = []) {
  state.onlineUsers = Array.isArray(users) ? users : [];
  renderPresenceList();
}

function sendPresence() {
  if (!apiEnabled || !state.currentUser) {
    renderPresenceList();
    return Promise.resolve();
  }
  return apiJson("/api/presence", {
    method: "POST",
    body: JSON.stringify({
      userId: state.currentUser.id,
      name: state.currentUser.name,
      role: state.currentUser.role
    })
  }).then(updatePresence).catch(() => renderPresenceList());
}

function startPresence() {
  if (presenceTimer) clearInterval(presenceTimer);
  sendPresence();
  presenceTimer = setInterval(sendPresence, 30000);
}

function stopPresence() {
  if (presenceTimer) clearInterval(presenceTimer);
  presenceTimer = null;
}

function persistSession(user) {
  localStorage.setItem(sessionStorageKey, JSON.stringify({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role
  }));
}

function clearSession() {
  const userId = state.currentUser?.id;
  if (apiEnabled && userId) {
    apiJson(`/api/presence/${encodeURIComponent(userId)}`, { method: "DELETE" }).catch(() => {});
  }
  stopPresence();
  localStorage.removeItem(sessionStorageKey);
  sessionRestored = false;
  state.currentUser = null;
  state.onlineUsers = [];
  renderPresenceList();
}

function findUserByCredential(value) {
  const credential = normalizeKey(value);
  return systemUsers.find((user) => [user.id, user.username, user.email]
    .some((option) => normalizeKey(option) === credential));
}

function defaultAreaForRole(role, user = state.currentUser) {
  const candidate = user || { role, permissions: defaultPermissionsForRole(role) };
  const available = allowedAreas(candidate);
  return available[0] || fallbackAreaForRole(role);
}

function restoreSession() {
  if (sessionRestored || !loginView || !appShell) return false;
  try {
    const saved = JSON.parse(localStorage.getItem(sessionStorageKey) || "null");
    if (!saved) return false;
    const user = systemUsers.find((item) =>
      item.id === saved.id ||
      normalizeKey(item.username) === normalizeKey(saved.username) ||
      normalizeKey(item.email) === normalizeKey(saved.email)
    );
    if (!user) return false;
    sessionRestored = true;
    openApp(user, { restoreSession: true });
    return true;
  } catch {
    clearSession();
    return false;
  }
}

function fillUserAccessOptions() {
  if (loginUserSelect.tagName === "SELECT") {
    loginUserSelect.innerHTML = systemUsers.map((user) => `
      <option value="${escapeHtml(user.username)}">${escapeHtml(user.username)}</option>
    `).join("");
  }
  registerRole.innerHTML = accessRoles
    .map(([key, label]) => `<option value="${key}">${label}</option>`)
    .join("");
}

function setAuthMode(mode) {
  const isRegister = mode === "register";
  document.querySelectorAll("[data-auth-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.authMode === mode);
  });
  document.querySelectorAll("[data-auth-panel]").forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.authPanel !== mode);
  });
  if (isRegister) {
    registerName.focus();
  } else {
    loginUserSelect.focus();
  }
}

function openApp(userOrRole, options = {}) {
  const rawUser = typeof userOrRole === "string"
    ? systemUsers.find((item) => item.role === userOrRole || item.username === userOrRole) || {
        id: userOrRole,
        name: roleDisplayName(userOrRole),
        role: userOrRole,
        permissions: defaultPermissionsForRole(userOrRole)
      }
    : userOrRole;
  const user = systemUsers.find((item) =>
    item.id === rawUser.id ||
    normalizeKey(item.email) === normalizeKey(rawUser.email) ||
    normalizeKey(item.username) === normalizeKey(rawUser.username)
  ) || normalizeUsers([rawUser])[0];

  state.currentUser = user;
  state.role = user.role;
  state.crmSellerId = "";
  const available = allowedAreas(user);
  const navigationRestored = restoreNavigationState(user);
  if (!navigationRestored && (!options.restoreSession || !available.includes(state.activeArea))) {
    state.activeArea = defaultAreaForRole(user.role, user);
    const firstSubmenu = visibleSubmenus(state.activeArea, user)[0];
    state.activeSubmenu = firstSubmenu?.key || "resultados";
    if (firstSubmenu) state.openMenus.add(state.activeArea);
  }
  if (usesTabletDrawer()) setSidebarCollapsed(true);
  persistSession(user);
  loginView.classList.add("hidden");
  appShell.classList.remove("hidden");
  startPresence();
  renderDashboard();
}

window.addEventListener("pagehide", persistNavigationState);
window.addEventListener("popstate", () => {
  restoreNavigationState();
  if (state.currentUser) renderDashboard();
});

function fillRequestAreas() {
  requestArea.innerHTML = areaOptions.map((key) => `<option value="${key}">${areas[key].nav}</option>`).join("");
}

function currentRiskOwner() {
  return areas[state.activeArea]?.nav || (areaKeys.includes(state.role) ? areas[state.role].nav : roleDisplayName());
}

function currentRequestOwner() {
  return areas[state.activeArea]?.nav || currentRiskOwner();
}

function riskImpactOptions() {
  return areaKeys
    .filter((key) => key !== state.activeArea)
    .map((key) => areas[key].nav);
}

function fillRiskImpactOptions() {
  strategicRiskImpactList.innerHTML = riskImpactOptions().map((name) => `
    <label class="risk-impact-option">
      <input type="checkbox" value="${name}">
      <span>${name}</span>
    </label>
  `).join("");
}

function updateRiskImpactVisibility() {
  const visible = strategicRiskAffects.value === "si";
  strategicRiskImpactField.classList.toggle("hidden", !visible);
}

document.querySelectorAll("[data-auth-mode]").forEach((button) => {
  button.addEventListener("click", () => setAuthMode(button.dataset.authMode));
});

closeAdminUserDialog?.addEventListener("click", () => adminUserDialog.close());
cancelAdminUser?.addEventListener("click", () => adminUserDialog.close());
adminUserForm?.addEventListener("submit", saveAdminUserFromForm);
adminUserRole?.addEventListener("change", () => {
  renderAdminPermissionControls(systemUsers.find((user) => user.id === adminUserId.value));
});
closeAdminPasswordDialog?.addEventListener("click", () => adminPasswordDialog.close());
cancelAdminPassword?.addEventListener("click", () => adminPasswordDialog.close());
adminPasswordForm?.addEventListener("submit", resetAdminPasswordFromForm);
closeAccountPasswordDialog?.addEventListener("click", () => accountPasswordDialog.close());
cancelAccountPassword?.addEventListener("click", () => accountPasswordDialog.close());
accountPasswordForm?.addEventListener("submit", changeCurrentUserPassword);

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = findUserByCredential(loginUserSelect.value);
  if (!user || user.password !== loginPassword.value) {
    alert("Usuario o contrasena incorrecta.");
    return;
  }
  loginPassword.value = "";
  openApp(user);
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = registerUser.value.trim();
  const email = registerEmail.value.trim();
  const exists = systemUsers.some((user) =>
    normalizeKey(user.username) === normalizeKey(username) ||
    normalizeKey(user.email) === normalizeKey(email)
  );
  if (exists) {
    alert("Este usuario ya existe.");
    return;
  }

  const admin = normalizeKey(email) === adminEmail;
  const role = admin ? "gerencias" : registerRole.value;
  const user = {
    id: crypto.randomUUID(),
    name: registerName.value.trim(),
    username,
    email,
    role,
    password: registerPassword.value,
    admin,
    permissionsCustomized: false,
    permissions: (admin || role === "gerencias") ? allPermissionKeys() : defaultPermissionsForRole(role)
  };
  systemUsers.push(user);
  saveUsers();
  fillUserAccessOptions();
  registerForm.reset();
  loginUserSelect.value = user.username;
  setAuthMode("login");
  openApp(user);
});

logoutBtn.addEventListener("click", () => {
  clearSession();
  appShell.classList.add("hidden");
  loginView.classList.remove("hidden");
  loginPassword.value = "";
  setAuthMode("login");
});

sidebarToggleBtn.addEventListener("click", () => {
  setSidebarCollapsed(true);
});

sidebarRestoreBtn.addEventListener("click", () => {
  setSidebarCollapsed(false);
});

appShell.addEventListener("click", (event) => {
  if (!usesTabletDrawer() || appShell.classList.contains("sidebar-collapsed")) return;
  if (event.target.closest(".sidebar") || event.target.closest("#sidebarRestoreBtn")) return;
  setSidebarCollapsed(true);
});

systemThemeSwitch?.addEventListener("click", () => {
  applySystemTheme(currentSystemTheme() === "light" ? "dark" : "light");
});

minutesTopbarTabs?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-minute-view]");
  if (!button) return;
  state.adminMinuteView = button.dataset.minuteView;
  if (state.adminMinuteView !== "new") state.adminMinuteEditId = "";
  renderDashboard();
});

opportunitySearchInput.addEventListener("input", () => {
  if (state.activeSubmenu === "crm") {
    state.crmSearch = opportunitySearchInput.value;
    state.crmOpportunityPage = 1;
  } else {
    state.opportunitySearch = opportunitySearchInput.value;
    state.opportunityPage = 1;
  }
  renderCommercialSubmenu(areas.comercializacion);
  const input = document.querySelector("#opportunitySearchInput");
  input?.focus();
  input?.setSelectionRange(input.value.length, input.value.length);
});

periodSelect.addEventListener("change", () => {
  state.period = periodSelect.options[periodSelect.selectedIndex].text;
  renderDashboard();
});

exportBtn.addEventListener("click", () => {
  const area = areas[state.activeArea];
  const lines = [
    `Resumen ${area.label} - ${state.period}`,
    "",
    "Resultados:",
    ...area.results.map(([label, value]) => `- ${label}: ${value}%`),
    "",
    "Riesgos:",
    ...area.risks.map(([name, owner, level]) => `- ${level}: ${name} (${owner})`),
    "",
    "Solicitudes:",
    ...area.requests.map(([subject, target, priority, status]) => `- ${subject} / ${target} / ${priority} / ${status}`)
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `resumen-${state.activeArea}.txt`;
  anchor.click();
  URL.revokeObjectURL(url);
});

newRequestBtn.addEventListener("click", () => {
  fillRequestAreas();
  requestSubject.value = "";
  requestPriority.value = "Alta";
  requestDialog.showModal();
});

newRiskBtn.addEventListener("click", () => {
  strategicRiskDate.value = todayISO();
  strategicRiskText.value = "";
  strategicRiskAffects.value = "no";
  fillRiskImpactOptions();
  updateRiskImpactVisibility();
  strategicRiskDialog.showModal();
});

newManagementRequestBtn.addEventListener("click", () => {
  resetManagementRequestForm();
  managementRequestDialog.showModal();
});

closeStrategicRiskDialog.addEventListener("click", () => {
  strategicRiskDialog.close();
});

cancelStrategicRisk.addEventListener("click", () => {
  strategicRiskDialog.close();
});

strategicRiskAffects.addEventListener("change", updateRiskImpactVisibility);

strategicRiskImpactList.addEventListener("change", updateRiskImpactVisibility);

strategicRiskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const affectsOthers = strategicRiskAffects.value === "si";
  const involved = affectsOthers
    ? [...strategicRiskImpactList.querySelectorAll("input:checked")].map((input) => input.value)
    : [];
  if (affectsOthers && !involved.length) return;

  const submenu = getStrategicRiskSubmenu();
  const riskId = crypto.randomUUID();
  const riskText = strategicRiskText.value.trim();
  submenu.items.unshift({
    id: riskId,
    date: strategicRiskDate.value,
    owner: currentRiskOwner(),
    risk: riskText,
    affectsOthers,
    involved,
    status: affectsOthers ? "Notificado" : "Registrado"
  });

  if (affectsOthers) {
    involved.forEach((targetName) => {
      const targetKey = areaKeys.find((key) => areas[key].nav === targetName);
      const targetSubmenu = targetKey ? getManagementRequestSubmenu(targetKey) : getManagementRequestSubmenu();
      targetSubmenu.items.unshift({
        id: `${riskId}-${targetKey || "general"}`,
        date: strategicRiskDate.value,
        owner: currentRiskOwner(),
        target: targetName,
        subject: `Riesgo notificado: ${riskText}`,
        message: `${currentRiskOwner()} registro un riesgo que involucra a ${targetName}. Revisar seguimiento gerencial.`,
        status: "Notificada",
        sourceRiskId: riskId
      });
    });
    saveManagementRequests();
  }

  saveStrategicRisks();
  strategicRiskDialog.close();
  renderCommercialSubmenu(areas[state.activeArea]);
});

closeManagementRequestDialog.addEventListener("click", () => {
  managementRequestDialog.close();
});

cancelManagementRequest.addEventListener("click", () => {
  managementRequestDialog.close();
});

managementRequestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const submenu = getManagementRequestSubmenu(state.managementRequestAreaKey || state.activeArea);
  const id = managementRequestId.value || crypto.randomUUID();
  const current = submenu.items.find((item) => item.id === id);
  const payload = {
    id,
    date: managementRequestDate.value,
    owner: current?.owner || currentRequestOwner(),
    target: current?.target || "Gerencia general",
    subject: managementRequestSubject.value.trim(),
    message: managementRequestMessage.value.trim(),
    status: current?.status || "Enviada",
    response: current?.response || "",
    sourceRiskId: current?.sourceRiskId || ""
  };

  const index = submenu.items.findIndex((item) => item.id === id);
  if (index >= 0) {
    submenu.items[index] = { ...submenu.items[index], ...payload };
  } else {
    submenu.items.unshift(payload);
  }

  saveManagementRequests();
  managementRequestDialog.close();
  resetManagementRequestForm();
  renderCommercialSubmenu(areas[state.activeArea]);
});

requestForm.addEventListener("submit", (event) => {
  if (event.submitter && event.submitter.value === "cancel") return;
  event.preventDefault();
  const targetKey = requestArea.value;
  const active = areas[state.activeArea];
  active.requests.unshift([
    requestSubject.value.trim(),
    areas[targetKey].nav,
    requestPriority.value,
    "Pendiente"
  ]);
  requestDialog.close();
  renderRequests(active);
});

goalsMatrixBtn.addEventListener("click", () => {
  renderGoalsMatrix();
  goalsMatrixDialog.showModal();
});

opportunityTable.addEventListener("click", (event) => {
  const reportButton = event.target.closest("[data-opportunity-report]");
  if (reportButton) {
    openOpportunityReportDialog();
    return;
  }
  const cycleButton = event.target.closest("[data-cycle-view]");
  if (cycleButton) {
    state.opportunityCycleView = cycleButton.dataset.cycleView;
    state.opportunityMainStatusFilter = cycleButton.dataset.cycleView;
    state.opportunityMainResultFilter = cycleButton.dataset.cycleView === "active" ? "pending" : "all";
    state.opportunityPage = 1;
    renderCommercialSubmenu(areas[state.activeArea]);
    return;
  }

  const closedResultButton = event.target.closest("[data-closed-result-filter]");
  if (closedResultButton) {
    state.opportunityClosedResultFilter = closedResultButton.dataset.closedResultFilter;
    state.opportunityPage = 1;
    renderCommercialSubmenu(areas[state.activeArea]);
    return;
  }

  const closedResetButton = event.target.closest("[data-opportunity-closed-reset]");
  if (closedResetButton) {
    state.opportunityClosedDateFrom = "2026-07-01";
    state.opportunityClosedDateTo = todayISO();
    state.opportunityPage = 1;
    renderCommercialSubmenu(areas[state.activeArea]);
    return;
  }

  const pageButton = event.target.closest("[data-opportunity-page]");
  if (pageButton) {
    state.opportunityPage += pageButton.dataset.opportunityPage === "next" ? 1 : -1;
    renderCommercialSubmenu(areas[state.activeArea]);
    return;
  }

  const riskButton = event.target.closest("button[data-risk-action]");
  if (riskButton) {
    const submenu = findStrategicRiskSubmenu(riskButton.dataset.area || state.activeArea);
    const item = submenu.items.find((record) => record.id === riskButton.dataset.id);
    if (!item) return;
    openRiskDetailDialog(item, submenu);
    return;
  }

  const requestButton = event.target.closest("button[data-request-action]");
  if (requestButton) {
    if (requestButton.dataset.requestAction === "read") {
      const submenu = findManagementRequestSubmenu(requestButton.dataset.area || state.activeArea);
      const item = submenu?.items.find((record) => record.id === requestButton.dataset.id);
      if (!item) return;
      openManagementRequestReader(item);
      return;
    }
    closeManagementRequestReader();
    handleManagementRequestAction(requestButton);
    return;
  }

  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const submenu = getOpportunitySubmenu();
  const item = submenu.items.find((record) => record.id === button.dataset.id);
  if (!item) return;

  if (button.dataset.action === "cancel") {
    if (!canManageMigratedOpportunityLifecycle()) return;
    cancelResultOpportunity(item, button);
    return;
  }

  if (button.dataset.action === "return-followup") {
    if (!canManageMigratedOpportunityLifecycle()) return;
    returnOpportunityToFollowup(item, button);
    return;
  }

  if (button.dataset.action === "manage") {
    openManagementDialog(item);
    return;
  }

  if (button.dataset.action === "convert-order") {
    convertWonOpportunityToOrder(item, button);
    return;
  }

  if (button.dataset.action === "delete-record") {
    deleteCompleteOpportunityRecord(item, button);
    return;
  }

  state.opportunityFormContext = "results";
  fillOpportunityOptions();
  opportunityId.value = item.id;
  opportunityCrmSourceId.value = item.crmOpportunityId || "";
  opportunityDate.value = item.date;
  opportunityCompany.value = item.company;
  ensureSelectOption(opportunitySeller, item.seller);
  opportunityContact.value = item.contact || "";
  opportunityPhone.value = item.phone || "";
  ensureSelectOption(opportunitySegment, item.segment || "");
  ensureSelectOption(opportunityLocation, item.location || "");
  opportunityStage.value = item.stage;
  opportunityPriority.value = item.priority || "Media";
  opportunityProbability.value = item.probability;
  opportunityAmount.value = item.amount;
  opportunityNextAction.value = item.nextAction || "Primer seguimiento";
  opportunityAgendaDate.value = item.agendaDate || item.date || todayISO();
  opportunityAgendaTime.value = item.agendaTime || "";
  opportunityAgendaType.value = item.agendaType || "Seguimiento";
  opportunityAgendaPlace.value = item.agendaPlace || "Por definir";
  opportunityNote.value = item.note || item.comment || "";
  opportunityDialogTitle.textContent = "Editar oportunidad";
  saveOpportunityBtn.textContent = "Actualizar oportunidad";
  opportunityDialog.showModal();
});

opportunityTable.addEventListener("change", (event) => {
  if (event.target.matches("[data-main-opportunity-status]")) {
    state.opportunityMainStatusFilter = event.target.value;
    state.opportunityCycleView = event.target.value === "closed" ? "closed" : "active";
    state.opportunityPage = 1;
    renderCommercialSubmenu(areas[state.activeArea]);
    return;
  }
  if (event.target.matches("[data-main-opportunity-result]")) {
    state.opportunityMainResultFilter = event.target.value;
    state.opportunityPage = 1;
    renderCommercialSubmenu(areas[state.activeArea]);
    return;
  }
  if (event.target.matches("[data-opportunity-closed-from]")) {
    state.opportunityClosedDateFrom = event.target.value;
  } else if (event.target.matches("[data-opportunity-closed-to]")) {
    state.opportunityClosedDateTo = event.target.value;
  } else {
    return;
  }
  state.opportunityPage = 1;
  renderCommercialSubmenu(areas[state.activeArea]);
});

opportunityDashboard.addEventListener("click", (event) => {
  const matrixButton = event.target.closest("[data-action='open-goals-matrix']");
  if (matrixButton) {
    renderGoalsMatrix();
    goalsMatrixDialog.showModal();
    return;
  }

  const viewButton = event.target.closest("[data-kpi-view]");
  if (viewButton) {
    state.kpiView = viewButton.dataset.kpiView;
    renderCommercialSubmenu(areas.comercializacion);
    return;
  }

  const detailButton = event.target.closest("[data-kpi-detail]");
  if (detailButton) {
    event.stopPropagation();
    renderKpiDetailReport(detailButton.dataset.kpiSellerDetail, detailButton.dataset.kpiDetail);
    return;
  }

  const clearSellerButton = event.target.closest("[data-kpi-seller-clear]");
  if (clearSellerButton) {
    state.kpiSeller = "all";
    renderCommercialSubmenu(areas.comercializacion);
    return;
  }

  const sellerRow = event.target.closest("[data-kpi-seller-row]");
  if (sellerRow) {
    state.kpiSeller = state.kpiSeller === sellerRow.dataset.kpiSellerRow ? "all" : sellerRow.dataset.kpiSellerRow;
    renderCommercialSubmenu(areas.comercializacion);
    return;
  }

  const clearButton = event.target.closest("[data-dashboard-filter-clear]");
  if (clearButton) {
    state.opportunityFilter = null;
    renderCommercialSubmenu(areas.comercializacion);
    return;
  }

  const filterButton = event.target.closest("[data-dashboard-filter-type]");
  if (!filterButton) return;

  const nextFilter = {
    type: filterButton.dataset.dashboardFilterType,
    value: filterButton.dataset.dashboardFilterValue,
    label: filterButton.dataset.dashboardFilterLabel
  };
  const current = state.opportunityFilter;
  state.opportunityFilter = current?.type === nextFilter.type && current.value === nextFilter.value
    ? null
    : nextFilter;
  renderCommercialSubmenu(areas.comercializacion);
});

function linkedManagementQuotations(item) {
  if (!item) return [];
  const quotationId = String(item.quotationId || "");
  if (quotationId) {
    return state.quotations.filter((quotation) => String(quotation.id || "") === quotationId);
  }
  const resultLinked = state.quotations.filter((quotation) => (
    String(quotation.resultOpportunityId || "") === String(item.id || "")
  ));
  if (resultLinked.length) return resultLinked;
  const sourceIds = new Set([
    item.id,
    item.crmOpportunityId,
    item.sourceOpportunityId
  ].map((value) => String(value || "")).filter(Boolean));
  const sourceLinked = state.quotations
    .filter((quotation) => sourceIds.has(String(quotation.opportunityId || "")))
    .sort((a, b) => String(b.updatedAt || b.date || "").localeCompare(String(a.updatedAt || a.date || "")));
  return sourceLinked.length === 1 ? sourceLinked : [];
}

function renderManagementQuotations(item) {
  const quotations = linkedManagementQuotations(item);
  managementQuotationCount.textContent = String(quotations.length);
  const linkedOrder = (quotation) => state.controlSales.find((order) => (
    String(order.id || "") === String(quotation.convertedOrderId || "")
    || String(order.sourceQuotationId || "") === String(quotation.id || "")
  ));
  managementQuotationList.innerHTML = quotations.length ? quotations.map((quotation) => {
    const order = linkedOrder(quotation);
    const quotationStatus = order ? "Convertida" : (quotation.status || "Borrador");
    return `<article class="management-commercial-document${order ? " has-order" : ""}">
      <button class="management-quotation-card" type="button" data-management-quotation-open="${escapeHtml(quotation.id)}" aria-label="Abrir cotización del ${escapeHtml(formatDate(quotation.date))}, estado ${escapeHtml(quotationStatus)}">
        <strong>Cotización</strong>
        <span>${formatDate(quotation.date)} · ${formatControlSalesMoney(quotation.totalCents || 0)}</span>
        <em class="management-quotation-status" data-status="${normalizeKey(quotationStatus)}">${escapeHtml(quotationStatus)}</em>
      </button>
      ${order ? `<button class="management-order-card" type="button" data-management-order-open="${escapeHtml(order.id)}" aria-label="Abrir orden de pedido número ${escapeHtml(order.number || "")}">
        <small>Convertida en</small>
        <strong>Orden de pedido #${escapeHtml(order.number || "—")}</strong>
        <span>${formatDate(order.date)} · ${formatControlSalesMoney(order.totalCents || quotation.totalCents || 0)}</span>
        <em data-status="${normalizeKey(order.archived ? "Anulada" : (order.status || "Activa"))}">${escapeHtml(order.archived ? "Anulada" : (order.status || "Activa"))} · ${escapeHtml(order.documentType || "CF")}</em>
      </button>` : ""}
    </article>`;
  }).join("") : `<p class="management-quotation-empty">No hay cotizaciones vinculadas a esta oportunidad.</p>`;
  managementQuotationList.querySelectorAll("[data-management-quotation-open]").forEach((button) => {
    button.addEventListener("click", async () => {
      const quotation = quotations.find((record) => String(record.id) === String(button.dataset.managementQuotationOpen));
      if (!quotation) return;
      button.classList.add("is-opening");
      button.disabled = true;
      ensureQuotationDialog();
      const quotationDialog = document.querySelector("#quotationDialog");
      quotationDialog.dataset.returnToManagementOpportunityId = String(item.id || "");
      try {
        await openQuotationDialog(quotation.opportunityId || item.crmOpportunityId || item.id, quotation.id);
      } finally {
        button.classList.remove("is-opening");
        button.disabled = false;
      }
    });
  });
  managementQuotationList.querySelectorAll("[data-management-order-open]").forEach((button) => {
    button.addEventListener("click", () => {
      const order = state.controlSales.find((record) => String(record.id) === String(button.dataset.managementOrderOpen));
      if (!order) return;
      ensureControlSalesDialogs();
      const orderDialog = document.querySelector("#controlSalesDialog");
      orderDialog.dataset.returnToManagementOpportunityId = String(item.id || "");
      openControlSalesForm(order, null, item, true);
    });
  });
}

async function openManagementDialog(item, context = "results") {
  managementDialog.dataset.context = context;
  if (context !== "crm") managementCrmItem = null;
  managementOpportunityId.value = item.id;
  managementDialogTitle.textContent = item.company;
  resetManagementEntry(item);
  updateClosureControls();
  renderManagements(item);
  resetSampleCustodyForm();
  renderSampleCustodies(item);
  renderManagementQuotations(item);
  setSampleCustodyMode(false);
  managementDialog.showModal();
  await Promise.all([loadQuotations(), loadControlSales()]);
  if (managementDialog.open && managementOpportunityId.value === String(item.id)) {
    renderManagementQuotations(item);
    updateClosureControls();
  }
}

function setSampleCustodyMode(enabled) {
  managementForm.classList.toggle("sample-custody-mode", enabled);
  sampleCustodyPanel.classList.toggle("hidden", !enabled);
  const historyEyebrow = managementForm.querySelector(".management-section.history .management-section-head span");
  const historyTitle = managementForm.querySelector(".management-section.history .management-section-head strong");
  if (historyEyebrow) historyEyebrow.textContent = enabled ? "Custodia" : "Historial";
  if (historyTitle) historyTitle.textContent = enabled ? "Historial de muestras asignadas" : "Gestiones registradas";
  if (enabled) {
    renderSampleCustodies(currentManagementItem());
    requestAnimationFrame(() => sampleCustodyQuantity.focus());
  }
}

function sampleCustodies(item) {
  if (!Array.isArray(item.sampleCustodies)) item.sampleCustodies = [];
  return item.sampleCustodies;
}

function hasOutstandingSamples(item) {
  return sampleCustodies(item).some((custody) => custody.exitDate && !custody.entryDate);
}

function resetSampleCustodyForm() {
  sampleCustodyId.value = "";
  sampleCustodyQuantity.value = "1";
  sampleCustodySize.value = "";
  sampleCustodyDescription.value = "";
  sampleCustodyExitDate.value = todayISO();
  sampleCustodyEntryDate.value = "";
  saveSampleCustody.textContent = "Guardar custodia";
}

function renderSampleCustodies(item) {
  const records = sampleCustodies(item);
  sampleCustodyList.innerHTML = `
    <div class="sample-custody-list-head">
      <strong>Historial de custodia</strong>
      <span>${records.length} registro${records.length === 1 ? "" : "s"}</span>
    </div>
    ${records.length ? records.map((custody) => `
    <article class="sample-custody-record ${custody.entryDate ? "returned" : "assigned"}">
      <div><strong>${escapeHtml(custody.description || "Juego de tallas")}</strong><span>${custody.quantity} unidad${custody.quantity === 1 ? "" : "es"} · ${escapeHtml(custody.size || "Sin talla")}</span></div>
      <div><small>Salida</small><strong>${formatDate(custody.exitDate)}</strong></div>
      <div><small>Ingreso</small><strong>${custody.entryDate ? formatDate(custody.entryDate) : "Pendiente"}</strong></div>
      <div class="sample-custody-row-actions">
        <button type="button" data-sample-custody-edit="${custody.id}">Editar</button>
        ${custody.entryDate ? "" : `<button type="button" data-sample-custody-return="${custody.id}">Registrar ingreso</button>`}
        <button class="danger" type="button" data-sample-custody-delete="${custody.id}">Eliminar</button>
      </div>
    </article>
  `).join("") : `<p class="sample-custody-empty">Sin muestras asignadas a esta oportunidad.</p>`}
  `;
  sampleCustodyList.querySelectorAll("[data-sample-custody-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      const custody = records.find((record) => record.id === button.dataset.sampleCustodyEdit);
      if (!custody) return;
      sampleCustodyId.value = custody.id;
      sampleCustodyQuantity.value = custody.quantity;
      sampleCustodySize.value = custody.size;
      sampleCustodyDescription.value = custody.description;
      sampleCustodyExitDate.value = custody.exitDate;
      sampleCustodyEntryDate.value = custody.entryDate;
      saveSampleCustody.textContent = custody.entryDate ? "Guardar cambios" : "Registrar ingreso";
      sampleCustodyPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });
  sampleCustodyList.querySelectorAll("[data-sample-custody-return]").forEach((button) => {
    button.addEventListener("click", () => {
      const editButton = sampleCustodyList.querySelector(`[data-sample-custody-edit="${button.dataset.sampleCustodyReturn}"]`);
      editButton?.click();
      sampleCustodyEntryDate.focus();
    });
  });
  sampleCustodyList.querySelectorAll("[data-sample-custody-delete]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!confirm("Eliminar esta línea del historial de custodia?")) return;
      item.sampleCustodies = records.filter((record) => record.id !== button.dataset.sampleCustodyDelete);
      if (managementDialog.dataset.context === "crm") await persistCrmSampleCustodies(item);
      else saveOpportunities();
      renderSampleCustodies(item);
      renderCommercialSubmenu(areas.comercializacion);
      resetSampleCustodyForm();
    });
  });
}

function resetManagementEntry(item = currentManagementItem()) {
  managementEditId.value = "";
  managementEntryEyebrow.textContent = "Nuevo registro";
  managementEntryTitle.textContent = "Nueva gestion";
  managementSubmitBtn.textContent = "Agregar gestion";
  managementDate.valueAsDate = new Date();
  managementStage.value = item?.stage || "Prospeccion";
  managementResult.value = "ganado";
  managementComment.value = "";
  updateClosureControls();
}

function renderManagements(item) {
  const managements = normalizeManagements(item);
  item.managements = managements;
  managementTable.innerHTML = `
    ${managements.map((management) => `
      <article class="management-row ${management.canceled ? "canceled" : ""}">
        <div class="management-date-chip">
          <strong>${formatDate(management.date)}</strong>
          <small>${formatTime(management.time)}</small>
        </div>
        <div class="management-stage-chip">
          <span class="tag info">${management.stage}</span>
          ${managementResultTag(management)}
        </div>
        <div class="management-copy">
          <p>${management.comment}</p>
          ${management.canceled ? `<small class="management-cancel-note">Anulada por ${escapeHtml(management.canceledBy || "Financiera")}${management.cancelReason ? `: ${escapeHtml(management.cancelReason)}` : ""}</small>` : ""}
        </div>
        <div class="management-row-actions">
          ${canEditManagements() && !management.canceled && !management.notified
            ? `<button class="ghost-btn compact-btn" type="button" data-management-edit="${management.id}">Editar</button>`
            : ""}
          ${canCancelManagements() && !management.canceled
            ? `<button class="ghost-btn compact-btn danger" type="button" data-management-cancel="${management.id}">Anular</button>`
            : ""}
        </div>
      </article>
    `).join("") || `<div class="empty-state compact">Aun no hay gestiones registradas.</div>`}
  `;
  managementTable.querySelectorAll("[data-management-cancel]").forEach((button) => {
    button.addEventListener("click", () => cancelManagementRecord(item, button.dataset.managementCancel));
  });
  managementTable.querySelectorAll("[data-management-edit]").forEach((button) => {
    button.addEventListener("click", () => editManagementRecord(item, button.dataset.managementEdit));
  });
}

function editManagementRecord(item, managementId) {
  if (!canEditManagements()) return;
  const management = normalizeManagements(item).find((record) => record.id === managementId);
  if (!management || management.canceled) return;

  managementEditId.value = management.id;
  managementEntryEyebrow.textContent = "Edicion";
  managementEntryTitle.textContent = "Editar gestion";
  managementSubmitBtn.textContent = "Guardar cambios";
  managementDate.value = management.date;
  managementStage.value = management.stage;
  managementResult.value = management.result || "ganado";
  managementComment.value = management.comment || "";
  updateClosureControls();
  managementEntryTitle.closest(".management-section").scrollIntoView({ behavior: "smooth", block: "start" });
}

async function cancelManagementRecord(item, managementId) {
  if (!canCancelManagements()) return;
  item.managements = normalizeManagements(item);
  const management = item.managements.find((record) => record.id === managementId);
  if (!management || management.canceled) return;

  const reason = prompt("Motivo de anulacion de la gestion:");
  if (reason === null) return;

  if (managementDialog.dataset.context === "crm") {
    await crmApi(`/gestiones/${encodeURIComponent(managementId)}/cancel`, {
      method: "POST",
      body: JSON.stringify({ reason: reason.trim() })
    });
    const opportunity = crmData().opportunities.find((record) => String(record.id) === String(item.crmOpportunityId));
    managementCrmItem = crmManagementItem(opportunity);
    renderManagements(managementCrmItem);
    resetManagementEntry(managementCrmItem);
    return;
  }

  management.canceled = true;
  management.canceledAt = new Date().toISOString();
  management.canceledBy = state.currentUser?.name || roleDisplayName();
  management.cancelReason = reason.trim();

  const activeManagements = orderedManagements(item.managements).filter((record) => !record.notified && !record.canceled);
  item.stage = activeManagements.at(-1)?.stage || "Prospeccion";
  syncTrackingWin(item);
  saveOpportunities();
  renderManagements(item);
  renderCommercialSubmenu(areas.comercializacion);
  updateClosureControls();
}

function currentManagementItem() {
  if (managementDialog.dataset.context === "crm") return managementCrmItem;
  const submenu = getOpportunitySubmenu();
  return submenu.items.find((record) => record.id === managementOpportunityId.value);
}

function updateClosureControls() {
  const isClosing = isClosureStage(managementStage.value);
  const isWon = managementResult.value === "ganado";
  const item = currentManagementItem();
  const hasWonClosure = closureResult(item || {})?.result === "ganado";
  const quotation = linkedManagementQuotations(item)[0];
  const convertedOrderId = quotation?.convertedOrderId || item?.orderHandoff?.orderId || "";
  managementResultField.classList.toggle("hidden", !isClosing);
  managementResult.classList.toggle("result-won", isWon);
  managementResult.classList.toggle("result-lost", !isWon);
  notifyOperationsBtn.classList.toggle("hidden", !hasWonClosure);
  notifyOperationsBtn.textContent = convertedOrderId
    ? "Orden de pedido creada"
    : quotation
      ? "Convertir en orden de pedido"
      : "Sin cotización para convertir";
  notifyOperationsBtn.disabled = Boolean(convertedOrderId) || !quotation;
}

opportunityCustomerSearch?.addEventListener("input", () => {
  const typedName = opportunityCustomerSearch.value.trim();
  const previouslySelected = Boolean(opportunityCustomerId?.value);
  opportunityCustomerId.value = "";
  opportunityCompany.value = typedName;
  if (previouslySelected) {
    opportunityContact.value = "";
    opportunityPhone.value = "";
    if (opportunityLocation) opportunityLocation.value = "";
  }
});
opportunityCustomerToggle?.addEventListener("click", () => {
  openOpportunityCustomerDirectory();
});

opportunityForm.addEventListener("submit", (event) => {
  if (event.submitter && event.submitter.value === "cancel") return;
  event.preventDefault();
  if (state.opportunityFormContext === "crm") {
    const id = opportunityId.value;
    const typedCustomerName = opportunityCustomerSearch.value.trim();
    if (!typedCustomerName) {
      alert("Escriba el nombre del cliente.");
      opportunityCustomerSearch.focus();
      return;
    }
    const selectedCustomer = crmMasterCustomers(true).find(
      (customer) => String(customer.id) === String(opportunityCustomerId.value)
    );
    if (selectedCustomer) inheritCustomerInOpportunity(selectedCustomer.id);
    else {
      opportunityCustomerId.value = "";
      opportunityCompany.value = typedCustomerName;
    }
    const selectedSellerId = opportunitySeller.value;
    const seller = crmSalesUsers().find((user) => String(user.id) === String(selectedSellerId));
    if (!seller) {
      alert("Seleccione un vendedor comercial válido.");
      return;
    }
    const stageId = Math.max(1, opportunityStages.indexOf(opportunityStage.value) + 1);
    const temperature = { caliente: "Caliente", tibio: "Tibio", frio: "Frio", congelado: "Congelado" }[opportunityProbability.value] || "Tibio";
    const payload = {
      customerId: selectedCustomer?.id || "",
      company: selectedCustomer
        ? (selectedCustomer.commercialName || selectedCustomer.legalName || typedCustomerName)
        : typedCustomerName,
      product: opportunitySegment.value.trim(),
      contact: opportunityContact.value.trim(),
      responsible: opportunityContact.value.trim(),
      phone: opportunityPhone.value.trim(),
      segment: opportunitySegment.value.trim(),
      location: opportunityLocation.value.trim(),
      ownerId: seller.id,
      stageId,
      priority: opportunityPriority.value,
      temperature,
      estimatedAmount: Number(opportunityAmount.value || 0),
      closePercent: crmTemperatureToPercent(temperature),
      nextDate: opportunityDate.value,
      deadline: opportunityDate.value,
      status: "Vigente",
      nextAction: opportunityNextAction.value.trim() || "Seguimiento comercial",
      lastNote: opportunityNote.value.trim(),
      comment: opportunityNote.value.trim(),
      agendaDate: opportunityAgendaDate.value,
      agendaTime: opportunityAgendaTime.value,
      agendaType: opportunityAgendaType.value.trim(),
      agendaPlace: opportunityAgendaPlace.value.trim()
    };
    const method = id ? "PATCH" : "POST";
    const path = id ? `/opportunities/${id}` : "/opportunities";
    crmApi(path, { method, body: JSON.stringify(payload) }).then(() => {
      opportunityDialog.close();
      resetOpportunityForm();
    });
    return;
  }
  const submenu = getOpportunitySubmenu();
  const id = opportunityId.value || crypto.randomUUID();
  const currentIndex = submenu.items.findIndex((item) => item.id === id);
  const createdTime = currentTimeValue();
  const payload = {
    id,
    date: opportunityDate.value,
    time: currentIndex >= 0 ? submenu.items[currentIndex].time || createdTime : createdTime,
    company: opportunityCompany.value.trim(),
    seller: opportunitySeller.value.trim(),
    contact: opportunityContact.value.trim(),
    phone: opportunityPhone.value.trim(),
    segment: opportunitySegment.value.trim(),
    location: opportunityLocation.value.trim(),
    stage: opportunityStage.value,
    priority: opportunityPriority.value,
    probability: opportunityProbability.value,
    amount: Number(opportunityAmount.value),
    nextAction: opportunityNextAction.value.trim(),
    agendaDate: opportunityAgendaDate.value,
    agendaTime: opportunityAgendaTime.value,
    agendaType: opportunityAgendaType.value.trim(),
    agendaPlace: opportunityAgendaPlace.value.trim(),
    note: opportunityNote.value.trim(),
    crmOpportunityId: opportunityCrmSourceId.value,
    sampleCustodies: currentIndex >= 0 ? sampleCustodies(submenu.items[currentIndex]) : [],
    managements: currentIndex >= 0 ? normalizeManagements(submenu.items[currentIndex]) : [{
      id: `${id}-mgmt-001`,
      date: opportunityDate.value,
      time: createdTime,
      stage: "Prospeccion",
      comment: opportunityNote.value.trim() || "Ingreso inicial de la oportunidad."
    }]
  };

  if (currentIndex >= 0) {
    submenu.items[currentIndex] = payload;
  } else {
    submenu.items.unshift(payload);
  }

  saveOpportunities();
  resetOpportunityForm();
  opportunityDialog.close();
  renderCommercialSubmenu(areas.comercializacion);
});

newOpportunityBtn.addEventListener("click", () => {
  if (state.activeArea === "comercializacion" && state.activeSubmenu === "crm") {
    openCrmOpportunityDialog();
  } else {
    resetOpportunityForm();
    opportunityDialog.showModal();
  }
});

closeOpportunityDialog.addEventListener("click", closeOpportunityForm);
cancelOpportunityEdit.addEventListener("click", closeOpportunityForm);

managementForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submenu = getOpportunitySubmenu();
  const item = currentManagementItem();
  if (!item) return;

  if (managementDialog.dataset.context === "crm") {
    const opportunity = crmData().opportunities.find((record) => String(record.id) === String(item.crmOpportunityId));
    if (!opportunity) return;
    const stage = crmData().stages.find((record) => normalizeStage(record.name) === normalizeStage(managementStage.value));
    const editingId = managementEditId.value;
    const payload = {
      opportunityId: opportunity.id,
      company: opportunity.company,
      ownerId: opportunity.ownerId,
      date: managementDate.value,
      time: currentTimeValue(),
      stageId: stage?.id || opportunity.stageId,
      stageName: managementStage.value,
      note: managementComment.value.trim(),
      result: isClosureStage(managementStage.value) ? managementResult.value : "",
      status: "Realizada"
    };
    await crmApi(editingId ? `/gestiones/${encodeURIComponent(editingId)}` : "/gestiones", {
      method: editingId ? "PATCH" : "POST",
      body: JSON.stringify(payload)
    });
    const refreshed = crmData().opportunities.find((record) => String(record.id) === String(opportunity.id));
    managementCrmItem = crmManagementItem(refreshed);
    renderManagements(managementCrmItem);
    resetManagementEntry(managementCrmItem);
    return;
  }

  item.managements = normalizeManagements(item);
  const payload = {
    date: managementDate.value,
    stage: managementStage.value,
    result: isClosureStage(managementStage.value) ? managementResult.value : "",
    comment: managementComment.value.trim()
  };
  const editing = managementEditId.value
    ? item.managements.find((record) => record.id === managementEditId.value)
    : null;
  const savedManagementId = editing?.id || crypto.randomUUID();
  if (editing && canEditManagements() && !editing.canceled && !editing.notified) {
    Object.assign(editing, payload, {
      editedAt: new Date().toISOString(),
      editedBy: state.currentUser?.name || roleDisplayName()
    });
  } else {
    item.managements.push({
      id: savedManagementId,
      time: currentTimeValue(),
      ...payload
    });
  }
  const activeManagements = orderedManagements(item.managements).filter((record) => !record.notified && !record.canceled);
  item.stage = activeManagements.at(-1)?.stage || "Prospeccion";
  const result = closureResult(item);
  syncTrackingWin(item);
  if (result?.result === "ganado") {
    if (item.orderHandoff?.status !== "converted") {
      item.orderHandoff = {
        status: "pending",
        managementId: result.id || savedManagementId,
        createdAt: item.orderHandoff?.createdAt || new Date().toISOString()
      };
    }
  } else if (item.orderHandoff?.status === "pending") {
    delete item.orderHandoff;
  }
  saveOpportunities();
  renderManagements(item);
  renderCommercialSubmenu(areas.comercializacion);
  resetManagementEntry(item);
});

managementStage.addEventListener("change", updateClosureControls);
managementResult.addEventListener("change", updateClosureControls);

sampleCustodyToggle.addEventListener("click", () => {
  setSampleCustodyMode(true);
});

closeSampleCustody.addEventListener("click", () => {
  setSampleCustodyMode(false);
});

resetSampleCustody.addEventListener("click", resetSampleCustodyForm);

saveSampleCustody.addEventListener("click", async () => {
  const item = currentManagementItem();
  if (!item) return;
  const quantity = Math.max(1, Number(sampleCustodyQuantity.value || 1));
  const exitDate = sampleCustodyExitDate.value;
  const entryDate = sampleCustodyEntryDate.value;
  if (!exitDate) {
    sampleCustodyExitDate.focus();
    return;
  }
  if (entryDate && entryDate < exitDate) {
    alert("La fecha de ingreso no puede ser anterior a la fecha de salida.");
    sampleCustodyEntryDate.focus();
    return;
  }
  const records = sampleCustodies(item);
  const existing = records.find((record) => record.id === sampleCustodyId.value);
  const payload = {
    quantity,
    size: sampleCustodySize.value.trim(),
    description: sampleCustodyDescription.value.trim(),
    exitDate,
    entryDate
  };
  if (existing) Object.assign(existing, payload, { updatedAt: new Date().toISOString() });
  else records.unshift({ id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...payload });
  if (managementDialog.dataset.context === "crm") await persistCrmSampleCustodies(item);
  else saveOpportunities();
  renderSampleCustodies(item);
  renderCommercialSubmenu(areas.comercializacion);
  resetSampleCustodyForm();
});

notifyOperationsBtn.addEventListener("click", async () => {
  const item = currentManagementItem();
  if (!item || closureResult(item)?.result !== "ganado") return;

  notifyOperationsBtn.disabled = true;
  notifyOperationsBtn.textContent = "Preparando orden...";
  try {
    await Promise.all([loadQuotations(), loadControlSales()]);
    const quotation = linkedManagementQuotations(item)[0];
    if (!quotation) {
      alert("Esta oportunidad no tiene una cotización vinculada para convertir.");
      return;
    }
    if (quotation.convertedOrderId) {
      alert("Esta cotización ya fue convertida en una orden de pedido.");
      return;
    }
    openControlSalesForm(null, null, item, true, quotation);
  } catch (error) {
    alert("No fue posible preparar la orden de pedido. Verifica la conexión e inténtalo nuevamente.");
  } finally {
    updateClosureControls();
  }
});

async function convertWonOpportunityToOrder(item, triggerButton) {
  if (!item || !isWonPendingOrder(item)) return;
  if (triggerButton) triggerButton.disabled = true;
  try {
    await Promise.all([loadQuotations(), loadControlSales()]);
    const quotation = linkedManagementQuotations(item)[0];
    if (!quotation) {
      alert("Esta oportunidad ganada no tiene una cotización vinculada para convertir.");
      return;
    }
    const existingOrder = state.controlSales.find((order) => (
      !order.archived && String(order.sourceQuotationId || "") === String(quotation.id || "")
    ));
    if (quotation.convertedOrderId || existingOrder) {
      item.orderHandoff = {
        ...(item.orderHandoff || {}),
        status: "converted",
        orderId: quotation.convertedOrderId || existingOrder.id,
        convertedAt: quotation.convertedAt || existingOrder.createdAt || new Date().toISOString()
      };
      saveOpportunities();
      renderCommercialSubmenu(areas.comercializacion);
      alert("Esta cotización ya fue convertida en una orden de pedido.");
      return;
    }
    openControlSalesForm(null, null, item, true, quotation);
  } catch (error) {
    alert("No fue posible preparar la orden de pedido. Verifica la conexión e inténtalo nuevamente.");
  } finally {
    if (triggerButton?.isConnected) triggerButton.disabled = false;
  }
}

async function deleteCompleteOpportunityRecord(item, triggerButton) {
  if (!item || !canDeleteOpportunities()) return;
  const confirmation = prompt(
    `ELIMINACIÓN IRREVERSIBLE\n\nSe borrarán la oportunidad “${item.company}”, su cotización de ${formatMoney(item.amount)} y todas sus gestiones.\n\nEscribe ELIMINAR para confirmar:`
  );
  if (confirmation !== "ELIMINAR") return;
  const originalHtml = triggerButton?.innerHTML;
  if (triggerButton) {
    triggerButton.disabled = true;
    triggerButton.textContent = "…";
  }
  try {
    const payload = await apiJson(`/api/opportunities/${encodeURIComponent(item.id)}`, {
      method: "DELETE",
      headers: { "X-System-User-Id": state.currentUser?.id || "" }
    });
    getOpportunitySubmenu().items = sanitizeTestOpportunities(normalizeOpportunities(payload.opportunities || []));
    state.quotations = Array.isArray(payload.quotations) ? payload.quotations : state.quotations;
    state.crmData = payload.crm || state.crmData;
    localStorage.setItem(opportunitiesStorageKey, JSON.stringify(getOpportunitySubmenu().items));
    persistLocalQuotations();
    renderCommercialSubmenu(areas.comercializacion);
    alert("El registro completo fue eliminado.");
  } catch (error) {
    if (triggerButton?.isConnected) {
      triggerButton.disabled = false;
      triggerButton.innerHTML = originalHtml;
    }
    alert(error.message || "No fue posible eliminar el registro completo.");
  }
}

function closeManagementForm() {
  managementDialog.close();
  managementForm.reset();
  managementEditId.value = "";
  notifyOperationsBtn.textContent = "Convertir en orden de pedido";
  notifyOperationsBtn.disabled = false;
  updateClosureControls();
}

closeManagementDialog.addEventListener("click", closeManagementForm);
cancelManagement.addEventListener("click", closeManagementForm);
closeGoalsMatrixDialog.addEventListener("click", () => {
  goalsMatrixDialog.close();
});
closeKpiDetailDialog.addEventListener("click", () => {
  kpiDetailDialog.close();
});

closeFinancialOrderDialog.addEventListener("click", () => financialOrderDialog.close());
cancelFinancialOrder.addEventListener("click", () => financialOrderDialog.close());
closeAccountsReceivableDialog.addEventListener("click", () => accountsReceivableDialog.close());
cancelAccountsReceivable.addEventListener("click", () => accountsReceivableDialog.close());
closePurchaseOrderDialog.addEventListener("click", () => purchaseOrderDialog.close());
cancelPurchaseOrder.addEventListener("click", () => purchaseOrderDialog.close());
closePurchaseOrderMonthDialog.addEventListener("click", () => purchaseOrderMonthDialog.close());
financialOrdersViewTabs?.querySelectorAll("[data-financial-orders-view]").forEach((button) => {
  button.addEventListener("click", () => {
    state.financialOrdersView = button.dataset.financialOrdersView;
    saveFinancialOrderFilters();
    refreshFinancialOrdersModule();
  });
});
accountsReceivableViewTabs?.querySelectorAll("[data-accounts-receivable-view]").forEach((button) => {
  button.addEventListener("click", () => {
    state.accountsReceivableView = button.dataset.accountsReceivableView;
    state.accountsReceivablePage = 1;
    renderCommercialSubmenu(areas.financiera);
  });
});
purchaseOrdersViewTabs?.querySelectorAll("[data-purchase-orders-view]").forEach((button) => {
  button.addEventListener("click", () => {
    state.purchaseOrderView = button.dataset.purchaseOrdersView;
    state.purchaseOrderPage = 1;
    renderCommercialSubmenu(areas.financiera);
  });
});
crmOpportunitiesViewTabs?.querySelectorAll("[data-crm-opportunities-view]").forEach((button) => {
  button.addEventListener("click", () => {
    state.crmOpportunitiesView = button.dataset.crmOpportunitiesView;
    state.crmOpportunityPage = 1;
    renderCommercialSubmenu(areas.comercializacion);
  });
});
closeCrmCancellationDialog?.addEventListener("click", () => crmCancellationDialog.close());
cancelCrmCancellation?.addEventListener("click", () => crmCancellationDialog.close());
crmCancellationForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const opportunityId = crmCancellationOpportunityId.value;
  const reason = crmCancellationReason.value.trim();
  if (!opportunityId || reason.length < 5) {
    crmCancellationReason.setCustomValidity("Escriba una razon de al menos 5 caracteres.");
    crmCancellationReason.reportValidity();
    return;
  }
  crmCancellationReason.setCustomValidity("");
  const opportunity = crmData().opportunities.find((item) => item.id === opportunityId);
  const confirmed = confirm(
    `¿Está seguro de anular la oportunidad “${opportunity?.company || "seleccionada"}”?\n\n` +
    "La oportunidad saldrá del seguimiento activo, pero su registro y bitácora se conservarán."
  );
  if (!confirmed) return;
  const submit = event.submitter;
  if (submit) {
    submit.disabled = true;
    submit.textContent = "Guardando...";
  }
  try {
    await crmApi(`/opportunities/${encodeURIComponent(opportunityId)}/cancel`, {
      method: "POST",
      body: JSON.stringify({ reason })
    });
    crmCancellationDialog.close();
  } catch (error) {
    alert("No fue posible guardar la anulacion. Recargue e intente nuevamente.");
  } finally {
    if (submit) {
      submit.disabled = false;
      submit.textContent = "Anular y guardar historial";
    }
  }
});
financialOrderYearFilter?.addEventListener("change", () => {
  state.financialOrderYearFilter = financialOrderYearFilter.value;
  state.financialOrderPage = 1;
  saveFinancialOrderFilters();
  refreshFinancialOrdersModule();
});
financialOrderMonthFilter?.addEventListener("change", () => {
  state.financialOrderMonthFilter = financialOrderMonthFilter.value;
  state.financialOrderPage = 1;
  saveFinancialOrderFilters();
  refreshFinancialOrdersModule();
});
financialOrderForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const sourceOpportunityId = state.financialOrderSourceOpportunityId;
  const payload = {};
  financialOrderFields.forEach(([key, id]) => {
    payload[key] = document.querySelector(`#${id}`).value.trim();
  });
  payload.sale = Number(payload.sale || 0);
  if (sourceOpportunityId) {
    payload.sourceOpportunityId = sourceOpportunityId;
  }
  const existing = state.financialOrders.find((order) => order.id === financialOrderId.value);
  const now = new Date().toISOString();
  const pendingOrder = existing
    ? { ...existing, ...payload, updatedAt: now, updatedBy: state.currentUser?.name || "Sistema Gerencial" }
    : {
        id: crypto.randomUUID(),
        source: "manual",
        createdAt: now,
        createdBy: state.currentUser?.name || "Sistema Gerencial",
        updatedAt: now,
        updatedBy: state.currentUser?.name || "Sistema Gerencial",
        ...payload
      };
  const submitButton = financialOrderForm.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = true;
  try {
    let savedOrder = pendingOrder;
    if (apiEnabled) {
      const response = await apiJson(
        existing ? `/api/financial-orders/${encodeURIComponent(existing.id)}` : "/api/financial-orders",
        {
          method: existing ? "PUT" : "POST",
          body: JSON.stringify(existing ? pendingOrder : { ...pendingOrder, autoNumber: true })
        }
      );
      savedOrder = response.item;
    }
    const existingIndex = state.financialOrders.findIndex((order) => order.id === savedOrder.id);
    if (existingIndex >= 0) state.financialOrders[existingIndex] = savedOrder;
    else state.financialOrders.unshift(savedOrder);
    state.financialOrderPage = 1;
    saveFinancialOrders();
    if (sourceOpportunityId) {
      const sourceOpportunity = getOpportunitySubmenu().items.find((item) => item.id === sourceOpportunityId);
      if (sourceOpportunity) {
        sourceOpportunity.orderHandoff = {
          ...(sourceOpportunity.orderHandoff || {}),
          status: "converted",
          orderId: savedOrder.id,
          convertedAt: new Date().toISOString()
        };
        saveOpportunities();
      }
    }
    state.financialOrderSourceOpportunityId = "";
    financialOrderDialog.close();
    refreshFinancialOrdersModule();
  } catch {
    alert("No se pudo guardar el pedido en la base de datos. Verifica la conexión e intenta nuevamente.");
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
});

["accountsReceivableInvoiceAmount", "accountsReceivablePayments", "accountsReceivableCreditNotes"].forEach((id) => {
  document.querySelector(`#${id}`)?.addEventListener("input", calculateReceivableBalance);
});

accountsReceivableForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const payload = {};
  accountsReceivableFields.forEach(([key, id]) => {
    payload[key] = document.querySelector(`#${id}`).value.trim();
  });
  ["daysOutstanding", "invoiceAmount", "payments", "creditNotes", "balance"].forEach((key) => {
    payload[key] = Number(payload[key] || 0);
  });
  const existingId = accountsReceivableId.value;
  try {
    const response = await apiJson(
      existingId ? `/api/accounts-receivable/${encodeURIComponent(existingId)}` : "/api/accounts-receivable",
      { method: existingId ? "PUT" : "POST", body: JSON.stringify(payload) }
    );
    const saved = response.item;
    const index = state.accountsReceivable.findIndex((item) => item.id === saved.id);
    if (index >= 0) state.accountsReceivable[index] = saved;
    else state.accountsReceivable.unshift(saved);
    state.accountsReceivablePage = 1;
    accountsReceivableDialog.close();
    renderCommercialSubmenu(areas.financiera);
  } catch {
    alert("No se pudo guardar la cuenta por cobrar.");
  }
});

purchaseOrderForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const payload = {};
  purchaseOrderFields.forEach(([key, id]) => { payload[key] = document.querySelector(`#${id}`).value.trim(); });
  ["amount", "advance", "payment", "remaining"].forEach((key) => { payload[key] = Number(payload[key] || 0); });
  const existingId = purchaseOrderId.value;
  payload.updatedBy = state.currentUser?.name || "Sistema Gerencial";
  if (!existingId) payload.createdBy = payload.updatedBy;
  const submit = purchaseOrderForm.querySelector('button[type="submit"]');
  if (submit) submit.disabled = true;
  try {
    const response = await apiJson(existingId ? `/api/purchase-orders/${encodeURIComponent(existingId)}` : "/api/purchase-orders", { method: existingId ? "PUT" : "POST", body: JSON.stringify(payload) });
    const saved = response.item;
    const index = state.purchaseOrders.findIndex((item) => item.id === saved.id);
    if (index >= 0) state.purchaseOrders[index] = saved; else state.purchaseOrders.unshift(saved);
    state.purchaseOrderPage = 1;
    purchaseOrderDialog.close();
    renderCommercialSubmenu(areas.financiera);
  } catch {
    alert("No se pudo guardar la orden de pedido en la base de datos.");
  } finally {
    if (submit) submit.disabled = false;
  }
});

fillOpportunityOptions();
loadUsers();
loadFinancialOrderFilters();
loadControlSalesPeriod();
loadFinancialOrders();
syncFinancialOrdersWithApi();
loadAccountsReceivable();
loadPurchaseOrders();
loadControlSales();
loadProductionSchedule();
loadQuotations();
loadOpportunities();
loadStrategicRisks();
loadManagementRequests();
loadMinutes();
loadCrmData();
resetOpportunityForm();
