import { Bot, Brain, BarChart, MessageSquare, Database, Music, Cloud } from 'lucide-react';

const projectsData = [
  {
    title: "Spotify Data Analytics Pipeline",
    category: "Data Engineering",
    description: "Built a complete end-to-end data pipeline from Spotify API ingestion to interactive dashboard, featuring Python ETL pipelines, MySQL database design, and SQL-driven analytics.",
    fullDescription: "Implemented a Python-based API ingestion and analytics workflow using the Spotify API and MySQL, orchestrated with Airflow. Connected to the Spotify API to fetch real-time music data, designed and built a MySQL relational database, and developed Python ETL pipelines for single & batch track ingestion. Performed data cleaning using SQL to remove duplicates, ran SQL analytics to uncover insights on tracks, artists & popularity, and built a Spotify-themed interactive dashboard for data visualization. Features structured data modeling, SQL-based deduplication and transformations, and analytical querying delivering insights through an interactive dashboard.",
    tech: ["Python", "MySQL", "SQL", "Spotify API", "ETL", "Airflow", "Data Visualization"],
    color: "from-green-500 to-emerald-500",
    icon: Music,
    metrics: "Real-time API \u2022 End-to-End Pipeline",
    demoLink: null,
    githubLink: "https://github.com/Varun5526"
  },
  {
    title: "Sales Analytics \u2013 Medallion Architecture",
    category: "Cloud & Data Engineering",
    description: "End-to-end Sales Analytics project on Azure using Medallion Architecture (Bronze \u2192 Silver \u2192 Gold) with ADLS Gen2, Spark notebooks, Synapse SQL, and Power BI dashboards.",
    fullDescription: "Built an end-to-end Sales Analytics solution on Azure Data Lake (ADLS Gen2) using the Medallion Architecture. Raw data ingested into Azure Data Lake (Bronze layer), data cleaning & transformation using Spark notebooks (Silver layer), business-level aggregations in the Gold layer, data exposed using Azure Synapse Serverless SQL views, and interactive dashboards built in Power BI. This project demonstrates real-world data lake architectures, cloud security using Managed Identity, and analytical reporting workflows.",
    tech: ["Azure Data Lake", "Spark", "Azure Synapse", "Power BI", "Medallion Architecture", "SQL"],
    color: "from-blue-500 to-indigo-500",
    icon: Cloud,
    metrics: "Azure Cloud \u2022 Medallion Architecture",
    demoLink: null,
    githubLink: "https://github.com/Varun5526"
  },
  {
    title: "RAG Chatbot with LangChain & OpenAI",
    category: "Generative AI",
    description: "Built a Retrieval-Augmented Generation (RAG) chatbot capable of answering questions from custom PDF documents.",
    fullDescription: "This project demonstrates the implementation of a RAG pipeline using LangChain and OpenAI's GPT models. The system ingests PDF documents, chunks and embeds the text using vector embeddings, and stores them in a vector database (e.g., Pinecone or ChromaDB). When a user asks a question, the system retrieves the most relevant context chunks and feeds them to the LLM to generate accurate, context-aware answers. Key features include document parsing, efficient similarity search, and prompt engineering for concise responses.",
    tech: ["Python", "LangChain", "OpenAI API", "Vector DB", "Streamlit"],
    color: "from-orange-500 to-red-500",
    icon: Bot,
    metrics: "Context-Aware \u2022 Custom Knowledge Base",
    demoLink: null,
    githubLink: "https://github.com/Varun5526"
  },
  {
    title: "Stock Price Prediction",
    category: "Deep Learning",
    description: "Developed a sophisticated Stock Price Prediction model using Multi-Branch LSTM architecture with TensorFlow/Keras for highly accurate time-series forecasting, achieving remarkably low RMSE scores.",
    fullDescription: "This project implements a Multi-Branch LSTM neural network architecture that processes multiple time-series features simultaneously to predict stock prices. The model was trained on historical stock data and achieved exceptional accuracy with minimal error rates.",
    tech: ["Python", "TensorFlow", "Keras", "LSTM", "Time-Series Analysis"],
    color: "from-cyan-500 to-blue-500",
    icon: Brain,
    metrics: "Low RMSE \u2022 High Accuracy",
    demoLink: null,
    githubLink: "https://github.com/Varun5526"
  },
  {
    title: "Football Player Analytics Dashboard",
    category: "Data Analytics",
    description: "Built an interactive Football Player Analytics Dashboard using Streamlit and Plotly, providing comprehensive club-level insights with dynamic visualizations and real-time data filtering.",
    fullDescription: "A comprehensive data analytics platform that allows users to explore football player statistics, compare performance metrics, and generate insights through interactive visualizations. Features include dynamic filtering, real-time updates, and customizable dashboards.",
    tech: ["Python", "Streamlit", "Plotly", "Data Visualization", "Analytics"],
    color: "from-purple-500 to-pink-500",
    icon: BarChart,
    metrics: "Interactive \u2022 Real-time Insights",
    demoLink: null,
    githubLink: "https://github.com/Varun5526"
  },
  {
    title: "Multi-Client TCP Chat Application",
    category: "Networking",
    description: "Implemented a robust Multi-Client TCP Chat Application in Java using multi-threading for real-time communication, supporting concurrent connections and message broadcasting.",
    fullDescription: "A scalable chat application built with Java that supports multiple concurrent users through efficient multi-threading. The system handles message broadcasting, user authentication, and maintains stable connections across all clients.",
    tech: ["Java", "TCP/IP", "Multi-threading", "Networking", "Real-time Systems"],
    color: "from-emerald-500 to-teal-500",
    icon: MessageSquare,
    metrics: "Multi-threaded \u2022 Scalable",
    demoLink: null,
    githubLink: "https://github.com/Varun5526"
  },
  {
    title: "Business Intelligence Dashboard",
    category: "Business Intelligence",
    description: "Designed and developed an interactive Power BI dashboard featuring advanced time-series analysis, DAX-powered KPIs, and compelling data storytelling to transform raw business data into actionable insights.",
    fullDescription: "A comprehensive business intelligence solution built in Power BI that showcases end-to-end data analytics capabilities. The project involved: Data Transformation - Cleaned and transformed multiple Excel/CSV datasets using Power Query, handling missing values, data types, and creating calculated columns. Time Series Analysis - Implemented trending analysis with date hierarchies, YoY/MoM comparisons, and forecasting visualizations. DAX Mastery - Created complex measures and calculated columns for KPIs including running totals, moving averages, and percentage changes. Visual Storytelling - Designed an intuitive dashboard layout with interactive filters, drill-throughs, and dynamic tooltips for effective business communication.",
    tech: ["Power BI", "DAX", "Power Query", "Excel/CSV Integration", "Time Series Analysis", "Data Modeling"],
    color: "from-yellow-500 to-orange-500",
    icon: BarChart,
    metrics: "10+ KPIs \u2022 Interactive Visuals",
    downloadFile: "/MY_1ST_PROJECT.pbix",
    demoLink: null
  },
  {
    title: "E-Commerce Sales Insights Dashboard",
    category: "Business Intelligence",
    description: "Developed a comprehensive E-Commerce Sales Analytics dashboard integrating MySQL database with Power BI to deliver real-time sales insights, customer behavior analysis, and revenue tracking.",
    fullDescription: "An end-to-end business intelligence solution that connects MySQL database to Power BI for dynamic e-commerce analytics. The project encompasses: Database Integration - Established direct connectivity between MySQL and Power BI using native connectors, ensuring real-time data synchronization and automated refresh schedules. SQL Query Optimization - Wrote efficient SQL queries to extract, filter, and aggregate large-scale e-commerce transaction data, implementing joins across multiple tables for comprehensive analysis. Sales Analytics - Created detailed sales performance metrics including revenue trends, product category analysis, regional sales distribution, and customer segmentation insights.",
    tech: ["MySQL", "Power BI", "SQL", "Data Integration", "Sales Analytics", "ETL"],
    color: "from-indigo-500 to-purple-500",
    icon: Database,
    metrics: "Real-time Data \u2022 Sales KPIs",
    demoLink: null
  }
];

export default projectsData;
