export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  techStack: string[];
  category: "Frontend" | "Full-Stack" | "Backend" | "AI & Data";
  links: {
    demo?: string;
    github?: string;
  };
  previewImage: string;
  codeSnippet: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Cervical Cancer Early Detection XAI & Edge ML",
    subtitle: "Undergraduate Thesis Project",
    description:
      "CNN-based diagnostic system with Quantization for edge deployment and XAI (CAM) integration, paired with a native Kotlin Android app.",
    longDescription:
      "Engineered deep learning models (MobileNet, EfficientNet, ResNet) for cervical image analysis, integrating Explainable AI (Class Activation Maps) for transparent and verifiable medical diagnostics. Optimized models via post-training quantization to drastically cut memory/compute footprints, allowing real-time, on-device inference inside a custom Kotlin Android app.",
    techStack: [
      "TensorFlow",
      "PyTorch",
      "OpenCV",
      "Quantization",
      "Explainable AI (CAM)",
      "Kotlin",
      "Android",
      "Python",
    ],
    category: "AI & Data",
    links: {
      github: "https://github.com/NaufanZaki",
    },
    previewImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    codeSnippet: `import tensorflow as tf
from tensorflow.lite.python.optimize import calibrator

# Post-Training Quantization for Edge Inference
converter = tf.lite.TFLiteConverter.from_saved_model(saved_model_dir)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.target_spec.supported_types = [tf.float16]
tflite_quant_model = converter.convert()

with open('model_quantized.tflite', 'wb') as f:
    f.write(tflite_quant_model)`,
  },
  {
    id: 2,
    title: "Legal Management System (LMS)",
    subtitle: "PT INKA (Persero) - Digitalization Project",
    description:
      "Enterprise workflow platform for digitizing legal cases, document tracking, and licensing monitoring.",
    longDescription:
      "Directed the full software development lifecycle—from UI/UX design wireframes and relational database blueprinting to final cloud deployment. Developed modular monitoring features for legal contracts and licensing lifecycle management using ReactJS and Strapi headless CMS, significantly speeding up corporate compliance workflows.",
    techStack: [
      "React.js",
      "Strapi",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "RESTful APIs",
      "SQLite",
    ],
    category: "Full-Stack",
    links: {
      github: "https://github.com/NaufanZaki",
    },
    previewImage:
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&h=600&fit=crop",
    codeSnippet: `import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const CaseMonitoring = () => {
  const [legalCases, setLegalCases] = useState([]);
  
  useEffect(() => {
    axios.get('/api/legal-cases?populate=*')
      .then(res => setLegalCases(res.data.data));
  }, []);

  return (
    <div className="grid gap-4 p-6">
      {legalCases.map(c => <CaseCard key={c.id} item={c} />)}
    </div>
  );
};`,
  },
  {
    id: 3,
    title: "Enterprise Power BI Risk & EAC Dashboard",
    subtitle: "PT Semen Indonesia Tbk",
    description:
      "Automated BI intelligence platform centralizing data across 9 OpCos with real-time DAX S-Curves.",
    longDescription:
      "Engineered an automated Power BI intelligence platform via Power Query to centralize multi-source SharePoint data across 9 operating companies. Programmed custom DAX measures for real-time S-Curves and Estimate at Completion (EAC) risk modeling, while migrating legacy server infrastructure to SaaS with Row-Level Security (RLS).",
    techStack: [
      "Power BI",
      "DAX",
      "Power Query",
      "SharePoint",
      "ETL Pipelines",
      "Row-Level Security",
      "Cloud SaaS",
    ],
    category: "Backend",
    links: {
      linkedin: "https://linkedin.com/in/naufan-zaki-luqmanulhakim-0b0810248",
    },
    previewImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    codeSnippet: `// DAX Real-Time EAC & S-Curve Calculation
EAC_Cumulative = 
VAR CurrentDate = MAX('Calendar'[Date])
VAR ActualToDate = CALCULATE([Total Actual Cost], 'Calendar'[Date] <= CurrentDate)
VAR RemainingBudget = CALCULATE([Total Budget] - [Total Actual Cost], ALL('Calendar'))
RETURN 
    ActualToDate + (RemainingBudget * [Risk_Multiplier_Index])`,
  },
  {
    id: 4,
    title: "Smart City Urban Management Platform",
    subtitle: "GemasTIK 2024 National Finalist Project",
    description:
      "Smart urban infrastructure analytics system developed for the prestigious GemasTIK Smart City competition.",
    longDescription:
      "Designed and prototyped an integrated smart city dashboard for monitoring urban resource efficiency, public services, and infrastructure performance. Recognized as a national finalist in GemasTIK 2024 by the Ministry of Education, Culture, Research, and Technology (Kemendikbudristek).",
    techStack: [
      "React.js",
      "TypeScript",
      "Figma",
      "UI/UX Design",
      "IoT Analytics",
      "Smart City",
    ],
    category: "Frontend",
    links: {
      github: "https://github.com/NaufanZaki",
    },
    previewImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
    codeSnippet: `interface SensorData {
  nodeId: string;
  trafficDensity: number;
  airQualityIndex: number;
  timestamp: string;
}

export const analyzeUrbanMetrics = (data: SensorData[]): number => {
  return data.reduce((acc, curr) => acc + (curr.trafficDensity * 0.6 + curr.airQualityIndex * 0.4), 0) / data.length;
};`,
  },
];
