const macOSRenderSafe = /Macintosh|MacIntel|Mac OS X/i.test(`${navigator.platform || ""} ${navigator.userAgent || ""}`);
document.documentElement.classList.toggle("macos-render-safe", macOSRenderSafe);

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
      { key: "resultados-pedidos", label: "Pedidos", status: "Registro financiero de pedidos", items: [] },
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
        key: "resultados-oportunidades",
        label: "Oportunidades / Gerencia",
        status: "Pipeline activo",
        items: []
      },
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

const state = {
  role: "gerencias",
  currentUser: null,
  activeArea: "comercializacion",
  activeSubmenu: "resultados-oportunidades",
  openMenus: new Set(["comercializacion"]),
  onlineUsers: [],
  opportunityFilter: null,
  opportunityCycleView: "active",
  opportunityPage: 1,
  opportunitySearch: "",
  opportunityFormContext: "results",
  kpiView: "dashboard",
  kpiSeller: "all",
  adminQuery: "",
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
  financialComparisonYears: null,
  financialComparisonMonths: ["Enero", "Febrero", "Marzo"],
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
  controlSalesSort: "date-desc",
  controlSalesPage: 1,
  crmData: null,
  crmSellerId: "",
  crmStatusFilter: "Vigente",
  crmSearch: "",
  crmTrackingView: "active",
  crmWonDateFrom: "",
  crmWonDateTo: "",
  crmOpportunityPage: 1,
  crmOpportunitiesView: "list",
  period: "Julio 2026"
};

const areaKeys = ["comercializacion", "financiera", "operaciones", "rrhh"];
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
areas[adminAreaKey] = {
  label: "Administracion",
  nav: "Administracion",
  status: "Usuarios",
  submenus: [
    { key: "permisos", label: "Permisos" },
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
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });
  if (!response.ok) throw new Error(`API ${response.status}`);
  return response.json();
}

function loadCrmData() {
  if (!apiEnabled) return;
  apiJson("/api/crm/bootstrap")
    .then((data) => {
      state.crmData = data;
      syncLostCrmOpportunities();
      if (state.activeArea === "comercializacion" && state.activeSubmenu?.startsWith("crm")) {
        renderDashboard();
      }
    })
    .catch(() => {
      state.crmData = null;
    });
}
const defaultStrategicRisks = [];
const defaultManagementRequests = [];
const demoStrategicRiskIds = new Set(["risk-001", "risk-002", "risk-003"]);
const demoManagementRequestIds = new Set(["req-001", "req-002"]);
const defaultOpportunities = [];
const opportunityPageSize = 10;

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
const navList = document.querySelector("#navList");
const dashboard = document.querySelector(".dashboard");
const pageTitle = document.querySelector("#pageTitle");
const periodLabel = document.querySelector("#periodLabel");
const periodSelect = document.querySelector("#periodSelect");
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
const managementEditId = document.querySelector("#managementEditId");
const managementEntryEyebrow = document.querySelector("#managementEntryEyebrow");
const managementEntryTitle = document.querySelector("#managementEntryTitle");
const managementSubmitBtn = document.querySelector("#managementSubmitBtn");
const managementTable = document.querySelector("#managementTable");
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
    return ["crm", "crm-seguimiento"]
      .map((sectionKey) => permissionKey("comercializacion", sectionKey));
  }
  if (role === "jefaturas") {
    return [
      ...areaPermissionSections("comercializacion")
        .map((section) => permissionKey("comercializacion", section.key)),
      permissionKey("financiera", "resultados-pedidos"),
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
    ...(legacyRisks ? [permissionKey(adminAreaKey, "riesgos")] : []),
    ...(legacyRequests ? [permissionKey(adminAreaKey, "solicitudes")] : [])
  ];
  const next = migrated.filter((item) => valid.has(item));
  return [...new Set(next)];
}

function isAdminUser(user = state.currentUser) {
  return Boolean(user?.admin) || normalizeKey(user?.email) === adminEmail;
}

function canOpenAdminPermissions(user = state.currentUser) {
  const username = normalizeKey(user?.username);
  const email = normalizeKey(user?.email);
  return isAdminUser(user)
    || Boolean(user?.permissionManager)
    || username === "financiera"
    || email === "financiera@empresa.local";
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
      if (item.key === "permisos") return canOpenAdminPermissions(user);
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
  return isAdminUser() || state.role === "gerencias";
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
    const closureDate = result?.date || "";
    const isClosedBeforePeriod = Boolean(result && closureDate < periodStart);
    const isClosedInPeriod = Boolean(result && closureDate >= periodStart && closureDate < nextStart);
    const isFuture = item.date >= nextStart;
    return {
      item,
      result,
      isHistory: Boolean(result),
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
    active: rows.filter((row) => !row.result && !row.isFuture).sort(sortRows),
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

  return commercialSellers.map((seller) => {
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
  return `<span class="tag ${management.result === "ganado" ? "" : "danger"}">${management.result === "ganado" ? "Ganado" : "Perdida"}</span>`;
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
  return items.map((item, index) => ({
    ...item,
    time: item.time || seededTime(index),
    seller: normalizeSeller(item.seller || commercialSellers[index % commercialSellers.length]),
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
  return sellerNameMap[name] || name || commercialSellers[0];
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
  opportunitySeller.innerHTML = commercialSellers.map((seller) => `<option value="${seller}">${seller}</option>`).join("");
  opportunityProbability.innerHTML = opportunityProbabilities.map(([key, label, range]) => (
    `<option value="${key}">${label} - ${range}</option>`
  )).join("");
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
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(value || "").trim());
  if (!match) return "";
  const [, day, month, year] = match;
  const iso = `${year}-${month}-${day}`;
  const parsed = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== iso ? "" : iso;
}

function controlSalesRangeModel() {
  const dates = state.controlSales.map((order) => order.date).filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date)).sort();
  const today = new Date().toISOString().slice(0, 10);
  const minIso = dates[0] || today;
  const maxIso = dates[dates.length - 1] || minIso;
  return {
    fromIso: state.controlSalesDateFrom || minIso,
    toIso: state.controlSalesDateTo || maxIso
  };
}

function loadControlSales() {
  if (!apiEnabled) return Promise.resolve();
  return apiJson("/api/control-sales")
    .then((payload) => {
      state.controlSales = Array.isArray(payload.items) ? payload.items : [];
      state.controlSalesCounts = payload.counts || { orders: state.controlSales.length, details: 0 };
      if (
        (state.activeArea === "operaciones" && state.activeSubmenu === "resultados-control-ventas")
        || (state.activeArea === "financiera" && state.activeSubmenu === "resultados-pedidos")
      ) renderDashboard();
    })
    .catch((error) => console.error("No se pudo cargar Control de Ventas.", error));
}

function controlSalesFilteredRows() {
  const query = normalizeKey(state.controlSalesQuery);
  let rows = state.controlSales.filter((order) => {
    if (state.controlSalesStatus === "active" && order.archived) return false;
    if (state.controlSalesStatus === "archived" && !order.archived) return false;
    if (state.controlSalesStatus === "review" && !(order.anomalies?.length || order.details.some((detail) => detail.reviewRequired || detail.anomalies?.length))) return false;
    if (state.controlSalesSeller !== "all" && order.seller !== state.controlSalesSeller) return false;
    if (state.controlSalesDateFrom && order.date < state.controlSalesDateFrom) return false;
    if (state.controlSalesDateTo && order.date > state.controlSalesDateTo) return false;
    if (!query) return true;
    const detailText = order.details.map((detail) => `${detail.product} ${detail.size}`).join(" ");
    return normalizeKey(`${order.number} ${order.seller} ${order.client} ${order.status} ${detailText}`).includes(query);
  });
  const sorts = {
    "date-desc": (a, b) => String(b.date).localeCompare(String(a.date)) || String(b.number).localeCompare(String(a.number), "es", { numeric: true }),
    "date-asc": (a, b) => String(a.date).localeCompare(String(b.date)),
    "total-desc": (a, b) => b.totalCents - a.totalCents,
    "number-asc": (a, b) => String(a.number).localeCompare(String(b.number), "es", { numeric: true })
  };
  return rows.sort(sorts[state.controlSalesSort] || sorts["date-desc"]);
}

function renderControlSales() {
  const rows = controlSalesFilteredRows();
  const sellers = [...new Set(state.controlSales.map((order) => order.seller).filter(Boolean))].sort((a, b) => a.localeCompare(b, "es"));
  const range = controlSalesRangeModel();
  const pageSize = 15;
  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  state.controlSalesPage = Math.min(Math.max(state.controlSalesPage, 1), pages);
  const start = (state.controlSalesPage - 1) * pageSize;
  const visible = rows.slice(start, start + pageSize);
  const total = rows.reduce((sum, order) => sum + Number(order.totalCents || 0), 0);
  const anomalies = rows.filter((order) => order.anomalies?.length || order.details.some((detail) => detail.reviewRequired || detail.anomalies?.length)).length;
  return `<section class="control-sales-shell">
    <header class="control-sales-hero">
      <div class="control-sales-heading"><span>Resumen operativo</span><p>Órdenes, totales y alertas del filtro actual.</p></div>
      <div class="control-sales-kpis"><article><small>Órdenes visibles</small><strong>${rows.length}</strong><span>${state.controlSalesCounts.orders || 0} históricas y manuales</span></article><article><small>Total consolidado</small><strong>${formatControlSalesMoney(total)}</strong><span>Calculado desde líneas activas</span></article><article class="${anomalies ? "warning" : ""}"><small>Por revisar</small><strong>${anomalies}</strong><span>Advertencias del origen</span></article></div>
    </header>
    <div class="control-sales-toolbar">
      <label class="control-sales-search"><span>⌕</span><input type="search" data-control-sales-query value="${escapeHtml(state.controlSalesQuery)}" placeholder="Buscar orden, vendedor, cliente, producto o talla..."></label>
      <label class="control-sales-control"><small>Vendedor</small><select data-control-sales-seller><option value="all">Todos los vendedores</option>${sellers.map((seller) => `<option value="${escapeHtml(seller)}" ${state.controlSalesSeller === seller ? "selected" : ""}>${escapeHtml(seller)}</option>`).join("")}</select></label>
      <label class="control-sales-control"><small>Estado</small><select data-control-sales-status><option value="active" ${state.controlSalesStatus === "active" ? "selected" : ""}>Activas</option><option value="all" ${state.controlSalesStatus === "all" ? "selected" : ""}>Todas</option><option value="archived" ${state.controlSalesStatus === "archived" ? "selected" : ""}>Archivadas</option><option value="review" ${state.controlSalesStatus === "review" ? "selected" : ""}>Por revisar</option></select></label>
      <div class="control-sales-range control-sales-date-entry" data-control-sales-range>
        <div class="control-sales-date-heading"><small>Periodo operativo</small><span>Escribe 8 dígitos por fecha</span></div>
        <div class="control-sales-date-fields">
          <label><span>Desde</span><input type="text" inputmode="numeric" autocomplete="off" maxlength="10" data-control-sales-date-from value="${formatDate(range.fromIso)}" placeholder="DD/MM/AAAA" aria-label="Fecha inicial en formato día, mes y año"></label>
          <i aria-hidden="true">→</i>
          <label><span>Hasta</span><input type="text" inputmode="numeric" autocomplete="off" maxlength="10" data-control-sales-date-to value="${formatDate(range.toIso)}" placeholder="DD/MM/AAAA" aria-label="Fecha final en formato día, mes y año"></label>
        </div>
        <small class="control-sales-date-feedback" data-control-sales-date-feedback aria-live="polite">Ejemplo: 01012026 se convierte en 01/01/2026</small>
      </div>
      <label class="control-sales-control"><small>Ordenar</small><select data-control-sales-sort><option value="date-desc">Más recientes</option><option value="date-asc" ${state.controlSalesSort === "date-asc" ? "selected" : ""}>Más antiguas</option><option value="total-desc" ${state.controlSalesSort === "total-desc" ? "selected" : ""}>Mayor total</option><option value="number-asc" ${state.controlSalesSort === "number-asc" ? "selected" : ""}>Número de orden</option></select></label>
      <button type="button" class="primary-btn" data-control-sales-new>+ Nueva orden</button>
    </div>
    <div class="control-sales-table">
      <div class="control-sales-row head"><span>Orden</span><span>Fecha</span><span>Vendedor</span><span>Cliente</span><span>Total</span><span>Estado</span><span>Acciones</span></div>
      ${visible.map((order) => {
        const warning = order.anomalies?.length || order.details.some((detail) => detail.reviewRequired || detail.anomalies?.length);
        return `<article class="control-sales-row ${order.archived ? "archived" : ""}">
          <span><b>#${escapeHtml(order.number)}</b><small>${order.source === "importado" ? `ID ${escapeHtml(order.externalId)}` : "Manual"}</small></span>
          <span>${formatDate(order.date)}</span><span>${escapeHtml(order.seller)}</span><span title="${escapeHtml(order.client)}">${escapeHtml(order.client)}</span>
          <span class="money">${formatControlSalesMoney(order.totalCents)}</span>
          <span><em class="control-sales-status ${warning ? "warning" : ""}">${warning ? "⚠ Revisar" : escapeHtml(order.status)}</em></span>
          <span class="control-sales-actions"><button type="button" class="print" data-control-sales-print="${order.id}">Proforma</button><button type="button" data-control-sales-view="${order.id}">Ver</button><button type="button" data-control-sales-edit="${order.id}">Editar</button><button type="button" class="${order.archived ? "restore" : "danger"}" data-control-sales-archive="${order.id}">${order.archived ? "Restaurar" : "Archivar"}</button></span>
        </article>`;
      }).join("") || `<div class="empty-state">No hay órdenes para los filtros seleccionados.</div>`}
    </div>
    <footer class="control-sales-pagination"><span>Mostrando ${rows.length ? start + 1 : 0}-${Math.min(start + pageSize, rows.length)} de ${rows.length}</span><div><button type="button" data-control-sales-page="prev" ${state.controlSalesPage <= 1 ? "disabled" : ""}>Anterior</button><strong>Página ${state.controlSalesPage} de ${pages}</strong><button type="button" data-control-sales-page="next" ${state.controlSalesPage >= pages ? "disabled" : ""}>Siguiente</button></div></footer>
  </section>`;
}

function ensureControlSalesDialogs() {
  if (document.querySelector("#controlSalesDialog")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <dialog id="controlSalesDialog" class="wide-dialog control-sales-dialog"><form id="controlSalesForm" method="dialog">
      <header><div><p class="eyebrow">Operaciones</p><h3 id="controlSalesDialogTitle">Nueva orden</h3></div><button type="button" data-control-sales-close>×</button></header>
      <input type="hidden" id="controlSalesId"><input type="hidden" id="controlSalesFinancialOrderId"><input type="hidden" id="controlSalesSourceOpportunityId">
      <section class="control-sales-source-picker">
        <div class="control-sales-source-heading"><div><span>Pedido de origen</span><strong>Selecciona por correlativo o cliente</strong></div><small>Pedidos desde julio de 2026 que todavía no han sido ingresados.</small></div>
        <div id="controlSalesFinancialOrderSelected"></div>
        <details id="controlSalesFinancialOrderPicker" class="control-sales-source-dropdown">
          <summary><span><b>Elegir pedido pendiente</b><small id="controlSalesFinancialOrderCount">0 pedidos</small></span><i aria-hidden="true">⌄</i></summary>
          <div class="control-sales-source-dropdown-panel">
            <label class="control-sales-source-search"><span>⌕</span><input id="controlSalesFinancialOrderSearch" type="search" autocomplete="off" placeholder="Buscar #275, cliente o vendedor…"></label>
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
          <label>Fecha de entrega <small>Opcional · la completa Operaciones</small><input id="controlSalesDeliveryDate" type="date"></label>
          <label>Condición de pago<input id="controlSalesPaymentTerms" list="controlSalesPaymentOptions"><datalist id="controlSalesPaymentOptions"><option value="Contado"><option value="Crédito 15 días"><option value="Crédito 30 días"><option value="Crédito 60 días"></datalist></label>
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
      <p id="controlSalesSaveStatus" class="control-sales-save-status hidden" role="status" aria-live="polite"></p>
      <footer><div><span>Total consolidado</span><strong id="controlSalesFormTotal">$0.00</strong><small id="controlSalesFooterReconciliation">Selecciona un pedido para conciliar.</small></div><button type="button" class="ghost-btn" data-control-sales-close>Cancelar</button><button type="button" class="control-sales-print-btn" data-control-sales-print-draft>Vista previa / Imprimir</button><button type="submit" class="primary-btn">Guardar orden</button></footer>
    </form></dialog>
    <dialog id="controlSalesDetailDialog" class="wide-dialog control-sales-detail-dialog"><section id="controlSalesDetailContent"></section></dialog>`);
  const formDialog = document.querySelector("#controlSalesDialog");
  const form = document.querySelector("#controlSalesForm");
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
    if (event.target.matches("[data-control-sales-source-clear]")) {
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
    if (event.target.matches("#controlSalesFinancialOrderSearch")) {
      renderControlSalesFinancialOrderResults(event.target.value);
    }
  });
  formDialog.addEventListener("change", (event) => {
    if (event.target.matches('input[name="controlSalesDocumentType"], #controlSalesPerceptionEnabled')) updateControlSalesFormTotal();
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
    const payload = { financialOrderId:document.querySelector("#controlSalesFinancialOrderId").value, sourceOpportunityId:document.querySelector("#controlSalesSourceOpportunityId").value, number:document.querySelector("#controlSalesNumber").value.trim(), date:document.querySelector("#controlSalesDate").value, seller:document.querySelector("#controlSalesSeller").value.trim(), client:document.querySelector("#controlSalesClient").value.trim(), status:document.querySelector("#controlSalesOrderStatus").value, documentType:form.querySelector('input[name="controlSalesDocumentType"]:checked')?.value || "CF", proformaData:collectControlSalesProformaData(), details, updatedBy:state.currentUser?.name || "Sistema Gerencial" };
    const submit = form.querySelector('button[type="submit"]');
    const saveStatus = document.querySelector("#controlSalesSaveStatus");
    submit.disabled = true;
    saveStatus.classList.add("hidden");
    saveStatus.dataset.tone = "success";
    try {
      const response = await apiJson(id ? `/api/control-sales/${encodeURIComponent(id)}` : "/api/control-sales", { method:id ? "PUT" : "POST", body:JSON.stringify(payload) });
      const savedOrder = response.item;
      document.querySelector("#controlSalesId").value = savedOrder.id;
      document.querySelector("#controlSalesDialogTitle").textContent = `Editar pedido #${savedOrder.number}`;
      submit.textContent = "Guardar cambios";
      await loadControlSales();
      if (formDialog.dataset.orderFormatOnly === "true" && state.activeSubmenu === "crm-seguimiento") {
        renderCommercialSubmenu(areas.comercializacion);
      }
      saveStatus.textContent = `${id ? "Cambios guardados" : "Pedido guardado"} correctamente. Puedes continuar editando o imprimir el pedido.`;
      saveStatus.classList.remove("hidden");
    } catch (error) {
      saveStatus.textContent = "No se pudieron guardar los cambios. Revisa los campos e inténtalo nuevamente.";
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

function collectControlSalesProformaData() {
  const data = Object.fromEntries(Object.entries(CONTROL_SALES_PROFORMA_FIELDS).map(([key, id]) => [
    key,
    document.querySelector(`#${id}`)?.value.trim() || ""
  ]));
  data.perceptionEnabled = Boolean(document.querySelector("#controlSalesPerceptionEnabled")?.checked);
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

const CONTROL_SALES_FINANCIAL_ORDER_CUTOFF = "2026-07-01";

function isControlSalesEligibleFinancialOrder(order) {
  const orderDate = String(order?.date || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(orderDate)
    && orderDate >= CONTROL_SALES_FINANCIAL_ORDER_CUTOFF;
}

function controlSalesFinancialOrderLabel(order) {
  return `#${order.number || "—"} · ${order.client || "Sin cliente"} · ${order.seller || "Sin vendedor"}`;
}

function renderControlSalesFinancialOrderResults(query = "") {
  const container = document.querySelector("#controlSalesFinancialOrderResults");
  if (!container) return;
  const currentOrderId = document.querySelector("#controlSalesId")?.value || "";
  const selectedId = document.querySelector("#controlSalesFinancialOrderId")?.value || "";
  const linkedIds = controlSalesLinkedFinancialOrderIds(currentOrderId);
  const terms = normalizeKey(query).split(/\s+/).filter(Boolean);
  const available = state.financialOrders
    .filter(isControlSalesEligibleFinancialOrder)
    .filter((order) => !linkedIds.has(String(order.id)) && String(order.id) !== selectedId)
    .filter((order) => {
      if (!terms.length) return true;
      const haystack = normalizeKey([order.number, order.client, order.seller, order.orderNumber].join(" "));
      return terms.every((term) => haystack.includes(term));
    })
    .sort((a, b) => String(a.date || "9999-12-31").localeCompare(String(b.date || "9999-12-31"))
      || Number(a.number || 0) - Number(b.number || 0));
  const count = document.querySelector("#controlSalesFinancialOrderCount");
  if (count) count.textContent = `${available.length} ${available.length === 1 ? "pedido" : "pedidos"}`;
  container.innerHTML = available.length
    ? available.map((order) => `<button type="button" class="control-sales-source-option" data-control-sales-source-id="${escapeHtml(order.id)}"><time datetime="${escapeHtml(order.date || "")}">${formatDate(order.date) || "Sin fecha"}</time><b>#${escapeHtml(order.number || "—")}</b><span title="${escapeHtml(order.client || "Sin cliente")}">${escapeHtml(order.client || "Sin cliente")}</span><small title="${escapeHtml(order.seller || "Sin vendedor")}">${escapeHtml(order.seller || "Sin vendedor")}</small><strong>${formatMoney(order.sale || 0)}</strong><i>Seleccionar</i></button>`).join("")
    : `<p class="control-sales-source-empty">${terms.length ? "No hay pedidos pendientes que coincidan con la búsqueda." : "No hay pedidos pendientes desde julio de 2026."}</p>`;
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
  seller.value = order.seller || "";
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
  if (order) setControlSalesFinancialOrderSelection(order);
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

function openControlSalesForm(order = null, sourceFinancialOrder = null, sourceWin = null, formatOnly = false) {
  ensureControlSalesDialogs();
  const dialog = document.querySelector("#controlSalesDialog");
  dialog.classList.toggle("control-sales-order-format-only", formatOnly);
  dialog.dataset.orderFormatOnly = formatOnly ? "true" : "false";
  document.querySelector("#controlSalesDialogTitle").textContent = order ? `Editar pedido #${order.number}` : "Nuevo pedido";
  const saveStatus = document.querySelector("#controlSalesSaveStatus");
  saveStatus.classList.add("hidden");
  saveStatus.textContent = "";
  saveStatus.dataset.tone = "success";
  dialog.querySelector('button[type="submit"]').textContent = order ? "Guardar cambios" : "Guardar orden";
  document.querySelector("#controlSalesId").value = order?.id || "";
  document.querySelector("#controlSalesSourceOpportunityId").value = order?.sourceOpportunityId || sourceWin?.id || "";
  const sourceOrder = sourceFinancialOrder || (order?.financialOrderId
    ? state.financialOrders.find((item) => String(item.id) === String(order.financialOrderId))
    : null);
  const opportunityReference = document.querySelector("#controlSalesOpportunityReference");
  opportunityReference.classList.toggle("hidden", !sourceWin);
  opportunityReference.innerHTML = sourceWin ? `<div><span>Valor estimado de la oportunidad</span><strong>${formatMoney(sourceWin.amount || 0)}</strong></div><p>Solo referencia comercial. No se suma al pedido; el total confirmado se calcula con las cantidades y precios unitarios ingresados abajo.</p>` : "";
  setControlSalesFinancialOrderSelection(sourceOrder);
  document.querySelector("#controlSalesFinancialOrderId").value = order?.financialOrderId || sourceOrder?.id || "";
  document.querySelector("#controlSalesNumber").value = sourceOrder?.number || order?.number || nextControlSalesOrderNumber();
  document.querySelector("#controlSalesDate").value = order?.date || sourceWin?.date || todayISO();
  document.querySelector("#controlSalesSeller").value = sourceOrder?.seller || order?.seller || sourceWin?.seller || "";
  document.querySelector("#controlSalesClient").value = sourceOrder?.client || order?.client || sourceWin?.company || "";
  fillControlSalesProformaData(order?.proformaData || {}, order || sourceOrder);
  if (!order && sourceWin && !document.querySelector("#controlSalesCommercialName").value) {
    document.querySelector("#controlSalesCommercialName").value = sourceWin.company || "";
  }
  document.querySelector("#controlSalesOrderStatus").value = order?.status === "Histórica" ? "Activa" : (order?.status || "Activa");
  const documentType = order?.documentType === "CCF" ? "CCF" : "CF";
  document.querySelector(`input[name="controlSalesDocumentType"][value="${documentType}"]`).checked = true;
  const initialDetails = order?.details?.length
    ? order.details
    : sourceWin
      ? [{ product: sourceWin.segment && sourceWin.segment !== "Sin producto registrado" ? sourceWin.segment : "", quantity: "1" }]
      : [{}];
  document.querySelector("#controlSalesLines").innerHTML = initialDetails.map(controlSalesLineTemplate).join("");
  document.querySelector("#controlSalesFinancialOrderSearch").value = "";
  document.querySelector("#controlSalesFinancialOrderPicker").open = false;
  renderControlSalesFinancialOrderResults("");
  updateControlSalesFormTotal();
  if (formatOnly) document.querySelector("#controlSalesFooterReconciliation").textContent = "Detalle listo para guardar e imprimir.";
  dialog.showModal();
}

function openCrmWonOrder(opportunityId) {
  const win = crmResultWinHistory().find((item) => String(item.id) === String(opportunityId));
  if (!win) return;
  const financialOrder = state.financialOrders.find((order) => String(order.sourceOpportunityId || "") === String(opportunityId));
  const detailOrder = (financialOrder
    ? state.controlSales.find((order) => String(order.financialOrderId || "") === String(financialOrder.id) && !order.archived)
    : null)
    || state.controlSales.find((order) => String(order.sourceOpportunityId || "") === String(opportunityId) && !order.archived);
  if (detailOrder) {
    openControlSalesDetail(detailOrder.id, true);
    return;
  }
  openControlSalesForm(null, financialOrder || null, win, true);
}

function printControlSalesProformaInline(order) {
  const popup = window.open("", "_blank", "width=980,height=900");
  if (!popup) {
    alert("El navegador bloqueó la ventana de impresión. Habilita las ventanas emergentes e inténtalo nuevamente.");
    return;
  }
  const data = order.proformaData || {};
  const subtotalCents = Number(order.subtotalCents ?? order.details.reduce((sum, detail) => sum + Number(detail.lineTotalCents || 0) - Number(detail.vatCents || 0), 0));
  const vatCents = Number(order.vatTotalCents ?? order.details.reduce((sum, detail) => sum + Number(detail.vatCents || 0), 0));
  const perceptionCents = Number(order.perceptionCents ?? Math.max(0, Number(order.totalCents || 0) - subtotalCents - vatCents));
  const brandUrl = new URL("assets/proforma-konfi-arte-color.png", window.location.href).href;
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
    <div class="field"><label>Vendedor:</label><strong>${value(order.seller)}</strong></div>
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
  document.querySelector("#controlSalesDetailContent").innerHTML = `<header><div><p class="eyebrow">Control de Ventas · ${escapeHtml(order.source)}</p><h3>Orden #${escapeHtml(order.number)}</h3><span>${escapeHtml(order.client)} · ${escapeHtml(order.seller)}</span></div><button type="button" data-control-sales-detail-close>×</button></header>
    <div class="control-sales-detail-summary"><article><small>Fecha</small><strong>${formatDate(order.date)}</strong></article><article><small>Líneas</small><strong>${order.details.length}</strong></article><article><small>Monto del pedido</small><strong>${formatControlSalesMoney(order.expectedTotalCents || 0)}</strong></article><article><small>Total detallado</small><strong>${formatControlSalesMoney(order.totalCents)}</strong></article><article class="${Number(order.varianceCents || 0) === 0 ? "balanced" : "mismatch"}"><small>Diferencia</small><strong>${formatControlSalesMoney(order.varianceCents || 0)}</strong></article><article><small>Estado</small><strong>${escapeHtml(order.status)}</strong></article></div>
    ${warnings.length ? `<aside class="control-sales-warnings"><strong>⚠ Advertencias históricas</strong>${warnings.map((warning) => `<p>${escapeHtml(warning.description || warning.type || "Dato por revisar")}</p>`).join("")}</aside>` : ""}
    <section class="control-sales-detail-proforma"><h4>Datos de proforma</h4><div><article><small>Nombre comercial</small><strong>${escapeHtml(order.proformaData?.commercialName || order.client || "—")}</strong></article><article><small>Razón social</small><strong>${escapeHtml(order.proformaData?.legalName || "—")}</strong></article><article><small>Encargado</small><strong>${escapeHtml(order.proformaData?.contactName || "—")}</strong></article><article><small>Entrega</small><strong>${escapeHtml(order.proformaData?.deliveryDate ? formatDate(order.proformaData.deliveryDate) : "—")}</strong></article><article><small>Condición de pago</small><strong>${escapeHtml(order.proformaData?.paymentTerms || "—")}</strong></article><article><small>Estrategia</small><strong>${escapeHtml(order.proformaData?.strategy || "—")}</strong></article></div></section>
    <div class="control-sales-detail-lines"><div class="control-sales-detail-row head"><span>#</span><span>Producto</span><span>Talla</span><span>Cantidad</span><span>Precio</span><span>IVA</span><span>Total</span></div>${order.details.map((detail, index) => `<article class="control-sales-detail-row"><span>${index + 1}</span><strong>${escapeHtml(detail.product)}</strong><span>${escapeHtml(detail.size || "—")}</span><span>${escapeHtml(detail.quantity)}</span><span>${detail.unitPriceCents == null ? "Revisar" : formatControlSalesMoney(detail.unitPriceCents)}</span><span>${formatControlSalesMoney(detail.vatCents)}</span><strong>${formatControlSalesMoney(detail.lineTotalCents)}</strong></article>`).join("")}</div>
    <section class="control-sales-audit"><h4>Auditoría</h4>${order.audit.map((entry) => `<article><strong>${escapeHtml(entry.action)}</strong><span>${escapeHtml(entry.userName)} · ${escapeHtml(entry.createdAt)}</span><small>${escapeHtml(entry.summary)}</small></article>`).join("") || `<p>Historial importado desde Excel.</p>`}</section>
    <footer><button type="button" data-control-sales-detail-close>Cerrar</button><button type="button" class="danger-btn" data-control-sales-detail-archive="${order.id}">Anular pedido</button><button type="button" class="control-sales-print-btn" data-control-sales-detail-print="${order.id}">Imprimir pedido</button><button type="button" class="primary-btn" data-control-sales-detail-edit="${order.id}">Editar pedido</button></footer>`;
  detailDialog.showModal();
}

function wireControlSales() {
  const rerender = () => { state.controlSalesPage = 1; renderCommercialSubmenu(areas.operaciones); };
  document.querySelector("[data-control-sales-query]")?.addEventListener("input", (event) => { state.controlSalesQuery = event.target.value; rerender(); const input = document.querySelector("[data-control-sales-query]"); input?.focus({ preventScroll: true }); input?.setSelectionRange(input.value.length, input.value.length); });
  [["seller","controlSalesSeller"],["status","controlSalesStatus"],["sort","controlSalesSort"]].forEach(([name,key]) => document.querySelector(`[data-control-sales-${name}]`)?.addEventListener("change", (event) => { state[key] = event.target.value; rerender(); }));
  const fromDate = document.querySelector("[data-control-sales-date-from]");
  const toDate = document.querySelector("[data-control-sales-date-to]");
  const feedback = document.querySelector("[data-control-sales-date-feedback]");
  const commitDateRange = () => {
    if (!fromDate || !toDate) return false;
    const fromIso = controlSalesDisplayDateToIso(fromDate.value);
    const toIso = controlSalesDisplayDateToIso(toDate.value);
    fromDate.classList.toggle("invalid", !fromIso);
    toDate.classList.toggle("invalid", !toIso);
    if (!fromIso || !toIso) {
      if (feedback) feedback.textContent = "Completa ambas fechas en formato DD/MM/AAAA.";
      return false;
    }
    if (fromIso > toIso) {
      fromDate.classList.add("invalid");
      toDate.classList.add("invalid");
      if (feedback) feedback.textContent = "La fecha Desde no puede ser posterior a la fecha Hasta.";
      return false;
    }
    state.controlSalesDateFrom = fromIso;
    state.controlSalesDateTo = toIso;
    rerender();
    return true;
  };
  [fromDate, toDate].forEach((input) => {
    input?.addEventListener("input", () => {
      input.value = formatControlSalesDateInput(input.value);
      input.classList.remove("invalid");
      if (feedback) feedback.textContent = input.value.replace(/\D/g, "").length === 8 ? "Fecha lista. Presiona Enter o sal del campo para aplicar." : "Escribe 8 dígitos: día, mes y año.";
    });
    input?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        commitDateRange();
      }
    });
    input?.addEventListener("change", commitDateRange);
  });
  document.querySelector("[data-control-sales-new]")?.addEventListener("click", () => openControlSalesForm());
  document.querySelectorAll("[data-control-sales-print]").forEach((button) => button.addEventListener("click", () => {
    const order = state.controlSales.find((item) => item.id === button.dataset.controlSalesPrint);
    if (order) printControlSalesProforma(order);
  }));
  document.querySelectorAll("[data-control-sales-view]").forEach((button) => button.addEventListener("click", () => openControlSalesDetail(button.dataset.controlSalesView)));
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
    if (state.activeArea === "financiera" && state.activeSubmenu === "resultados-pedidos") {
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
    state.financialOrdersView = ["list", "notifications", "seller-kpi", "comparison-kpi"].includes(saved.view) ? saved.view : "list";
    state.financialComparisonYears = Array.isArray(saved.comparisonYears) ? saved.comparisonYears.map(String) : null;
    state.financialComparisonMonths = Array.isArray(saved.comparisonMonths) && saved.comparisonMonths.length ? saved.comparisonMonths.map(String) : ["Enero", "Febrero", "Marzo"];
  } catch {
    state.financialOrderYearFilter = "all";
    state.financialOrderMonthFilter = "all";
    state.financialOrdersView = "list";
    state.financialComparisonYears = null;
    state.financialComparisonMonths = ["Enero", "Febrero", "Marzo"];
  }
}

function saveFinancialOrderFilters() {
  localStorage.setItem(financialOrdersFiltersStorageKey, JSON.stringify({
    year: state.financialOrderYearFilter,
    month: state.financialOrderMonthFilter,
    view: state.financialOrdersView,
    comparisonYears: state.financialComparisonYears,
    comparisonMonths: state.financialComparisonMonths
  }));
}

function financialOrdersForSelectedPeriod() {
  return state.financialOrders.filter((order) => {
    if (state.financialOrderYearFilter !== "all" && String(order.year) !== state.financialOrderYearFilter) return false;
    if (state.financialOrderMonthFilter !== "all" && String(order.month) !== state.financialOrderMonthFilter) return false;
    return true;
  });
}

function filteredFinancialOrders() {
  const query = state.financialOrderQuery;
  const rows = financialOrdersForSelectedPeriod();
  return query ? rows.filter((order) => Object.values(order).some((value) => searchTokenMatches(value, query))) : rows;
}

function renderFinancialOrderTopbarFilters(isVisible) {
  financialOrdersTopbarFilters?.classList.toggle("hidden", !isVisible);
  financialOrdersTopbarFilters?.closest(".topbar")?.classList.toggle("financial-orders-filter-mode", isVisible);
  if (!isVisible || !financialOrderYearFilter || !financialOrderMonthFilter) return;
  const years = [...new Set(state.financialOrders.map((order) => String(order.year)).filter(Boolean))].sort((a, b) => Number(b) - Number(a));
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
        <button type="button" data-financial-order-new>+ Nuevo pedido</button>
      </div>
      <div class="financial-orders-table-wrap">
      <div class="financial-orders-table">
        <div class="financial-order-row header"><span>Fecha</span><span>#</span><span>Venta</span><span>Vendedor</span><span>Clientes</span><span>Acciones</span></div>
        ${pagedRows.map((order) => {
          const linkedOrder = linkedControlSalesByFinancialOrderId.get(String(order.id));
          const variance = Number(linkedOrder?.varianceCents || 0);
          return `
          <article class="financial-order-row">
            <span>${formatDate(order.date)}</span>
            <strong>${escapeHtml(order.number)}</strong>
            <strong class="financial-order-sale">${formatMoney(order.sale)}</strong>
            <span>${escapeHtml(order.seller)}</span>
            <span class="financial-order-client-cell">
              <span>${escapeHtml(order.client)}</span>
              ${linkedOrder ? `<em class="financial-order-entered-badge">Ingresado</em>` : ""}
              ${linkedOrder && variance !== 0 ? `<em class="financial-order-variance-badge" data-tone="${variance > 0 ? "over" : "under"}">Descuadre ${formatControlSalesMoney(variance)}</em>` : ""}
              ${linkedOrder && variance === 0 ? `<em class="financial-order-balanced-badge">Conciliado</em>` : ""}
            </span>
            <span class="financial-order-actions"><button type="button" data-financial-order-edit="${order.id}">Editar</button><button class="danger" type="button" data-financial-order-delete="${order.id}">Eliminar</button></span>
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
  const pendingHandoffs = pendingWonOrderOpportunities();
  const pendingTotal = sumAmounts(pendingHandoffs);
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
          <span>Oportunidades ganadas</span>
          <h4>Pedidos por crear</h4>
          <p>Cada cierre ganado en Oportunidades / Gerencia aparece aquí hasta convertirlo en pedido.</p>
        </div>
        <div class="financial-order-notifications-summary">
          <small>${pendingHandoffs.length === 1 ? "1 pendiente" : `${pendingHandoffs.length} pendientes`}</small>
          <strong>${formatMoney(pendingTotal)}</strong>
        </div>
      </header>
      <div class="financial-order-notifications-list">
        ${pendingHandoffs.map((item) => {
          const result = closureResult(item);
          return `
            <article class="financial-order-notification-card">
              <div class="financial-order-notification-icon" aria-hidden="true">✓</div>
              <div class="financial-order-notification-copy">
                <small>Oportunidad ganada · ${result?.date ? formatDate(result.date) : "Lista para pedido"}</small>
                <strong>${escapeHtml(item.company)}</strong>
                <span>${escapeHtml(item.seller || "Sin vendedor asignado")}</span>
              </div>
              <div class="financial-order-notification-amount">
                <small>Monto heredado</small>
                <strong>${formatMoney(item.amount)}</strong>
              </div>
              <button type="button" data-won-order-handoff="${escapeHtml(item.id)}">+ Crear pedido</button>
            </article>`;
        }).join("") || `
          <div class="financial-order-notifications-empty">
            <span aria-hidden="true">✓</span>
            <strong>Todo está al día</strong>
            <p>No hay oportunidades ganadas pendientes de convertir en pedido.</p>
          </div>`}
      </div>
    </section>`;
}

function financialOrdersBySeller() {
  const periodRows = financialOrdersForSelectedPeriod();
  const sellers = new Map();
  periodRows.forEach((order) => {
    const seller = String(order.seller || "Sin vendedor").trim() || "Sin vendedor";
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
    .filter((order) => normalizeKey(order.seller || "Sin vendedor") === sellerKey)
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
  const availableYears = [...new Set(state.financialOrders.map((order) => String(order.year)).filter(Boolean))].sort((a, b) => Number(a) - Number(b));
  if (!Array.isArray(state.financialComparisonYears)) state.financialComparisonYears = availableYears.slice(-2);
  state.financialComparisonYears = state.financialComparisonYears.filter((year) => availableYears.includes(year));
  const months = Array.from({ length: 12 }, (_, index) => monthLabel(index + 1));
  state.financialComparisonMonths = state.financialComparisonMonths.filter((month) => months.includes(month));
  const selectedMonths = months.filter((month) => state.financialComparisonMonths.includes(month));
  const series = state.financialComparisonYears.map((year) => ({
    year,
    values: selectedMonths.map((month) => state.financialOrders
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
  if (state.financialOrdersView === "seller-kpi") return renderFinancialOrdersSellerKpi();
  if (state.financialOrdersView === "comparison-kpi") return renderFinancialOrdersComparisonKpi();
  return renderFinancialOrderList();
}

function wireFinancialOrders() {
  opportunityTable.querySelectorAll("[data-financial-seller-detail]").forEach((button) => button.addEventListener("click", () => {
    renderFinancialSellerPortfolio(button.dataset.financialSellerDetail);
  }));
  opportunityTable.querySelectorAll("[data-comparison-all]").forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.comparisonAll === "year") state.financialComparisonYears = [...new Set(state.financialOrders.map((order) => String(order.year)).filter(Boolean))];
    else state.financialComparisonMonths = Array.from({ length: 12 }, (_, index) => monthLabel(index + 1));
    saveFinancialOrderFilters();
    renderCommercialSubmenu(areas.financiera);
  }));
  opportunityTable.querySelectorAll("[data-comparison-clear]").forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.comparisonClear === "year") state.financialComparisonYears = [];
    else state.financialComparisonMonths = [];
    saveFinancialOrderFilters();
    renderCommercialSubmenu(areas.financiera);
  }));
  opportunityTable.querySelectorAll("[data-comparison-year]").forEach((input) => input.addEventListener("change", () => {
    state.financialComparisonYears = [...opportunityTable.querySelectorAll("[data-comparison-year]:checked")].map((item) => item.value);
    saveFinancialOrderFilters();
    renderCommercialSubmenu(areas.financiera);
  }));
  opportunityTable.querySelectorAll("[data-comparison-month]").forEach((input) => input.addEventListener("change", () => {
    state.financialComparisonMonths = [...opportunityTable.querySelectorAll("[data-comparison-month]:checked")].map((item) => item.value);
    saveFinancialOrderFilters();
    renderCommercialSubmenu(areas.financiera);
  }));
  opportunityTable.querySelector("[data-financial-order-new]")?.addEventListener("click", () => {
    resetFinancialOrderForm();
    financialOrderDialog.showModal();
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
    renderCommercialSubmenu(areas.financiera);
    const input = opportunityTable.querySelector("[data-financial-order-search]");
    input?.focus();
    input?.setSelectionRange(input.value.length, input.value.length);
  });
  opportunityTable.querySelectorAll("[data-financial-order-page]").forEach((button) => button.addEventListener("click", () => {
    state.financialOrderPage += button.dataset.financialOrderPage === "next" ? 1 : -1;
    renderCommercialSubmenu(areas.financiera);
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
    renderCommercialSubmenu(areas.financiera);
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
  const totalAmount = sumAmounts(rows.map(({ item }) => item));
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
        ${rows.length ? rows.map(({ item, result }) => `
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
              <span class="closure-badge ${result?.result === "perdida" ? "lost" : "won"}">${result?.result === "perdida" ? "Perdida" : "Ganado"}</span>
            </div>
          </article>
        `).join("") : `
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
  return `
    <section class="management-requests" aria-label="Solicitudes a Gerencia General">
      <div class="management-request-body">
        ${items.length ? items.map((item) => `
          <article class="management-request-row">
            <div class="request-date-block">
              <span>Fecha</span>
              <strong>${formatDate(item.date)}</strong>
            </div>
            <div class="request-message-main">
              <span>Solicitud</span>
              <strong>${item.subject}</strong>
              <p>${item.message}</p>
              ${item.response ? `<div class="request-response"><span>Respuesta</span><p>${item.response}</p></div>` : ""}
            </div>
            <div class="request-route-block">
              <span>Origen</span>
              <strong>${item.owner}</strong>
              <span>Destino</span>
              <strong>${item.target}</strong>
            </div>
            <div class="request-status-block">
              <span>Estado</span>
              <strong class="tag notice">${item.status}</strong>
            </div>
            <div class="row-actions request-actions">
              <button class="ghost-btn compact-btn" type="button" data-request-action="response" data-area="${item.areaKey || state.activeArea}" data-id="${item.id}">Responder</button>
              <button class="ghost-btn compact-btn" type="button" data-request-action="status" data-status="En revision" data-area="${item.areaKey || state.activeArea}" data-id="${item.id}">En revision</button>
              <button class="ghost-btn compact-btn" type="button" data-request-action="status" data-status="Atendida" data-area="${item.areaKey || state.activeArea}" data-id="${item.id}">Atendida</button>
              <button class="action-icon-btn" type="button" data-request-action="edit" data-area="${item.areaKey || state.activeArea}" data-id="${item.id}" aria-label="Editar solicitud">
                <span aria-hidden="true">✎</span>
              </button>
              <button class="action-icon-btn danger" type="button" data-request-action="delete" data-area="${item.areaKey || state.activeArea}" data-id="${item.id}" aria-label="Borrar solicitud">
                <span aria-hidden="true">⌫</span>
              </button>
            </div>
          </article>
        `).join("") : `
          <div class="empty-state">
            No hay solicitudes enviadas. Usa Nueva solicitud para enviar un requerimiento a Gerencia General.
          </div>
        `}
      </div>
    </section>
  `;
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
  if (!data || !user || user.role !== "operativos") return "";
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
    customers: (data.customers || []).filter((item) => customerIds.has(item.id)),
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

function crmSalesUsers() {
  return crmData().users.filter((user) => user.roleId === "sales_exec");
}

function crmOwnerName(ownerId) {
  return crmData().users.find((user) => user.id === ownerId)?.name || "Sin vendedor";
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
    date: opportunity.nextDate || opportunity.deadline || opportunity.startDate || todayISO(),
    company: opportunity.company || "",
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
  opportunityDate.value = item?.date || todayISO();
  opportunityCompany.value = item?.company || "";
  if (context === "crm") {
    opportunitySeller.innerHTML = crmSortedSellers().map((seller) => (
      `<option value="${escapeHtml(seller.name)}">${escapeHtml(seller.name)}</option>`
    )).join("");
  }
  ensureSelectOption(opportunitySeller, item?.seller || crmSortedSellers()[0]?.name || commercialSellers[0]);
  opportunityContact.value = item?.contact || "";
  opportunityPhone.value = item?.phone || "";
  opportunitySegment.value = item?.segment || "";
  opportunityLocation.value = item?.location || "";
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
  const date = opportunity.nextDate || opportunity.deadline || opportunity.startDate || todayISO();
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
    agendaDate: opportunity.agendaDate || date,
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
    state.crmData = payload.crm;
    getOpportunitySubmenu().items = sanitizeTestOpportunities(normalizeOpportunities(payload.opportunities || []));
    localStorage.setItem(opportunitiesStorageKey, JSON.stringify(getOpportunitySubmenu().items));
    renderCommercialSubmenu(areas.comercializacion);
  } catch (error) {
    if (trigger) {
      trigger.disabled = false;
      trigger.textContent = originalText;
    }
    alert("No fue posible migrar la oportunidad. Recargue e intente nuevamente.");
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

function updateCrmModel(payload) {
  state.crmData = payload;
  renderCommercialSubmenu(areas.comercializacion);
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
  if (state.currentUser?.role !== "operativos") return true;
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
        <label>Segmento<input id="crmSegment" maxlength="80" placeholder="Industria, comercio, salud..."></label>
        <label>Ubicacion<input id="crmLocation" maxlength="90" placeholder="San Salvador"></label>
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

function crmEnsureSellerId() {
  const sellers = crmSortedSellers();
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
  const rows = crmData().opportunities
    .filter((opportunity) => isCrmArchivedOpportunity(opportunity))
    .filter((opportunity) => {
      if (!query) return true;
      return [
        opportunity.company,
        opportunity.owner?.name,
        crmOwnerName(opportunity.ownerId),
        opportunity.status,
        opportunity.archivedReason,
        opportunity.archivedBy
      ].some((value) => String(value || "").toLowerCase().includes(query));
    })
    .sort((a, b) => String(b.archivedAt || b.migratedAt || "").localeCompare(String(a.archivedAt || a.migratedAt || "")));
  return `
    <section class="crm-history-shell" aria-label="Bitacora de oportunidades">
      <div class="crm-history-summary">
        <div><span>Bitacora comercial</span><h4>Historial de oportunidades</h4></div>
        <p>${rows.length} registros conservados · ninguna anulacion elimina datos de la base</p>
      </div>
      <div class="crm-history-list">
        ${rows.map((opportunity) => {
          const isMigration = opportunity.archiveType === "migration" || opportunity.migratedToResults;
          const audit = [...(Array.isArray(opportunity.auditLog) ? opportunity.auditLog : [])].reverse()[0] || {};
          const date = String(opportunity.archivedAt || opportunity.migratedAt || audit.date || "").slice(0, 10);
          return `
            <article class="crm-history-card ${isMigration ? "is-migration" : "is-cancellation"}">
              <div class="crm-history-main">
                <span class="crm-history-status">${isMigration ? "Migrada a Gerencia" : escapeHtml(opportunity.status || "Anulada")}</span>
                <strong>${escapeHtml(opportunity.company || "Sin empresa")}</strong>
                <small>${escapeHtml(opportunity.owner?.name || crmOwnerName(opportunity.ownerId))}</small>
              </div>
              <div class="crm-history-reason">
                <span>Motivo / movimiento</span>
                <strong>${escapeHtml(opportunity.archivedReason || audit.reason || "Movimiento registrado")}</strong>
                <small>${escapeHtml(opportunity.archivedBy || opportunity.migratedBy || audit.userName || "Sistema")}${date ? ` · ${formatDate(date)}` : ""}</small>
              </div>
              <div class="crm-history-amount"><span>Monto historico</span><strong>${formatMoney(opportunity.estimatedAmount || 0)}</strong></div>
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
  const pageCount = Math.max(1, Math.ceil(rows.length / opportunityPageSize));
  state.crmOpportunityPage = Math.min(Math.max(Number(state.crmOpportunityPage) || 1, 1), pageCount);
  const pageStart = (state.crmOpportunityPage - 1) * opportunityPageSize;
  const pageEnd = pageStart + opportunityPageSize;
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
            <strong class="company-cell"><span class="company-name">${escapeHtml(opportunity.company || "Sin empresa")}</span></strong>
            <span>${escapeHtml(opportunity.owner?.name || crmOwnerName(opportunity.ownerId))}</span>
            <span>${escapeHtml(crmStageToOpportunityStage(opportunity))}</span>
            <span class="tag ${probabilityClass(probability)}">${escapeHtml(probabilityLabel(probability))}</span>
            <strong>${formatMoney(opportunity.estimatedAmount)}</strong>
            <span class="row-actions">
              ${canManage ? `<button class="action-icon-btn" type="button" data-crm-edit="${opportunity.id}" aria-label="Editar"><span aria-hidden="true">✏️</span></button>` : ""}
              <button class="action-icon-btn" type="button" data-crm-edit="${opportunity.id}" aria-label="Ver detalle"><span aria-hidden="true">📋</span></button>
              ${canManage ? `<button class="action-icon-btn danger" type="button" data-crm-delete="${opportunity.id}" aria-label="Borrar"><span aria-hidden="true">🗑️</span></button>` : ""}
            </span>
          </div>
        `;
      }).join("") : `<div class="empty-state">No hay oportunidades vigentes para este filtro.</div>`}
    </div>
    ${rows.length > opportunityPageSize ? `
      <div class="opportunity-pagination" aria-label="Paginacion de oportunidades CRM">
        <span>Mostrando ${pageStart + 1}-${Math.min(pageEnd, rows.length)} de ${rows.length}</span>
        <div>
          <button class="ghost-btn compact-btn" type="button" data-crm-page="prev" ${state.crmOpportunityPage <= 1 ? "disabled" : ""}>Anterior</button>
          <strong>Pagina ${state.crmOpportunityPage} de ${pageCount}</strong>
          <button class="ghost-btn compact-btn" type="button" data-crm-page="next" ${state.crmOpportunityPage >= pageCount ? "disabled" : ""}>Siguiente</button>
        </div>
      </div>
    ` : ""}
  `;
}

function renderCrmSellers() {
  const sellers = crmSortedSellers().filter((seller) => {
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

function renderCrmTracking() {
  const data = crmData();
  const linkedSellerId = crmLinkedSellerId();
  const sellers = crmSortedSellers();
  const selectedSellerId = crmEnsureSellerId();
  const selectedSeller = sellers.find((seller) => seller.id === selectedSellerId);
  const sellerOpportunities = selectedSeller ? data.opportunities.filter((opp) => opp.ownerId === selectedSeller.id) : [];
  const activeOpportunities = crmActiveOpportunitiesForSeller(selectedSellerId);
  const globalActiveOpportunities = data.opportunities.filter((opportunity) => !isCrmArchivedOpportunity(opportunity) && String(opportunity.status || "Vigente").toLowerCase() !== "ganada");
  const resultWins = crmResultWinHistory(selectedSeller);
  const resultClosures = getOpportunitySubmenu().items.filter((item) => (
    !selectedSeller || crmIdentityKey(item.seller) === crmIdentityKey(selectedSeller.name)
  ) && closureResult(item));
  const lostOpportunities = resultClosures.filter((item) => closureResult(item)?.result === "perdida");
  const activeValue = activeOpportunities.reduce((sum, opp) => sum + Number(opp.estimatedAmount || 0), 0);
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
  const visibleOpportunities = sellerOpportunities.filter((opportunity) => !isCrmArchivedOpportunity(opportunity));
  const sellerButtons = sellers.map((seller) => {
    const active = crmActiveOpportunitiesForSeller(seller.id);
    const activeTotal = active.reduce((sum, opp) => sum + Number(opp.estimatedAmount || 0), 0);
    return `
      <button class="crm-seller-chip ${seller.id === selectedSellerId ? "is-active" : ""}" type="button" data-crm-seller-only="${seller.id}">
        <strong>${escapeHtml(seller.name)}</strong>
        <span>${active.length} vigentes - ${formatMoney(activeTotal)}</span>
      </button>
    `;
  }).join("");
  const opportunityCards = visibleOpportunities.filter((opp) => crmMatchesSearch(opp, selectedSeller)).sort((a, b) => String(a.deadline || a.nextDate || "").localeCompare(String(b.deadline || b.nextDate || ""))).map((opp) => `
    <article class="crm-tracking-card" data-crm-opportunity="${opp.id}">
      <div>
        <span>${escapeHtml(opp.stage?.name || `${opp.stageId}. Etapa`)} - ${escapeHtml(opp.status || "Vigente")}</span>
        <strong>${escapeHtml(opp.company)}</strong>
        <p>${escapeHtml(opp.product || "Producto pendiente")}</p>
      </div>
      <footer>
        <strong>${opp.estimatedAmountLabel || formatMoney(opp.estimatedAmount || 0)}</strong>
        <span>${opp.closePercent || 0}% cierre</span>
        <button class="crm-link-pill" type="button" data-crm-migrate="${opp.id}" ${opportunityMigratedFromCrm(opp.id) ? "disabled" : ""}>
          ${opportunityMigratedFromCrm(opp.id) ? "Migrada" : "Migrar a resultados"}
        </button>
      </footer>
    </article>
  `).join("");
  const wonHistoryCards = filteredWins.map((win) => {
    const financialOrder = financialOrderByOpportunityId.get(String(win.id));
    const detailOrder = (financialOrder ? controlSalesByFinancialOrderId.get(String(financialOrder.id)) : null)
      || controlSalesByOpportunityId.get(String(win.id));
    return `
    <article class="crm-won-history-card">
      <div class="crm-won-history-date">
        <time>${formatDate(win.date)}</time>
        <span>${formatTime(win.time)}</span>
      </div>
      <div class="crm-won-history-client">
        <span>Cierre ganado</span>
        <strong>${escapeHtml(win.company)}</strong>
        <small>${escapeHtml(win.segment || "Sin producto registrado")}</small>
      </div>
      <div class="crm-won-history-result">
        <strong>${formatMoney(win.amount)}</strong>
        <span>${escapeHtml(win.seller || "Sin vendedor")}</span>
      </div>
      <p>${escapeHtml(win.comment || "Cierre ganado registrado.")}</p>
      <button type="button" class="crm-won-order-button ${detailOrder ? "is-ready" : ""}" data-crm-won-order="${escapeHtml(win.id)}">
        <span>${detailOrder ? "Pedido listo" : "Pedido"}</span>
        <strong>${detailOrder ? "Ver / editar / imprimir" : "Crear detalle"}</strong>
      </button>
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
          <div class="crm-seller-chip-list">${sellerButtons}</div>
        </aside>
        <section class="crm-tracking-main">
          <div class="crm-tracking-view-tabs" role="tablist" aria-label="Vistas de seguimiento">
            <button type="button" role="tab" data-crm-tracking-view="active" aria-selected="${state.crmTrackingView === "active"}" class="${state.crmTrackingView === "active" ? "is-active" : ""}">Vigentes <span>${visibleOpportunities.length}</span></button>
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
              <div class="crm-won-history-list">${wonHistoryCards || `<div class="empty-state">No hay oportunidades ganadas en el rango seleccionado.</div>`}</div>
            </section>
          ` : `
            <label class="opportunity-search crm-tracking-search">
              <span aria-hidden="true">⌕</span>
              <input type="search" data-crm-tracking-search value="${escapeHtml(state.crmSearch)}" placeholder="Buscar empresa, etapa, estatus o producto..." autocomplete="off">
            </label>
            <div class="crm-tracking-grid">${opportunityCards || `<div class="empty-state">No hay oportunidades para este filtro.</div>`}</div>
          `}
        </section>
      </div>
    </section>
  `;
}

function renderCrmAgenda() {
  const data = crmData();
  const sellers = crmSortedSellers();
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

function renderCrmClients() {
  const opportunities = crmData().opportunities.filter((opportunity) => !isCrmArchivedOpportunity(opportunity));
  const clients = Object.values(opportunities.reduce((acc, opp) => {
    const key = opp.customerId || opp.company;
    if (!acc[key]) acc[key] = { name: opp.customer?.commercialName || opp.company, owner: opp.owner?.name || crmOwnerName(opp.ownerId), count: 0, amount: 0, segment: opp.segment };
    acc[key].count += 1;
    acc[key].amount += Number(opp.estimatedAmount || 0);
    return acc;
  }, {})).slice(0, 80);
  return `
    <section class="crm-shell">
      <div class="crm-section-head hero-line"><strong>Clientes</strong><span>${clients.length} cuentas</span></div>
      <div class="crm-client-grid">
        ${clients.map((client) => `
          <article class="crm-client-card">
            <strong>${escapeHtml(client.name)}</strong>
            <span>${escapeHtml(client.segment || "Segmento pendiente")}</span>
            <div>
              <em>${escapeHtml(client.owner)}</em>
              <b>${formatMoney(client.amount)}</b>
            </div>
            <small>${client.count} oportunidades</small>
          </article>
        `).join("") || `<div class="empty-state">No hay clientes CRM.</div>`}
      </div>
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

  if (state.activeArea === "financiera" && submenu.key === "resultados-pedidos") {
    newOpportunityBtn.classList.add("hidden");
    newRiskBtn.classList.add("hidden");
    newManagementRequestBtn.classList.add("hidden");
    goalsMatrixBtn.classList.add("hidden");
    opportunityTable.classList.remove("hidden");
    opportunityDashboard.classList.add("hidden");
    financialOrdersViewTabs?.classList.remove("hidden");
    const pendingNotifications = pendingWonOrderOpportunities();
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
      ? `${pendingNotifications.length} pedidos pendientes de crear`
      : `${visibleOrders} de ${state.financialOrders.length} pedidos`;
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
  state.opportunityCycleView = resultView;
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
  const displayRows = state.opportunityCycleView === "history" ? historyRows : filteredActiveRows;
  opportunityTotalAmount.querySelector("strong").textContent = formatMoney(
    filteredActiveRows.reduce((sum, row) => sum + Number(row.item.amount || 0), 0)
  );
  const pageCount = Math.max(1, Math.ceil(displayRows.length / opportunityPageSize));
  state.opportunityPage = Math.min(Math.max(Number(state.opportunityPage) || 1, 1), pageCount);
  const pageStart = (state.opportunityPage - 1) * opportunityPageSize;
  const pageEnd = pageStart + opportunityPageSize;
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
      ${displayRows.length ? pagedRows.map(({ item, result, isInherited, isHistory, isImportedHistory }) => `
        <div class="opportunity-row ${isInherited ? "inherited" : ""} ${isHistory ? "archived" : ""} ${isImportedHistory ? "imported-history" : ""}">
          <span>${formatDate(item.date)}</span>
          <strong class="company-cell">
            <span class="company-name">${item.company}</span>
            ${isInherited ? `<span class="closure-badge inherited">Heredada</span>` : ""}
            ${isImportedHistory ? `<span class="closure-badge historical">Historico</span>` : ""}
            ${result ? `<span class="closure-badge ${result.result === "ganado" ? "won" : "lost"}">${result.result === "ganado" ? "Ganado" : "Perdida"}</span>` : ""}
            ${hasOutstandingSamples(item) ? `<span class="closure-badge samples-assigned">Muestras asignadas</span>` : ""}
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
            <button class="action-icon-btn" type="button" data-action="manage" data-id="${item.id}" aria-label="Gestiones">
              <span aria-hidden="true">📋</span>
            </button>
          `}
          ${canDeleteOpportunities() && !isHistory ? `
            <button class="action-icon-btn danger" type="button" data-action="delete" data-id="${item.id}" aria-label="Borrar">
              <span aria-hidden="true">🗑️</span>
            </button>
          ` : ""}
          </span>
        </div>
      `).join("") : `
        <div class="empty-state">
          No hay oportunidades vigentes para este periodo.
        </div>
      `}
    </div>
    ${displayRows.length > opportunityPageSize ? `
      <div class="opportunity-pagination" aria-label="Paginacion de oportunidades">
        <span>Mostrando ${pageStart + 1}-${Math.min(pageEnd, displayRows.length)} de ${displayRows.length}</span>
        <div>
          <button class="ghost-btn compact-btn" type="button" data-opportunity-page="prev" ${state.opportunityPage <= 1 ? "disabled" : ""}>Anterior</button>
          <strong>Pagina ${state.opportunityPage} de ${pageCount}</strong>
          <button class="ghost-btn compact-btn" type="button" data-opportunity-page="next" ${state.opportunityPage >= pageCount ? "disabled" : ""}>Siguiente</button>
        </div>
      </div>
    ` : ""}
    `}
  `;
}

function renderOpportunityDashboard(items) {
  items = visibleResultOpportunities(items);
  state.opportunityFilter = null;
  state.kpiView = "dashboard";
  const fulfillmentRows = wonSalesFulfillmentRows(items);
  const selectedSeller = commercialSellers.includes(state.kpiSeller) ? state.kpiSeller : "all";
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

function renderAdminPanel() {
  if (!adminPanel) return;
  adminPanel.classList.remove("hidden");
  const keepAdminSearchFocus = document.activeElement?.id === "adminSearchInput";
  const currentMatrix = adminPanel.querySelector(".permission-matrix-shell");
  const matrixScroll = currentMatrix
    ? { top: currentMatrix.scrollTop, left: currentMatrix.scrollLeft }
    : null;
  const activeAdminSubmenu = ["actas", "cambiar-contrasena"].includes(state.activeSubmenu)
    ? state.activeSubmenu
    : "permisos";
  adminPanel.innerHTML = activeAdminSubmenu === "actas"
    ? renderAdminMinutesPanel()
    : activeAdminSubmenu === "cambiar-contrasena"
      ? renderAccountPasswordPanel()
      : renderAdminPermissionsPanel();
  if (activeAdminSubmenu === "actas") wireAdminMinutesPanel();
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
  const isResultsView = state.activeArea === "comercializacion" && activeSubmenu?.key?.startsWith("resultados");
  const isKpiView = state.activeArea === "comercializacion" && activeSubmenu?.key === "kpi";
  const isFinancialOrdersView = state.activeArea === "financiera" && activeSubmenu?.key === "resultados-pedidos";
  pageTitle.classList.toggle("with-results-summary", isResultsView || isKpiView);
  renderFinancialOrderTopbarFilters(isFinancialOrdersView);

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
    pageTitle.classList.remove("with-results-summary");
    pageTitle.textContent = activeAdminSubmenu?.label || area.label;
    if (state.activeSubmenu === "actas") renderAdminMinutesTopbar();
    else minutesTopbarTabs?.classList.add("hidden");
    periodLabel.textContent = state.activeSubmenu === "actas"
      ? (state.adminMinuteView === "history" ? "Historial de actas" : "Nueva acta")
      : state.activeSubmenu === "cambiar-contrasena"
        ? "Seguridad de la cuenta"
      : ["riesgos", "solicitudes"].includes(state.activeSubmenu)
        ? "Consolidado gerencial"
        : "Control de accesos";
    topbarActions?.classList.add("hidden");
    overallStatus.textContent = state.activeSubmenu === "actas"
      ? `${state.minutes.length} actas`
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
  dashboard.classList.toggle("opportunity-focus", hasSubmenus && (["kpi", "crm", "crm-seguimiento", "crm-agenda", "crm-respuestas", "crm-clientes", "riesgos", "solicitudes"].includes(state.activeSubmenu) || state.activeSubmenu.startsWith("resultados")));
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
      financiera: "resultados-pedidos",
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
  const cycleButton = event.target.closest("[data-cycle-view]");
  if (cycleButton) {
    state.opportunityCycleView = cycleButton.dataset.cycleView;
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
    const submenu = findManagementRequestSubmenu(requestButton.dataset.area || state.activeArea);
    const item = submenu.items.find((record) => record.id === requestButton.dataset.id);
    if (!item) return;

    if (requestButton.dataset.requestAction === "delete") {
      submenu.items = submenu.items.filter((record) => record.id !== item.id);
      saveManagementRequests();
      renderCommercialSubmenu(areas[state.activeArea]);
      return;
    }

    if (requestButton.dataset.requestAction === "response") {
      const response = prompt("Respuesta de la gerencia:", item.response || "");
      if (response === null) return;
      item.response = response.trim();
      item.status = item.response ? "Respondida" : item.status;
      saveManagementRequests();
      renderCommercialSubmenu(areas[state.activeArea]);
      return;
    }

    if (requestButton.dataset.requestAction === "status") {
      item.status = requestButton.dataset.status || item.status;
      saveManagementRequests();
      renderCommercialSubmenu(areas[state.activeArea]);
      return;
    }

    managementRequestId.value = item.id;
    state.managementRequestAreaKey = requestButton.dataset.area || state.activeArea;
    managementRequestDate.value = item.date;
    managementRequestSubject.value = item.subject;
    managementRequestMessage.value = item.message;
    managementRequestTitle.textContent = "Editar solicitud";
    saveManagementRequestBtn.textContent = "Actualizar solicitud";
    managementRequestDialog.showModal();
    return;
  }

  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const submenu = getOpportunitySubmenu();
  const item = submenu.items.find((record) => record.id === button.dataset.id);
  if (!item) return;

  if (button.dataset.action === "delete") {
    if (!canDeleteOpportunities()) return;
    submenu.items = submenu.items.filter((record) => record.id !== item.id);
    saveOpportunities();
    renderCommercialSubmenu(areas.comercializacion);
    resetOpportunityForm();
    return;
  }

  if (button.dataset.action === "manage") {
    openManagementDialog(item);
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
  opportunitySegment.value = item.segment || "";
  opportunityLocation.value = item.location || "";
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

function openManagementDialog(item) {
  managementOpportunityId.value = item.id;
  managementDialogTitle.textContent = item.company;
  resetManagementEntry(item);
  updateClosureControls();
  renderManagements(item);
  resetSampleCustodyForm();
  renderSampleCustodies(item);
  setSampleCustodyMode(false);
  managementDialog.showModal();
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
    button.addEventListener("click", () => {
      if (!confirm("Eliminar esta línea del historial de custodia?")) return;
      item.sampleCustodies = records.filter((record) => record.id !== button.dataset.sampleCustodyDelete);
      saveOpportunities();
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

function cancelManagementRecord(item, managementId) {
  if (!canCancelManagements()) return;
  item.managements = normalizeManagements(item);
  const management = item.managements.find((record) => record.id === managementId);
  if (!management || management.canceled) return;

  const reason = prompt("Motivo de anulacion de la gestion:");
  if (reason === null) return;

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
  const submenu = getOpportunitySubmenu();
  return submenu.items.find((record) => record.id === managementOpportunityId.value);
}

function updateClosureControls() {
  const isClosing = isClosureStage(managementStage.value);
  const isWon = managementResult.value === "ganado";
  const item = currentManagementItem();
  const hasWonClosure = closureResult(item || {})?.result === "ganado";
  const hasNotification = Boolean(item?.managements?.some((management) => management.notified));
  managementResultField.classList.toggle("hidden", !isClosing);
  managementResult.classList.toggle("result-won", isWon);
  managementResult.classList.toggle("result-lost", !isWon);
  notifyOperationsBtn.classList.toggle("hidden", !hasWonClosure);
  notifyOperationsBtn.textContent = hasNotification ? "Notificado" : "Notificar";
  notifyOperationsBtn.disabled = hasNotification;
}

opportunityForm.addEventListener("submit", (event) => {
  if (event.submitter && event.submitter.value === "cancel") return;
  event.preventDefault();
  if (state.opportunityFormContext === "crm") {
    const id = opportunityId.value;
    const seller = crmSalesUsers().find((user) => normalizeKey(user.name) === normalizeKey(opportunitySeller.value));
    const stageId = Math.max(1, opportunityStages.indexOf(opportunityStage.value) + 1);
    const temperature = { caliente: "Caliente", tibio: "Tibio", frio: "Frio", congelado: "Congelado" }[opportunityProbability.value] || "Tibio";
    const payload = {
      company: opportunityCompany.value.trim(),
      product: opportunitySegment.value.trim(),
      contact: opportunityContact.value.trim(),
      responsible: opportunityContact.value.trim(),
      phone: opportunityPhone.value.trim(),
      segment: opportunitySegment.value.trim(),
      location: opportunityLocation.value.trim(),
      ownerId: seller?.id || state.crmSellerId || crmSalesUsers()[0]?.id || "",
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

managementForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const submenu = getOpportunitySubmenu();
  const item = submenu.items.find((record) => record.id === managementOpportunityId.value);
  if (!item) return;

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

saveSampleCustody.addEventListener("click", () => {
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
  saveOpportunities();
  renderSampleCustodies(item);
  renderCommercialSubmenu(areas.comercializacion);
  resetSampleCustodyForm();
});

notifyOperationsBtn.addEventListener("click", () => {
  const submenu = getOpportunitySubmenu();
  const item = submenu.items.find((record) => record.id === managementOpportunityId.value);
  if (!item || closureResult(item)?.result !== "ganado") return;
  if (item.managements?.some((management) => management.notified)) return;

  areas.operaciones.requests.unshift([
    `Oportunidad ganada: ${item.company}`,
    "Comercializacion",
    "Alta",
    "Pendiente"
  ]);
  item.managements = normalizeManagements(item);
  item.managements.push({
    id: crypto.randomUUID(),
    date: managementDate.value || new Date().toISOString().slice(0, 10),
    time: currentTimeValue(),
    stage: closureStage,
    result: "",
    comment: "Notificacion enviada a gerencia de operaciones.",
    notified: true
  });
  item.stage = closureStage;
  saveOpportunities();
  renderManagements(item);
  renderCommercialSubmenu(areas.comercializacion);
  notifyOperationsBtn.textContent = "Notificado";
  notifyOperationsBtn.disabled = true;
});

function closeManagementForm() {
  managementDialog.close();
  managementForm.reset();
  managementEditId.value = "";
  notifyOperationsBtn.textContent = "Notificar";
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
    renderCommercialSubmenu(areas.financiera);
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
  renderCommercialSubmenu(areas.financiera);
});
financialOrderMonthFilter?.addEventListener("change", () => {
  state.financialOrderMonthFilter = financialOrderMonthFilter.value;
  state.financialOrderPage = 1;
  saveFinancialOrderFilters();
  renderCommercialSubmenu(areas.financiera);
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
    renderCommercialSubmenu(areas.financiera);
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
loadFinancialOrders();
syncFinancialOrdersWithApi();
loadAccountsReceivable();
loadPurchaseOrders();
loadControlSales();
loadOpportunities();
loadStrategicRisks();
loadManagementRequests();
loadMinutes();
loadCrmData();
resetOpportunityForm();
