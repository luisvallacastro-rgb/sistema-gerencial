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
      { key: "resultados", label: "Resultados", status: "Sin datos cargados", items: [] },
      { key: "kpi", label: "KPI", status: "Sin datos cargados", items: [] },
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
        key: "resultados",
        label: "Resultados",
        status: "Pipeline activo",
        items: []
      },
      {
        key: "kpi",
        label: "KPI",
        status: "Dashboard visual",
        items: []
      },
      {
        key: "crm",
        label: "CRM",
        status: "Operacion comercial",
        items: []
      },
      {
        key: "crm-vendedores",
        label: "Vendedores",
        status: "Equipo comercial",
        items: []
      },
      {
        key: "crm-seguimiento",
        label: "Seguimiento",
        status: "Pipeline por etapa",
        items: []
      },
      {
        key: "crm-agenda",
        label: "Agenda",
        status: "Visitas y acciones",
        items: []
      },
      {
        key: "crm-respuestas",
        label: "Respuestas",
        status: "Gestiones de campo",
        items: []
      },
      {
        key: "crm-clientes",
        label: "Clientes",
        status: "Ficha comercial",
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
      { key: "resultados", label: "Resultados", status: "Sin datos cargados", items: [] },
      { key: "kpi", label: "KPI", status: "Sin datos cargados", items: [] },
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
      { key: "resultados", label: "Resultados", status: "Sin datos cargados", items: [] },
      { key: "kpi", label: "KPI", status: "Sin datos cargados", items: [] },
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
  role: "general",
  currentUser: null,
  activeArea: "general",
  activeSubmenu: "resultados",
  commercialMenuOpen: true,
  opportunityFilter: null,
  opportunityCycleView: "active",
  kpiView: "dashboard",
  kpiSeller: "all",
  adminQuery: "",
  crmData: null,
  crmSellerId: "",
  crmStatusFilter: "Vigente",
  crmSearch: "",
  period: "Julio 2026"
};

const areaKeys = ["comercializacion", "financiera", "operaciones", "rrhh"];
const areaOptions = areaKeys;
const adminEmail = "luisvallacastro@gmail.com";
const adminAreaKey = "administracion";
const sectionOptions = [
  { key: "resultados", label: "Resultados" },
  { key: "kpi", label: "KPI" },
  { key: "crm", label: "CRM" },
  { key: "crm-vendedores", label: "CRM Vendedores" },
  { key: "crm-seguimiento", label: "CRM Seguimiento" },
  { key: "crm-agenda", label: "CRM Agenda" },
  { key: "crm-respuestas", label: "CRM Respuestas" },
  { key: "crm-clientes", label: "CRM Clientes" },
  { key: "presentaciones", label: "Presentaciones" },
  { key: "riesgos", label: "Riesgos" },
  { key: "solicitudes", label: "Solicitudes" }
];
areas[adminAreaKey] = {
  label: "Administracion",
  nav: "Administracion",
  status: "Usuarios",
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
  ["caliente", "Caliente", "80% o mas"],
  ["tibio", "Tibio", "50% a 79%"],
  ["frio", "Frio", "20% a 49%"],
  ["congelado", "Congelado", "Menos de 20%"]
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
const strategicRisksStorageKey = "sistemaGerencial.riesgos.v2";
const managementRequestsStorageKey = "sistemaGerencial.solicitudes.v2";
const legacyStrategicRisksStorageKey = "sistemaGerencial.riesgos.v1";
const legacyManagementRequestsStorageKey = "sistemaGerencial.solicitudes.v1";
const defaultUsers = [
  { id: "user-admin-luis", name: "Luis Valladares", username: "luisvallacastro", email: adminEmail, role: "financiera", password: "admin123", admin: true },
  { id: "user-general", name: "Gerencia general", username: "general", email: "general@empresa.local", role: "general", password: "admin123" },
  { id: "user-accionistas", name: "Accionistas", username: "accionistas", email: "accionistas@empresa.local", role: "accionistas", password: "admin123" },
  { id: "user-financiera", name: "Gerencia financiera", username: "financiera", email: "financiera@empresa.local", role: "financiera", password: "admin123" },
  { id: "user-comercial", name: "Gerencia comercializacion", username: "comercializacion", email: "comercializacion@empresa.local", role: "comercializacion", password: "admin123" },
  { id: "user-operaciones", name: "Gerencia operaciones", username: "operaciones", email: "operaciones@empresa.local", role: "operaciones", password: "admin123" },
  { id: "user-rrhh", name: "Gerencia recursos humanos", username: "rrhh", email: "rrhh@empresa.local", role: "rrhh", password: "admin123" }
];
const accessRoles = [
  ["general", "Gerencia general"],
  ["accionistas", "Accionistas"],
  ["comercializacion", "Comercializacion"],
  ["financiera", "Financiera"],
  ["operaciones", "Operaciones"],
  ["rrhh", "Recursos humanos"]
];
let systemUsers = [];
let sessionRestored = false;
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
const sidebarToggleBtn = document.querySelector("#sidebarToggleBtn");
const sidebarRestoreBtn = document.querySelector("#sidebarRestoreBtn");
const navList = document.querySelector("#navList");
const dashboard = document.querySelector(".dashboard");
const pageTitle = document.querySelector("#pageTitle");
const periodLabel = document.querySelector("#periodLabel");
const periodSelect = document.querySelector("#periodSelect");
const topbarActions = document.querySelector(".topbar-actions");
const summaryGrid = document.querySelector("#summaryGrid");
const resultsChart = document.querySelector("#resultsChart");
const kpiList = document.querySelector("#kpiList");
const riskList = document.querySelector("#riskList");
const requestTable = document.querySelector("#requestTable");
const commercialPanel = document.querySelector("#commercialPanel");
const commercialSubmenuTitle = document.querySelector("#commercialSubmenuTitle");
const commercialSubmenuStatus = document.querySelector("#commercialSubmenuStatus");
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
const managementTable = document.querySelector("#managementTable");
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

function permissionKey(areaKey, sectionKey) {
  return `${areaKey}:${sectionKey}`;
}

function allPermissionKeys() {
  return areaKeys.flatMap((areaKey) => sectionOptions.map((section) => permissionKey(areaKey, section.key)));
}

const sharedDefaultSections = ["riesgos", "solicitudes"];

function sharedDefaultPermissionKeys() {
  return areaKeys.flatMap((areaKey) => sharedDefaultSections.map((sectionKey) => permissionKey(areaKey, sectionKey)));
}

function withSharedDefaultPermissions(permissions) {
  return [...new Set([...permissions, ...sharedDefaultPermissionKeys()])];
}

function defaultPermissionsForRole(role) {
  return allPermissionKeys();
}

function normalizePermissionList(value, role) {
  return allPermissionKeys();
}

function isAdminUser(user = state.currentUser) {
  return Boolean(user?.admin) || normalizeKey(user?.email) === adminEmail;
}

function userPermissions(user = state.currentUser) {
  return new Set(allPermissionKeys());
}

function visibleSubmenus(areaKey, user = state.currentUser) {
  const area = areas[areaKey];
  if (!Array.isArray(area?.submenus)) return [];
  const permissions = userPermissions(user);
  return area.submenus.filter((item) => permissions.has(permissionKey(areaKey, item.key)));
}

function fallbackAreaForRole(role) {
  return areaKeys.includes(role) ? role : "comercializacion";
}

function allowedAreas(user = state.currentUser) {
  const visible = areaKeys.filter((areaKey) => visibleSubmenus(areaKey, user).length);
  if (isAdminUser(user)) visible.push(adminAreaKey);
  return visible.length ? visible : [fallbackAreaForRole(user?.role || state.role)];
}

function canDeleteOpportunities() {
  return isAdminUser() || state.role === "general" || state.role === "financiera";
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
  return [...managements].reverse().find((management) => isClosureStage(management.stage) && management.result);
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
      isHistory: isClosedBeforePeriod,
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
    active: rows.filter((row) => !row.isHistory && !row.isFuture).sort(sortRows),
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
  if (management.notified) return `<span class="tag notice">Notificado</span>`;
  if (!management.result) return "<span></span>";
  return `<span class="tag ${management.result === "ganado" ? "" : "danger"}">${management.result === "ganado" ? "Ganado" : "Perdida"}</span>`;
}

function renderKpiDetailReport(seller, category) {
  const submenu = getOpportunitySubmenu();
  const items = kpiDetailItems(submenu.items, seller, category);
  const historicalMonthNumber = Math.max(Math.min(activeMonthNumber() - 1, 6), 0);
  const includeHistorical = ["won", "all", "historical"].includes(category);
  const actualRows = includeHistorical
    ? actualClosedRowsForSeller(seller, category === "historical" ? historicalMonthNumber : activeMonthNumber())
    : [];
  const historicalRows = includeHistorical
    ? historicalClosedRowsForSeller(seller, category === "historical" ? historicalMonthNumber : activeMonthNumber())
    : [];
  const actualTotal = actualRows.reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const actualCount = actualRows.reduce((sum, row) => sum + Number(row.count || 0), 0);
  const total = sumAmounts(items) + actualTotal;
  const won = items.filter((item) => closureResult(item)?.result === "ganado").length + actualCount;
  const lost = items.filter((item) => closureResult(item)?.result === "perdida").length;
  const pending = items.filter((item) => !closureResult(item)).length;
  const label = kpiDetailLabel(category);
  const activeItems = kpiMonthItems(submenu.items)
    .filter((item) => item.seller === seller && !closureResult(item));

  kpiDetailEyebrow.textContent = `KPI / ${label}`;
  kpiDetailTitle.textContent = `${seller} - ${label}`;
  kpiDetailSummary.classList.add("tabbed");
  kpiDetailSummary.innerHTML = `
    <div class="kpi-report-tabs" role="tablist" aria-label="Vistas del reporte KPI">
      <button class="active" type="button" data-kpi-report-tab="general">Conteo general</button>
      <button type="button" data-kpi-report-tab="detalle">Detalle historico</button>
      <button type="button" data-kpi-report-tab="vigentes">Vigentes</button>
    </div>
  `;

  const generalSection = `
    <section class="kpi-report-view active" data-kpi-report-view="general">
      <div class="kpi-report-counts">
        <article>
          <span>Registros</span>
          <strong>${items.length + actualCount}</strong>
        </article>
        <article>
          <span>Monto consolidado</span>
          <strong>${formatMoney(total)}</strong>
        </article>
        <article>
          <span>Ganadas</span>
          <strong>${won}</strong>
        </article>
        <article>
          <span>Perdidas</span>
          <strong>${lost}</strong>
        </article>
        <article>
          <span>${category === "historical" ? "Historico" : "Pendientes"}</span>
          <strong>${pending}</strong>
        </article>
      </div>
      <div class="kpi-report-section">
        ${actualRows.length ? `
      <div class="kpi-report-section-head">
        <div>
          <span>Historico real</span>
          <strong>Cierres acumulados a ${monthLabel(category === "historical" ? historicalMonthNumber : activeMonthNumber())} ${activePeriodYear()}</strong>
        </div>
        <strong>${actualCount} registros / ${formatMoney(actualTotal)}</strong>
      </div>
      <div class="kpi-period-table">
        <div class="kpi-period-row kpi-period-header">
          <strong>Periodo</strong>
          <strong>Registros</strong>
          <strong>Monto</strong>
        </div>
        ${actualRows.map((row) => `
          <div class="kpi-period-row">
            <span>${monthLabel(row.month)} ${activePeriodYear()}</span>
            <strong>${row.count}</strong>
            <strong>${formatMoney(row.amount)}</strong>
          </div>
        `).join("")}
      </div>
        ` : `<div class="empty-state">No hay cierres historicos para este filtro.</div>`}
      </div>
    </section>
  `;

  const historicalSection = `
    <section class="kpi-report-view" data-kpi-report-view="detalle">
      <div class="kpi-report-section">
      <div class="kpi-report-section-head">
        <div>
          <span>Detalle historico</span>
          <strong>Ventas importadas por empresa</strong>
        </div>
        <strong>${historicalRows.length} registros</strong>
      </div>
      ${historicalRows.length ? `
      <div class="kpi-sales-table">
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
      ` : `<div class="empty-state">No hay ventas historicas importadas para este filtro.</div>`}
      </div>
    </section>
  `;

  const activeSection = `
    <section class="kpi-report-view" data-kpi-report-view="vigentes">
      <div class="kpi-report-section">
      <div class="kpi-report-section-head">
        <div>
          <span>Vigentes</span>
          <strong>Resumen de oportunidades abiertas</strong>
        </div>
        <strong>${activeItems.length} oportunidades</strong>
      </div>
      ${activeItems.length ? `
      <div class="kpi-active-table">
        <div class="kpi-active-row kpi-active-header">
          <strong>Empresa</strong>
          <strong>Ingreso</strong>
          <strong>Etapa</strong>
          <strong>Probabilidad</strong>
          <strong>Monto</strong>
        </div>
        ${activeItems.map((item) => `
          <div class="kpi-active-row">
            <strong>${item.company}</strong>
            <span>${formatDateTime(item.date, item.time)}</span>
            <span>${item.stage}</span>
            <span class="tag ${probabilityClass(item.probability)}">${probabilityLabel(item.probability)}</span>
            <strong>${formatMoney(item.amount)}</strong>
          </div>
        `).join("")}
      </div>
      ` : `<div class="empty-state">No hay oportunidades vigentes para ${seller}.</div>`}
      </div>
    </section>
  `;

  const opportunitySection = items.length ? `
    <section class="kpi-report-view hidden-trace" data-kpi-report-view="trazabilidad">
      <div class="kpi-report-section">
      <div class="kpi-report-section-head">
        <div>
          <span>Trazabilidad</span>
          <strong>Seguimiento detallado</strong>
        </div>
      </div>
      ${items.map((item) => {
    const managements = normalizeManagements(item)
      .slice()
      .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
    const result = closureResult(item);
    const latest = managements[managements.length - 1];
    return `
      <article class="kpi-report-card">
        <div class="kpi-report-head">
          <div>
            <strong>${item.company}</strong>
            <span>${item.seller} / ${formatMoney(item.amount)}</span>
          </div>
          <div class="kpi-report-tags">
            <span class="tag ${probabilityClass(item.probability)}">${probabilityLabel(item.probability)}</span>
            ${result ? `<span class="tag ${result.result === "ganado" ? "" : "danger"}">${result.result === "ganado" ? "Ganada" : "Perdida"}</span>` : `<span class="tag warn">Pendiente</span>`}
          </div>
        </div>
        <div class="kpi-report-meta">
          <span><small>Ingreso</small><strong>${formatDateTime(item.date, item.time)}</strong></span>
          <span><small>Etapa actual</small><strong>${item.stage}</strong></span>
          <span><small>Ultima gestion</small><strong>${latest ? formatDateTime(latest.date, latest.time) : formatDateTime(item.date, item.time)}</strong></span>
        </div>
        <div class="kpi-history">
          ${managements.map((management) => `
            <div class="kpi-history-item">
              <span class="kpi-history-date">
                <strong>${formatDate(management.date)}</strong>
                <small>${formatTime(management.time)}</small>
              </span>
              <span class="tag info">${management.stage}</span>
              ${managementResultTag(management)}
              <p>${management.comment}</p>
            </div>
          `).join("")}
        </div>
      </article>
    `;
  }).join("")}
      </div>
    </section>
  ` : "";

  kpiDetailReport.innerHTML = [generalSection, historicalSection, activeSection, opportunitySection].join("");

  kpiDetailDialog.showModal();
}

function getOpportunitySubmenu() {
  return areas.comercializacion.submenus.find((item) => item.key === "resultados");
}

function getAreaSubmenu(areaKey, submenuKey) {
  const area = areas[areaKey];
  return Array.isArray(area?.submenus)
    ? area.submenus.find((item) => item.key === submenuKey)
    : null;
}

function getStrategicRiskSubmenu(areaKey = state.activeArea) {
  return getAreaSubmenu(areaKey, "riesgos") || getAreaSubmenu("comercializacion", "riesgos");
}

function getManagementRequestSubmenu(areaKey = state.activeArea) {
  return getAreaSubmenu(areaKey, "solicitudes") || getAreaSubmenu("comercializacion", "solicitudes");
}

function submenuItemsByArea(submenuKey) {
  return Object.fromEntries(areaKeys.map((areaKey) => [
    areaKey,
    getAreaSubmenu(areaKey, submenuKey)?.items || []
  ]));
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
    status: item.status || "Notificado"
  }));
}

function loadStrategicRisks() {
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(strategicRisksStorageKey) || "null");
  } catch {
    saved = null;
  }
  if (!saved) {
    saved = legacyRecordsByArea(legacyStrategicRisksStorageKey, demoStrategicRiskIds);
  }
  areaKeys.forEach((areaKey) => {
    const source = Array.isArray(saved?.[areaKey]) ? saved[areaKey] : defaultStrategicRisks;
    getStrategicRiskSubmenu(areaKey).items = normalizeStrategicRisks(source, areaKey);
  });
  saveStrategicRisks();
}

function saveStrategicRisks() {
  localStorage.setItem(strategicRisksStorageKey, JSON.stringify(submenuItemsByArea("riesgos")));
}

function normalizeManagementRequests(items, areaKey = state.activeArea) {
  return items.map((item, index) => ({
    id: item.id || `req-${index + 1}`,
    date: item.date || todayISO(),
    owner: item.owner || areas[areaKey]?.nav || currentRequestOwner(),
    target: item.target || "Gerencia general",
    subject: item.subject || "",
    message: item.message || "",
    status: item.status || "Enviada"
  }));
}

function loadManagementRequests() {
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(managementRequestsStorageKey) || "null");
  } catch {
    saved = null;
  }
  if (!saved) {
    saved = legacyRecordsByArea(legacyManagementRequestsStorageKey, demoManagementRequestIds);
  }
  areaKeys.forEach((areaKey) => {
    const source = Array.isArray(saved?.[areaKey]) ? saved[areaKey] : defaultManagementRequests;
    getManagementRequestSubmenu(areaKey).items = normalizeManagementRequests(source, areaKey);
  });
  saveManagementRequests();
}

function saveManagementRequests() {
  localStorage.setItem(managementRequestsStorageKey, JSON.stringify(submenuItemsByArea("solicitudes")));
}

function resetManagementRequestForm() {
  managementRequestForm.reset();
  managementRequestId.value = "";
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
      time: management.time || seededTime(index + 1)
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
        if (isClosureStage(management.stage) && management.result) {
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
    const latestClosure = [...ordered].reverse().find((management) => isClosureStage(management.stage) && management.result);
    const latestManagement = [...ordered].reverse().find((management) => !management.notified);
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
      .then(() => syncOpportunityViews())
      .catch(() => {});
  }
}

function resetOpportunityForm() {
  opportunityForm.reset();
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
    const avg = area.results.length
      ? Math.round(area.results.reduce((sum, item) => sum + item[1], 0) / area.results.length)
      : 100;
    const button = document.createElement("button");
    button.className = `nav-item ${state.activeArea === key ? "active" : ""}`;
    button.type = "button";
    button.setAttribute("aria-expanded", hasSubmenus ? String(state.activeArea === key && state.commercialMenuOpen) : "false");
    button.innerHTML = `<span>${area.nav}</span><span class="nav-dot ${levelClass(avg)}"></span>`;
    button.addEventListener("click", () => {
      if (key === adminAreaKey) {
        state.activeArea = adminAreaKey;
        state.commercialMenuOpen = false;
        renderDashboard();
        return;
      }
      if (hasSubmenus && state.activeArea === key) {
        state.commercialMenuOpen = !state.commercialMenuOpen;
        renderDashboard();
        return;
      }
      state.activeArea = key;
      if (hasSubmenus) {
        state.activeSubmenu = submenus[0].key;
        state.commercialMenuOpen = true;
      }
      renderDashboard();
    });
    navList.appendChild(button);
    if (hasSubmenus) renderSubmenu(area, key, submenus);
  });
}

function renderSubmenu(area, areaKey, items = visibleSubmenus(areaKey)) {
  const submenu = document.createElement("div");
  submenu.className = `submenu-list ${state.activeArea === areaKey && state.commercialMenuOpen ? "open" : ""}`;
  submenu.innerHTML = items.map((item) => `
    <button class="submenu-item ${item.key === "crm" ? "crm-parent" : item.key.startsWith("crm-") ? "crm-child" : ""} ${state.activeArea === areaKey && state.activeSubmenu === item.key ? "active" : ""}" type="button" data-submenu="${item.key}">
      ${item.label}
    </button>
  `).join("");
  submenu.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeArea = areaKey;
      state.activeSubmenu = button.dataset.submenu;
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
          <div class="chart-legend">
            <span><i class="plan"></i>Meta</span>
            <span><i class="actual"></i>Alcanzado</span>
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
      <div class="strategic-risk-row strategic-risk-header">
        <strong>Fecha</strong>
        <strong>Riesgo</strong>
        <strong>Gestiona</strong>
        <strong>Gerencias involucradas</strong>
        <strong>Estado</strong>
      </div>
      <div class="strategic-risk-body">
        ${items.length ? items.map((item) => `
          <article class="strategic-risk-row">
            <span>${formatDate(item.date)}</span>
            <strong>${item.risk}</strong>
            <span>${item.owner}</span>
            <span class="risk-impact-tags">
              ${item.affectsOthers && item.involved.length
                ? item.involved.map((name) => `<em>${name}</em>`).join("")
                : "<em>Sin repercusion</em>"}
            </span>
            <span class="tag notice">${item.status}</span>
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

function renderManagementRequests(items) {
  return `
    <section class="management-requests" aria-label="Solicitudes a Gerencia General">
      <div class="management-request-row management-request-header">
        <strong>Fecha</strong>
        <strong>Solicitud</strong>
        <strong>Origen</strong>
        <strong>Destino</strong>
        <strong>Estado</strong>
        <strong>Acciones</strong>
      </div>
      <div class="management-request-body">
        ${items.length ? items.map((item) => `
          <article class="management-request-row">
            <span>${formatDate(item.date)}</span>
            <div class="request-message-main">
              <strong>${item.subject}</strong>
              <p>${item.message}</p>
            </div>
            <span>${item.owner}</span>
            <span>${item.target}</span>
            <span class="tag notice">${item.status}</span>
            <span class="row-actions">
              <button class="action-icon-btn" type="button" data-request-action="edit" data-id="${item.id}" aria-label="Editar solicitud">
                <span aria-hidden="true">✎</span>
              </button>
              <button class="action-icon-btn danger" type="button" data-request-action="delete" data-id="${item.id}" aria-label="Borrar solicitud">
                <span aria-hidden="true">⌫</span>
              </button>
            </span>
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
    "crm-vendedores": "Vendedores",
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

function crmData() {
  return state.crmData || { users: [], opportunities: [], agenda: [], gestiones: [], pipeline: [], customers: [], kpis: {} };
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

function migrateCrmOpportunityToResults(opportunityId) {
  const opportunity = crmData().opportunities.find((item) => item.id === opportunityId);
  if (!opportunity || opportunityMigratedFromCrm(opportunity.id)) return;
  const submenu = getOpportunitySubmenu();
  submenu.items = [
    resultOpportunityFromCrm(opportunity),
    ...submenu.items
  ];
  saveOpportunities();
  renderCommercialSubmenu(areas.comercializacion);
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
    return opp.ownerId === sellerId && !["ganada", "perdida", "cancelada"].includes(status) && crmMatchesSearch(opp);
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
  return apiJson(`/api/crm${path}`, options).then((payload) => {
    updateCrmModel(payload);
    return payload;
  });
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
  const dialog = ensureCrmOpportunityDialog();
  const sellers = crmSortedSellers();
  const stages = crmData().stages || [];
  dialog.querySelector("#crmOpportunityTitle").textContent = opportunity ? "Editar oportunidad" : "Nueva oportunidad";
  dialog.querySelector("#crmOpportunityId").value = opportunity?.id || "";
  dialog.querySelector("#crmCompany").value = opportunity?.company || "";
  dialog.querySelector("#crmContact").value = opportunity?.contact || opportunity?.responsible || "";
  dialog.querySelector("#crmPhone").value = opportunity?.phone || "";
  dialog.querySelector("#crmSegment").value = opportunity?.segment || "";
  dialog.querySelector("#crmLocation").value = opportunity?.location || "";
  dialog.querySelector("#crmOwnerId").innerHTML = sellers.map((seller) => `<option value="${seller.id}">${escapeHtml(seller.name)}</option>`).join("");
  dialog.querySelector("#crmStageId").innerHTML = stages.map((stage) => `<option value="${stage.id}">${stage.id}. ${escapeHtml(stage.name)}</option>`).join("");
  dialog.querySelector("#crmOwnerId").value = opportunity?.ownerId || state.crmSellerId || sellers[0]?.id || "";
  dialog.querySelector("#crmStageId").value = opportunity?.stageId || "1";
  dialog.querySelector("#crmPriority").value = opportunity?.priority || "Media";
  dialog.querySelector("#crmTemperature").value = opportunity?.temperature || "Tibio";
  dialog.querySelector("#crmEstimatedAmount").value = opportunity?.estimatedAmount || "";
  dialog.querySelector("#crmNextDate").value = opportunity?.nextDate || new Date().toISOString().slice(0, 10);
  dialog.querySelector("#crmNextAction").value = opportunity?.nextAction || "";
  dialog.querySelector("#crmAgendaDate").value = opportunity?.agendaDate || opportunity?.nextDate || new Date().toISOString().slice(0, 10);
  dialog.querySelector("#crmAgendaTime").value = opportunity?.agendaTime || "";
  dialog.querySelector("#crmAgendaType").value = opportunity?.agendaType || "Seguimiento";
  dialog.querySelector("#crmAgendaPlace").value = opportunity?.agendaPlace || "Por definir";
  dialog.querySelector("#crmLastNote").value = opportunity?.lastNote || opportunity?.comment || "";
  dialog.showModal();
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
    return activeStatuses.has(status) || !["ganada", "perdida", "cancelada"].includes(status);
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

function renderCrmDashboard() {
  const data = crmData();
  const sellerShare = crmSellerOpportunityShare();
  const pipeline = data.pipeline.slice(0, 8);
  return `
    <section class="crm-shell">
      <div class="crm-hero">
        <div>
          <p class="eyebrow">Comercializacion</p>
          <h3>CRM operativo</h3>
          <span>${data.generatedAt ? `Actualizado ${new Date(data.generatedAt).toLocaleString("es-SV")}` : "Conectando datos CRM"}</span>
        </div>
        <div class="crm-hero-actions">
          <button class="primary-btn" type="button" data-crm-new>+ Oportunidad</button>
          <button class="secondary-btn" type="button" data-crm-refresh>Actualizar</button>
        </div>
      </div>
      <div class="crm-metrics">${crmMetricCards()}</div>
      <div class="crm-two-column">
        <section class="crm-section">
          <div class="crm-section-head"><strong>Pipeline por etapa</strong><span>${pipeline.length} etapas</span></div>
          <div class="crm-stage-list">
            ${pipeline.map((stage) => `
              <article class="crm-stage-row">
                <span>${stage.id}. ${escapeHtml(stage.name)}</span>
                <strong>${stage.amountLabel || formatMoney(stage.amount || 0)}</strong>
                <em>${stage.count || 0}</em>
              </article>
            `).join("") || `<div class="empty-state">No hay etapas CRM cargadas.</div>`}
          </div>
        </section>
        <section class="crm-section">
          <div class="crm-section-head"><strong>Peso por vendedor</strong><span>${formatMoney(sellerShare.reduce((sum, seller) => sum + seller.amount, 0))}</span></div>
          <div class="crm-seller-share-list">
            ${sellerShare.map((seller) => `
              <article class="crm-seller-share-row">
                <div>
                  <strong>${escapeHtml(seller.name)}</strong>
                  <span>${seller.count} oportunidades activas</span>
                </div>
                <div class="crm-share-meter" aria-label="${seller.percent.toFixed(1)}% del pipeline">
                  <i style="width: ${Math.max(2, Math.min(100, seller.percent)).toFixed(2)}%"></i>
                </div>
                <strong>${formatMoney(seller.amount)}</strong>
                <em>${seller.percent.toFixed(1)}%</em>
              </article>
            `).join("") || `<div class="empty-state">No hay oportunidades vigentes para sumar.</div>`}
          </div>
        </section>
      </div>
    </section>
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

function renderCrmTracking() {
  const data = crmData();
  const sellers = crmSortedSellers();
  const selectedSellerId = crmEnsureSellerId();
  const selectedSeller = sellers.find((seller) => seller.id === selectedSellerId);
  const sellerOpportunities = selectedSeller ? data.opportunities.filter((opp) => opp.ownerId === selectedSeller.id) : [];
  const activeOpportunities = crmActiveOpportunitiesForSeller(selectedSellerId);
  const wonOpportunities = sellerOpportunities.filter((opp) => opp.status === "Ganada");
  const lostOpportunities = sellerOpportunities.filter((opp) => opp.status === "Perdida");
  const activeValue = activeOpportunities.reduce((sum, opp) => sum + Number(opp.estimatedAmount || 0), 0);
  const wonValue = wonOpportunities.reduce((sum, opp) => sum + Number(opp.estimatedAmount || 0), 0);
  const conversionBase = wonOpportunities.length + lostOpportunities.length;
  const conversion = conversionBase ? Math.round((wonOpportunities.length / conversionBase) * 100) : 0;
  const statusOptions = [["Vigente", "Vigentes"], ["Ganada", "Ganadas"], ["Perdida", "Perdidas"], ["all", "Todas"]];
  const visibleOpportunities = state.crmStatusFilter === "all"
    ? sellerOpportunities
    : sellerOpportunities.filter((opp) => String(opp.status || "Vigente") === state.crmStatusFilter);
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
  return `
    <section class="crm-shell crm-original-module">
      <section class="crm-panel">
        <div class="crm-module-head">
          <div>
            <span class="eyebrow">Seguimiento individual</span>
            <h3>${escapeHtml(selectedSeller?.name || "Selecciona vendedor")}</h3>
            <p>Vista enfocada por vendedor, estatus y etapa.</p>
          </div>
          <button class="primary-btn" type="button" data-crm-new>Abrir oportunidad</button>
        </div>
        <div class="crm-tracking-metrics">
          <div><span>Vigentes</span><strong>${activeOpportunities.length}</strong></div>
          <div><span>Valor vigente</span><strong>${formatMoney(activeValue)}</strong></div>
          <div><span>Ganadas</span><strong>${formatMoney(wonValue)}</strong></div>
          <div><span>Conversion</span><strong>${conversion}%</strong></div>
        </div>
      </section>
      <div class="crm-tracking-layout">
        <aside class="crm-panel crm-tracking-sidebar">
          <span class="eyebrow">Vendedores</span>
          <div class="crm-seller-chip-list">${sellerButtons}</div>
        </aside>
        <section class="crm-tracking-main">
          <div class="crm-panel crm-tracking-controls">
            <span class="eyebrow">Estatus</span>
            <div class="crm-filter-chips">
              ${statusOptions.map(([value, label]) => `<button class="${state.crmStatusFilter === value ? "is-active" : ""}" type="button" data-crm-status="${value}">${label}</button>`).join("")}
            </div>
          </div>
          <div class="crm-tracking-grid">${opportunityCards || `<div class="empty-state">No hay oportunidades para este filtro.</div>`}</div>
        </section>
      </div>
    </section>
  `;
}

function renderCrmAgenda() {
  const data = crmData();
  const sellers = crmSortedSellers();
  const agenda = data.agenda.slice(0, 80);
  const slots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
  const date = state.crmAgendaDate || new Date().toISOString().slice(0, 10);
  const selectedSellerId = state.crmSellerId || "all";
  const selectedSeller = sellers.find((seller) => seller.id === selectedSellerId);
  const dayItems = agenda.filter((item) => item.date === date);
  const visibleDayItems = dayItems.filter((item) => selectedSellerId === "all" || item.ownerId === selectedSellerId);
  const availableCount = Math.max(0, sellers.length * slots.length - dayItems.length);
  const sellerRail = [
    `
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
            <span class="eyebrow">Agenda integral</span>
            <h3>Disponibilidad por hora de todos los vendedores</h3>
            <p>Vista unificada para detectar espacios libres, visitas programadas y carga diaria.</p>
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
  const opportunities = crmData().opportunities;
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
    "crm-vendedores": renderCrmSellers,
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
  commercialSubmenuTitle.textContent = submenu.label;
  commercialSubmenuStatus.textContent = submenu.status;

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
    newOpportunityBtn.classList.add("hidden");
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
        migrateCrmOpportunityToResults(button.dataset.crmMigrate);
      });
    });
    opportunityTable.querySelectorAll("[data-crm-opportunity]").forEach((item) => {
      item.addEventListener("click", () => openCrmOpportunityById(item.dataset.crmOpportunity));
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
    commercialSubmenuStatus.textContent = `${submenu.items.length} riesgos notificados`;
    opportunityTable.innerHTML = renderStrategicRisks(submenu.items);
    return;
  }

  if (submenu.key === "solicitudes") {
    newOpportunityBtn.classList.add("hidden");
    newRiskBtn.classList.add("hidden");
    newManagementRequestBtn.classList.remove("hidden");
    goalsMatrixBtn.classList.add("hidden");
    opportunityTable.classList.remove("hidden");
    opportunityDashboard.classList.add("hidden");
    commercialSubmenuStatus.textContent = `${submenu.items.length} solicitudes enviadas`;
    opportunityTable.innerHTML = renderManagementRequests(submenu.items);
    return;
  }

  newOpportunityBtn.classList.remove("hidden");
  newRiskBtn.classList.add("hidden");
  newManagementRequestBtn.classList.add("hidden");
  goalsMatrixBtn.classList.add("hidden");
  opportunityTable.classList.remove("hidden");
  opportunityDashboard.classList.add("hidden");
  const cycleRows = opportunityCycleRows(submenu.items);
  const activeRows = cycleRows.active;
  const historyRows = cycleRows.history;
  const displayRows = state.opportunityCycleView === "history" ? historyRows : activeRows;
  commercialSubmenuStatus.textContent = `${activeRows.length} vigentes / ${historyRows.length} historial`;

  if (!submenu.items.length) {
    opportunityTable.innerHTML = `
      <div class="empty-state">
        No hay oportunidades ingresadas. Usa el formulario para crear el primer registro.
      </div>
    `;
    return;
  }

  opportunityTable.innerHTML = `
    <div class="cycle-tabs">
      <button class="cycle-tab ${state.opportunityCycleView === "active" ? "active" : ""}" type="button" data-cycle-view="active">
        Vigentes <span>${activeRows.length}</span>
      </button>
      <button class="cycle-tab ${state.opportunityCycleView === "dashboard" ? "active" : ""}" type="button" data-cycle-view="dashboard">
        Dashboard <span>${activeRows.length}</span>
      </button>
      <button class="cycle-tab ${state.opportunityCycleView === "history" ? "active" : ""}" type="button" data-cycle-view="history">
        Historial <span>${historyRows.length}</span>
      </button>
      <small>Corte mensual: las cerradas antes de ${formatDate(activePeriodStart())} quedan archivadas.</small>
    </div>
    ${state.opportunityCycleView === "dashboard" ? renderCycleDashboard(submenu.items) : state.opportunityCycleView === "history" ? renderHistoryList(historyRows) : `
    <div class="opportunity-row opportunity-header">
      <strong>Fecha</strong>
      <strong>Empresa</strong>
      <strong>Vendedor</strong>
      <strong>Etapa</strong>
      <strong>Estado / probabilidad</strong>
      <strong>Monto</strong>
      <strong>Acciones</strong>
    </div>
    <div class="opportunity-table-body">
      ${displayRows.length ? displayRows.map(({ item, result, isInherited, isHistory, isImportedHistory }) => `
        <div class="opportunity-row ${isInherited ? "inherited" : ""} ${isHistory ? "archived" : ""} ${isImportedHistory ? "imported-history" : ""}">
          <span>${formatDate(item.date)}</span>
          <strong class="company-cell">
            ${item.company}
            ${isInherited ? `<span class="closure-badge inherited">Heredada</span>` : ""}
            ${isImportedHistory ? `<span class="closure-badge historical">Historico</span>` : ""}
            ${result ? `<span class="closure-badge ${result.result === "ganado" ? "won" : "lost"}">${result.result === "ganado" ? "Ganado" : "Perdida"}</span>` : ""}
          </strong>
          <span>${item.seller}</span>
          <span>${item.stage}</span>
          <span class="tag ${probabilityClass(item.probability)}">${probabilityLabel(item.probability)}</span>
          <strong>${formatMoney(item.amount)}</strong>
          <span class="row-actions">
          ${!isHistory ? `
            <button class="action-icon-btn" type="button" data-action="edit" data-id="${item.id}" aria-label="Editar">
              <span aria-hidden="true">✎</span>
            </button>
          ` : ""}
          ${isImportedHistory ? `<span class="history-lock">Cierre real</span>` : `
            <button class="action-icon-btn" type="button" data-action="manage" data-id="${item.id}" aria-label="Gestiones">
              <span aria-hidden="true">☷</span>
            </button>
          `}
          ${canDeleteOpportunities() && !isHistory ? `
            <button class="action-icon-btn danger" type="button" data-action="delete" data-id="${item.id}" aria-label="Borrar">
              <span aria-hidden="true">⌫</span>
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
    `}
  `;
}

function renderOpportunityDashboard(items) {
  state.opportunityFilter = null;
  state.kpiView = "dashboard";
  const fulfillmentRows = wonSalesFulfillmentRows(items);
  const selectedSeller = commercialSellers.includes(state.kpiSeller) ? state.kpiSeller : "all";
  const summaryRows = selectedSeller === "all"
    ? fulfillmentRows
    : fulfillmentRows.filter((row) => row.seller === selectedSeller);
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
      const count = sectionOptions
        .filter((section) => permissions.has(permissionKey(areaKey, section.key)))
        .length;
      return count ? `${areas[areaKey].nav}: ${count}` : "";
    })
    .filter(Boolean);
  return areaLabels.length ? areaLabels.join(" · ") : "Sin permisos";
}

function adminPermissionModules(user) {
  if (isAdminUser(user)) {
    return [{ label: "Acceso total", count: sectionOptions.length * areaKeys.length, total: true }];
  }
  const permissions = userPermissions(user);
  return areaKeys
    .map((areaKey) => {
      const count = sectionOptions
        .filter((section) => permissions.has(permissionKey(areaKey, section.key)))
        .length;
      return count ? { label: areas[areaKey].nav, count } : null;
    })
    .filter(Boolean);
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
  const role = adminUserRole?.value || existingUser?.role || "comercializacion";
  const selected = userPermissions(existingUser || {
    role,
    permissions: defaultPermissionsForRole(role)
  });
  adminPermissionGrid.innerHTML = areaKeys.map((areaKey) => `
    <fieldset class="permission-group">
      <legend>${areas[areaKey].nav}</legend>
      ${sectionOptions.map((section) => {
        const key = permissionKey(areaKey, section.key);
        return `
          <label class="permission-check">
            <input type="checkbox" value="${key}" ${selected.has(key) ? "checked" : ""}>
            <span>${section.label}</span>
          </label>
        `;
      }).join("")}
    </fieldset>
  `).join("");
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
    .filter(([key]) => !["general", "accionistas"].includes(key))
    .map(([key, label]) => `<option value="${key}">${label}</option>`)
    .join("");
  adminUserRole.value = user?.role || "comercializacion";
  adminUserPassword.value = "";
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

function saveAdminUserFromForm(event) {
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
  const role = admin ? "financiera" : adminUserRole.value;
  const payload = {
    id: userId || crypto.randomUUID(),
    name: adminUserName.value.trim(),
    username,
    email,
    role,
    password: adminUserPassword.value || existing?.password || "admin123",
    admin,
    permissions: admin ? allPermissionKeys() : collectAdminPermissions()
  };
  systemUsers = userId
    ? systemUsers.map((user) => user.id === userId ? payload : user)
    : [...systemUsers, payload];
  saveUsers();
  fillUserAccessOptions();
  adminUserDialog.close();
  renderDashboard();
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

function resetAdminPasswordFromForm(event) {
  event.preventDefault();
  const userId = adminPasswordUserId.value;
  systemUsers = systemUsers.map((user) =>
    user.id === userId ? { ...user, password: adminPasswordValue.value } : user
  );
  saveUsers();
  adminPasswordDialog.close();
  renderDashboard();
}

function deleteAdminUser(userId) {
  const user = systemUsers.find((item) => item.id === userId);
  if (!user || isAdminUser(user)) return;
  if (!confirm(`Eliminar usuario ${user.name}?`)) return;
  systemUsers = systemUsers.filter((item) => item.id !== userId);
  saveUsers();
  renderDashboard();
}

function renderAdminPanel() {
  if (!adminPanel) return;
  adminPanel.classList.remove("hidden");
  const keepSearchFocus = document.activeElement?.id === "adminSearchInput";
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
  const totalUsers = users.length;
  const adminUsers = users.filter((user) => isAdminUser(user)).length;
  const assignedModules = new Set(users.flatMap((user) =>
    adminPermissionModules(user)
      .filter((module) => !module.total)
      .map((module) => module.label)
  )).size;
  const totalPermissions = users.reduce((sum, user) => sum + userPermissions(user).size, 0);
  adminPanel.innerHTML = `
    <div class="admin-shell">
      <div class="admin-hero">
        <div>
          <p class="eyebrow">Administracion</p>
          <h3>Usuarios y permisos</h3>
          <p class="muted-copy">Gestion de accesos, perfiles y recuperacion de claves.</p>
        </div>
        <button class="secondary-btn icon-text-btn" type="button" data-admin-action="new">
          <span aria-hidden="true">+</span> Nuevo usuario
        </button>
      </div>

      <div class="admin-summary-grid" aria-label="Resumen de usuarios">
        <article class="admin-metric">
          <span>Usuarios</span>
          <strong>${totalUsers}</strong>
        </article>
        <article class="admin-metric">
          <span>Administradores</span>
          <strong>${adminUsers}</strong>
        </article>
        <article class="admin-metric">
          <span>Modulos activos</span>
          <strong>${assignedModules || areaKeys.length}</strong>
        </article>
        <article class="admin-metric">
          <span>Permisos asignados</span>
          <strong>${totalPermissions}</strong>
        </article>
      </div>

      <div class="admin-toolbar">
        <label class="admin-search" for="adminSearchInput">
          <span>Buscar usuario</span>
          <input id="adminSearchInput" type="search" value="${escapeHtml(state.adminQuery)}" placeholder="Nombre, correo o gerencia">
        </label>
        <span class="admin-toolbar-pill">${filteredUsers.length} visibles</span>
      </div>

      <div class="admin-user-list">
        ${filteredUsers.length ? filteredUsers.map((user) => {
          const modules = adminPermissionModules(user);
          return `
          <article class="admin-user-card ${isAdminUser(user) ? "admin-owner" : ""}">
            <div class="admin-person">
              <span class="admin-avatar" aria-hidden="true">${escapeHtml(adminUserInitials(user))}</span>
              <div>
                <strong>${escapeHtml(user.name)}</strong>
                <span>${escapeHtml(user.email || user.username)}</span>
                ${user.username ? `<small>${escapeHtml(user.username)}</small>` : ""}
              </div>
            </div>
            <div class="admin-role-block">
              <span class="admin-label">Perfil</span>
              <span class="admin-role-pill">${escapeHtml(roleDisplayName(user.role))}</span>
            </div>
            <div class="admin-access-block">
              <span class="admin-label">Accesos</span>
              <div class="admin-access-chips">
                ${modules.length ? modules.map((module) => `
                  <span class="admin-access-chip ${module.total ? "total" : ""}">
                    ${escapeHtml(module.label)}
                    ${module.total ? "" : `<small>${module.count}</small>`}
                  </span>
                `).join("") : `<span class="admin-access-chip empty">Sin permisos</span>`}
              </div>
            </div>
            <div class="admin-row-actions">
              <button class="action-icon-btn" type="button" title="Editar usuario" aria-label="Editar usuario" data-admin-action="edit" data-user-id="${user.id}">✎</button>
              <button class="action-icon-btn" type="button" title="Resetear clave" aria-label="Resetear clave" data-admin-action="password" data-user-id="${user.id}">⌁</button>
              ${isAdminUser(user) ? "" : `<button class="action-icon-btn danger" type="button" title="Eliminar usuario" aria-label="Eliminar usuario" data-admin-action="delete" data-user-id="${user.id}">⌫</button>`}
            </div>
          </article>
        `;
        }).join("") : `
          <div class="admin-empty">
            <strong>No hay usuarios con ese criterio.</strong>
            <span>Prueba con otro nombre, correo o gerencia.</span>
          </div>
        `}
      </div>
    </div>
  `;
  const searchInput = adminPanel.querySelector("#adminSearchInput");
  searchInput?.addEventListener("input", (event) => {
    state.adminQuery = event.target.value;
    renderAdminPanel();
  });
  if (keepSearchFocus && searchInput) {
    requestAnimationFrame(() => {
      const nextSearchInput = adminPanel.querySelector("#adminSearchInput");
      nextSearchInput?.focus();
      nextSearchInput?.setSelectionRange(nextSearchInput.value.length, nextSearchInput.value.length);
    });
  }
  adminPanel.querySelector("[data-admin-action='new']")?.addEventListener("click", () => openAdminUserDialog());
  adminPanel.querySelectorAll("[data-admin-action='edit']").forEach((button) => {
    button.addEventListener("click", () => openAdminUserDialog(button.dataset.userId));
  });
  adminPanel.querySelectorAll("[data-admin-action='password']").forEach((button) => {
    button.addEventListener("click", () => openAdminPasswordDialog(button.dataset.userId));
  });
  adminPanel.querySelectorAll("[data-admin-action='delete']").forEach((button) => {
    button.addEventListener("click", () => deleteAdminUser(button.dataset.userId));
  });
}

function renderPageTitle(area, activeSubmenu) {
  const isResultsView = state.activeArea === "comercializacion" && activeSubmenu?.key === "resultados";
  pageTitle.classList.toggle("with-results-summary", isResultsView);

  if (!isResultsView) {
    pageTitle.textContent = activeSubmenu ? activeSubmenu.label : area.label;
    return;
  }

  const activeRows = opportunityCycleRows(activeSubmenu.items).active;
  const activeAmount = activeRows.reduce((sum, row) => sum + Number(row.item.amount || 0), 0);
  pageTitle.innerHTML = `
    <span>Resultados</span>
    <span class="results-title-metrics">
      <span><strong>${activeRows.length}</strong> vigentes</span>
      <span>${formatMoney(activeAmount)}</span>
    </span>
  `;
}

function renderDashboard() {
  const availableAreas = allowedAreas();
  if (!availableAreas.includes(state.activeArea)) state.activeArea = availableAreas[0] || "comercializacion";
  const area = areas[state.activeArea];
  const visibleItems = visibleSubmenus(state.activeArea);
  const hasSubmenus = visibleItems.length > 0;
  activeRoleLabel.textContent = state.currentUser?.name
    ? `${state.currentUser.name} - ${roleDisplayName()}`
    : roleDisplayName();

  if (state.activeArea === adminAreaKey) {
    dashboard.classList.add("admin-focus");
    dashboard.classList.remove("opportunity-focus");
    pageTitle.classList.remove("with-results-summary");
    pageTitle.textContent = area.label;
    periodLabel.textContent = "Control de accesos";
    topbarActions?.classList.add("hidden");
    overallStatus.textContent = area.status;
    renderNav();
    summaryGrid.innerHTML = "";
    commercialPanel.classList.add("hidden");
    renderAdminPanel();
    return;
  }

  dashboard.classList.remove("admin-focus");
  topbarActions?.classList.remove("hidden");
  adminPanel?.classList.add("hidden");
  if (hasSubmenus && !visibleItems.some((item) => item.key === state.activeSubmenu)) {
    state.activeSubmenu = visibleItems[0].key;
  }
  const activeSubmenu = hasSubmenus ? visibleItems.find((item) => item.key === state.activeSubmenu) : null;
  dashboard.classList.toggle("opportunity-focus", hasSubmenus && ["resultados", "kpi", "crm", "crm-vendedores", "crm-seguimiento", "crm-agenda", "crm-respuestas", "crm-clientes", "riesgos", "solicitudes"].includes(state.activeSubmenu));
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
}

function normalizeUsers(items) {
  const source = Array.isArray(items) && items.length ? items : defaultUsers;
  const byCredential = new Map();

  const addUser = (item, index) => {
    const email = String(item.email || "").trim();
    const normalizedEmail = normalizeKey(email);
    const username = String(item.username || email || `usuario${index + 1}`).trim();
    const normalizedUsername = normalizeKey(username);
    const requestedRole = accessRoles.some(([key]) => key === item.role) ? item.role : "comercializacion";
    const admin = Boolean(item.admin) || normalizedEmail === adminEmail;
    const role = admin ? "financiera" : requestedRole;
    const user = {
      id: item.id || `user-${index + 1}`,
      name: item.name || item.username || item.email || "Usuario",
      username,
      email,
      role,
      password: item.password || "admin123",
      admin,
      permissions: admin ? allPermissionKeys() : normalizePermissionList(item.permissions, role)
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
      body: JSON.stringify({ users: systemUsers })
    }).catch(() => {});
  }
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
  localStorage.removeItem(sessionStorageKey);
  sessionRestored = false;
  state.currentUser = null;
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
    .filter(([key]) => !["general", "accionistas"].includes(key))
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
  const available = allowedAreas(user);
  if (!options.restoreSession || !available.includes(state.activeArea)) {
    state.activeArea = defaultAreaForRole(user.role, user);
    const firstSubmenu = visibleSubmenus(state.activeArea, user)[0];
    state.activeSubmenu = firstSubmenu?.key || "resultados";
    state.commercialMenuOpen = Boolean(firstSubmenu);
  }
  persistSession(user);
  loginView.classList.add("hidden");
  appShell.classList.remove("hidden");
  renderDashboard();
}

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
  const role = admin ? "financiera" : registerRole.value;
  const user = {
    id: crypto.randomUUID(),
    name: registerName.value.trim(),
    username,
    email,
    role,
    password: registerPassword.value,
    admin,
    permissions: admin ? allPermissionKeys() : defaultPermissionsForRole(role)
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
  submenu.items.unshift({
    id: crypto.randomUUID(),
    date: strategicRiskDate.value,
    owner: currentRiskOwner(),
    risk: strategicRiskText.value.trim(),
    affectsOthers,
    involved,
    status: affectsOthers ? "Notificado" : "Registrado"
  });
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
  const submenu = getManagementRequestSubmenu();
  const id = managementRequestId.value || crypto.randomUUID();
  const payload = {
    id,
    date: managementRequestDate.value,
    owner: currentRequestOwner(),
    target: "Gerencia general",
    subject: managementRequestSubject.value.trim(),
    message: managementRequestMessage.value.trim(),
    status: "Enviada"
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
    renderCommercialSubmenu(areas[state.activeArea]);
    return;
  }

  const requestButton = event.target.closest("button[data-request-action]");
  if (requestButton) {
    const submenu = getManagementRequestSubmenu();
    const item = submenu.items.find((record) => record.id === requestButton.dataset.id);
    if (!item) return;

    if (requestButton.dataset.requestAction === "delete") {
      submenu.items = submenu.items.filter((record) => record.id !== item.id);
      saveManagementRequests();
      renderCommercialSubmenu(areas[state.activeArea]);
      return;
    }

    managementRequestId.value = item.id;
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
  managementDate.valueAsDate = new Date();
  managementStage.value = item.stage;
  managementResult.value = "ganado";
  managementComment.value = "";
  updateClosureControls();
  renderManagements(item);
  managementDialog.showModal();
}

function renderManagements(item) {
  const managements = normalizeManagements(item);
  item.managements = managements;
  managementTable.innerHTML = `
    <div class="management-row management-header">
      <strong>Fecha y hora</strong>
      <strong>Etapa</strong>
      <strong>Comentario</strong>
    </div>
    ${managements.map((management) => `
      <div class="management-row">
        <span>${formatDateTime(management.date, management.time)}</span>
        <span>
          <span class="tag info">${management.stage}</span>
          ${managementResultTag(management)}
        </span>
        <span>${management.comment}</span>
      </div>
    `).join("")}
  `;
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
  resetOpportunityForm();
  opportunityDialog.showModal();
});

closeOpportunityDialog.addEventListener("click", closeOpportunityForm);
cancelOpportunityEdit.addEventListener("click", closeOpportunityForm);

managementForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const submenu = getOpportunitySubmenu();
  const item = submenu.items.find((record) => record.id === managementOpportunityId.value);
  if (!item) return;

  item.managements = normalizeManagements(item);
  item.managements.push({
    id: crypto.randomUUID(),
    date: managementDate.value,
    time: currentTimeValue(),
    stage: managementStage.value,
    result: isClosureStage(managementStage.value) ? managementResult.value : "",
    comment: managementComment.value.trim()
  });
  item.stage = managementStage.value;
  saveOpportunities();
  renderManagements(item);
  renderCommercialSubmenu(areas.comercializacion);
  managementDate.valueAsDate = new Date();
  managementComment.value = "";
  updateClosureControls();
});

managementStage.addEventListener("change", updateClosureControls);
managementResult.addEventListener("change", updateClosureControls);

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

kpiDetailDialog.addEventListener("click", (event) => {
  const tabButton = event.target.closest("[data-kpi-report-tab]");
  if (!tabButton) return;

  const target = tabButton.dataset.kpiReportTab;
  kpiDetailDialog.querySelectorAll("[data-kpi-report-tab]").forEach((button) => {
    button.classList.toggle("active", button === tabButton);
  });
  kpiDetailDialog.querySelectorAll("[data-kpi-report-view]").forEach((view) => {
    view.classList.toggle("active", view.dataset.kpiReportView === target);
  });
});

fillOpportunityOptions();
loadUsers();
loadOpportunities();
loadStrategicRisks();
loadManagementRequests();
loadCrmData();
resetOpportunityForm();
