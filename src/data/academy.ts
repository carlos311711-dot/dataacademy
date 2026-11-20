// Datos únicos del sitio: los usan las páginas y el prompt del chatbot (src/pages/api/chat.ts).
// Cambia precios, docentes o temarios aquí y se actualiza en todos lados.

export const WA_NUMBER = "51986575257";
export const wa = (text = "Hola, estoy interesado en capacitarme") =>
  `https://api.whatsapp.com/send/?phone=${WA_NUMBER}&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;
export const WA = wa();

// ponytail: fecha de cierre de preventa fija; actualizar a mano en cada edición
export const PREVENTA_FIN = "2026-11-11T23:59:00-05:00";

export const PRICE = { course: 199, courseRegular: 299, spec: 897, specRegular: 1499, deposit: 50 };

export type Teacher = { id: string; name: string; tool: string; toolLogos: string[]; role: string; company: string; companyLogo: string; photo: string; bio: string; courses: string[] };
export const teachers: Teacher[] = [
  { id: "jhon", name: "Jhon Velasque", tool: "Excel & SQL", toolLogos: ["/img/formation/3Excel.png", "/img/formation/sql.png"], role: "Data Analytics Engineer", company: "RIMAC Seguros", companyLogo: "/img/empresas/rimac.png", photo: "/img/profes/jhon.png",
    bio: "Transforma procesos de negocio con Excel, SQL y automatización. Enseña con casos reales de su día a día en RIMAC Seguros.", courses: ["excel", "power-automate", "workshop"] },
  { id: "jordan", name: "Jordan de la Cruz", tool: "SQL", toolLogos: ["/img/formation/sql.png"], role: "Data Analytics", company: "Credicorp Capital", companyLogo: "/img/empresas/credicorp.png", photo: "/img/profes/jordan.png",
    bio: "Especialista en analítica de datos y consultas avanzadas en SQL Server aplicadas al sector financiero en Credicorp Capital.", courses: ["sql"] },
  { id: "daniel", name: "Daniel Surichaque", tool: "Power BI", toolLogos: ["/img/formation/4Powerbi.png"], role: "Data Analytics", company: "Interbank", companyLogo: "/img/empresas/interbank.png", photo: "/img/profes/daniel.png",
    bio: "Especialista en Business Intelligence y visualización ejecutiva de datos con Power BI en el sector bancario en Interbank.", courses: ["powerbi"] },
  { id: "junior", name: "Junior Candela", tool: "Power BI", toolLogos: ["/img/formation/4Powerbi.png"], role: "Data Analytics Engineer", company: "Jockey Plaza", companyLogo: "/img/empresas/jockey.png", photo: "/img/profes/junior.png",
    bio: "Especialista en BI: construye dashboards interactivos que guían decisiones estratégicas en Jockey Plaza.", courses: ["powerbi"] },
  { id: "christian", name: "Christian Condori", tool: "Python", toolLogos: ["/img/formation/5Python.png"], role: "Data Engineer", company: "bluetab (IBM)", companyLogo: "/img/empresas/bluetab.png", photo: "/img/profes/christian.png",
    bio: "Domina Python y PySpark para análisis avanzado, limpieza masiva de datos y automatización.", courses: ["python"] },
  { id: "richard", name: "Richard Ñahui", tool: "SQL", toolLogos: ["/img/formation/sql.png"], role: "Data Engineer", company: "vooxell", companyLogo: "/img/empresas/vooxell.png", photo: "/img/profes/richard.png",
    bio: "Arquitecta bases de datos y desarrolla pipelines de datos eficientes en entornos empresariales.", courses: ["sql"] },
];
export const companies = [...new Set(teachers.map((t) => t.company))];
export const companyLogos: Record<string, string> = Object.fromEntries(teachers.map((t) => [t.company, t.companyLogo]));
export const toolIconMap: Record<string, string> = {
  "Excel": "/img/formation/3Excel.png",
  "SQL": "/img/formation/sql.png",
  "SQL Server": "/img/formation/2sqlserver.png",
  "Power BI": "/img/formation/4Powerbi.png",
  "Python": "/img/formation/5Python.png",
  "Power Automate": "/img/formation/8Autiamte.png",
  "n8n": "/img/formation/6n8n.png",
  "Azure": "/img/formation/10AZURE.png",
  "GCP": "/img/formation/9GCP.png",
  "Databricks": "/img/formation/databrick2.png",
};

export type Course = {
  id: string; n: number; name: string; short: string; area: string; hours: string; classes: number; logo: string; href: string;
  desc: string; schedule?: string; price?: number; inSpec: boolean; art: { kind: "code" | "bars" | "grid" | "nodes"; lines?: string[] };
  project: string; syllabus: string[];
};
export const courses: Course[] = [
  { id: "excel", n: 1, name: "Excel for Data Analyst", short: "Excel", area: "Excel", hours: "+30 h", classes: 8, logo: "/img/formation/3Excel.png", href: "/cursos/excel",
    desc: "Power Query ETL, BUSCARX, tablas dinámicas con modelos de datos y dashboards financieros.", schedule: "Vie 8:00–11:00 p. m. · sáb 6:00–9:00 p. m.", inSpec: true, art: { kind: "grid" },
    project: "Dashboard de ventas y finanzas comerciales",
    syllabus: ["Power Query ETL e ingesta de datos", "Modelado de datos con Power Pivot", "Fórmulas avanzadas (BUSCARX, INDICE, COINCIDIR)", "Tablas dinámicas y medidas DAX básicas", "Dashboards interactivos con principios UX"] },
  { id: "sql", n: 2, name: "SQL for Data Analyst", short: "SQL", area: "SQL", hours: "+30 h", classes: 8, logo: "/img/formation/sql.png", href: "/cursos/sql",
    desc: "Bases de datos relacionales, Transact SQL, joins y CTEs. Repaso y prueba técnica real.", schedule: "Mar y jue · 8:00–11:00 p. m.", inSpec: true,
    art: { kind: "code", lines: ["SELECT region, SUM(venta)", "FROM ventas", "GROUP BY region;"] },
    project: "KPIs de negocio en SQL Server",
    syllabus: ["Bases de datos relacionales, claves y tablas", "SELECT, WHERE, ORDER BY y filtros", "GROUP BY, HAVING y funciones agregadas", "JOINs, subconsultas y CTEs", "Vistas y procedimientos almacenados"] },
  { id: "powerbi", n: 3, name: "Power BI for Data Analyst", short: "Power BI", area: "Power BI", hours: "+30 h", classes: 8, logo: "/img/formation/4Powerbi.png", href: "/cursos/powerbi",
    desc: "Power Query, modelado en estrella, DAX y storytelling. Acceso de por vida a grabaciones.", schedule: "Lun y mié · 8:00–11:00 p. m.", inSpec: true, art: { kind: "bars" },
    project: "Dashboard de inteligencia de negocios corporativo",
    syllabus: ["Power Query: ETL y preparación de datos", "Modelado en estrella", "DAX, contextos e inteligencia de tiempo", "Visualización, UX y storytelling", "Publicación en Power BI Service"] },
  { id: "python", n: 4, name: "Python for Data Analyst", short: "Python", area: "Python", hours: "+30 h", classes: 8, logo: "/img/formation/5Python.png", href: "/cursos/python",
    desc: "Pandas, Matplotlib, Seaborn y PySpark. Entornos profesionales con Git/GitHub.", schedule: "Mar y jue · 8:00–11:00 p. m.", inSpec: true,
    art: { kind: "code", lines: ["import pandas as pd", "df = pd.read_csv('ventas.csv')", "df.groupby('mes').sum()"] },
    project: "Análisis exploratorio (EDA) en Jupyter",
    syllabus: ["Python desde cero: variables, bucles y funciones", "Pandas: lectura, limpieza y combinación", "NumPy para operaciones numéricas", "Visualización con Matplotlib y Seaborn", "Series temporales y automatización de archivos"] },
  { id: "power-automate", n: 5, name: "Power Automate for Data Analyst", short: "Power Automate", area: "Automatización", hours: "12 h", classes: 4, logo: "/img/formation/8Autiamte.png", href: "/cursos/power-automate",
    desc: "Automatiza el refresco de reportes, consolida Excel desde correos y crea alertas de negocio.", schedule: "Lun y mié · 8:00–11:00 p. m.", price: 129, inSpec: true, art: { kind: "nodes" },
    project: "Flujo end-to-end para tu portafolio",
    syllabus: ["Refresco automático de reportes", "Consolidación de Excel desde correos", "Alertas de negocio", "Integración con Power BI, Excel y SQL"] },
  { id: "workshop", n: 6, name: "Workshop: Tu Primer Proyecto DA", short: "Workshop", area: "Proyectos", hours: "15 h", classes: 0, logo: "/img/formation/databrick2.png", href: "/cursos/workshop-data-analyst",
    desc: "Proyecto end-to-end con Python, Databricks, Power BI y Power Automate. Incluye creación de portafolio.", schedule: "Lun y mié · 8:00–11:00 p. m.", price: 149, inSpec: false, art: { kind: "nodes" },
    project: "Proyecto end-to-end para tu portafolio",
    syllabus: ["Ingesta y limpieza con Python", "Procesamiento en Databricks", "Dashboard en Power BI", "Automatización con Power Automate", "Publicación en tu portafolio"] },
];
export const areas = ["Excel", "SQL", "Power BI", "Python", "Automatización", "Proyectos"];

export const spec = {
  name: "Especialización Data Analyst",
  href: "/ruta-analista",
  hours: "150 h",
  lead: "De Excel a Python y Power Automate, pasando por SQL Server y Power BI: 5 cursos en vivo y un proyecto integrador para tu portafolio.",
  final: { name: "Proyecto integrador final", time: "2 semanas", desc: "De datos dispersos a insights gerenciales: cargas los datos en SQL Server, modelas el negocio, automatizas flujos y presentas en Power BI.",
    syllabus: ["Definición del problema de negocio e indicadores", "Scripts y carga en SQL Server", "Modelado dimensional en Power BI", "Presentación final ante directivos (simulación)"] },
  bonus: { name: "Workshop de proyecto End-to-End", desc: "Taller en vivo incluido: integra Python, Databricks, Power BI y Power Automate en un caso integral." },
  includes: ["5 cursos en vivo (Excel, SQL, Power BI, Python, Power Automate)", "Proyecto integrador para tu portafolio", "Workshop práctico incluido", "Certificado oficial Data Academy", "Bonos: CV de analista + plan financiero"],
  roles: ["Data Analyst", "BI Analyst", "Analista de reportes", "Analista comercial", "Analista financiero"],
};
export const specCourses = courses.filter((c) => c.inSpec);

export const stats = [
  ["+500", "alumnos formados"],
  ["+15", "proyectos desarrollados"],
  ["4.9/5", "satisfacción de alumnos"],
  ["+50M", "filas procesadas"],
];

export const ecosystem = [
  ["Análisis", ["Excel", "Python", "Pandas"]],
  ["Bases de datos", ["SQL Server", "PostgreSQL", "BigQuery"]],
  ["Visualización", ["Power BI", "Matplotlib", "Seaborn"]],
  ["Automatización y nube", ["n8n", "Power Automate", "Azure", "GCP"]],
] as const;

export const faq = [
  ["¿Cómo separo mi cupo?", `Escríbenos por WhatsApp y separas tu cupo con S/ ${PRICE.deposit}. El saldo lo cancelas hasta una semana antes de iniciar.`],
  ["¿Qué significa “preventa”?", `Es el precio especial desde S/ ${PRICE.course} por curso (en lugar de S/ ${PRICE.courseRegular}) para los primeros 10 cupos, y S/ ${PRICE.spec} por la especialización completa (antes S/ ${PRICE.specRegular}).`],
  ["¿Las clases son grabadas o en vivo?", "Las clases son online y en vivo, con el docente resolviendo tus dudas en tiempo real mientras construyes tu proyecto."],
  ["¿Recibo certificado?", "Sí. Al completar el curso y su proyecto recibes el certificado oficial de Data Academy."],
  ["¿Necesito experiencia previa?", "No. La especialización empieza desde cero con Excel y avanza hasta Python. Cada curso también se puede llevar por separado."],
  ["¿Puedo llevar solo un curso?", `Sí. Cada curso se vende por separado desde S/ ${PRICE.course} en preventa. Si luego quieres la ruta completa, escríbenos.`],
] as const;

export const pad = (n: number) => String(n).padStart(2, "0");
