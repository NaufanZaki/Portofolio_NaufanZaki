export interface Project {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    techStack: string[];
    category: "Frontend" | "Full-Stack" | "Backend";
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
        title: "PySpark ML Pipeline",
        subtitle: "Machine Learning Platform",
        description:
            "A distributed ML pipeline for large datasets using Apache Spark.",
        longDescription:
            "Built a distributed machine learning pipeline capable of processing large datasets efficiently using Apache Spark. Implemented various ML algorithms optimized for big data workloads with automated model evaluation and deployment strategies. This project demonstrates expertise in big data technologies and scalable machine learning.",
        techStack: [
            "PySpark",
            "Machine Learning",
            "Big Data",
            "Apache Spark",
            "Python",
        ],
        category: "Backend",
        links: {
            demo: "#",
            github: "#",
        },
        previewImage:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        codeSnippet: `from pyspark.ml.feature import VectorAssembler
from pyspark.ml.classification import LogisticRegression
from pyspark.ml import Pipeline

# Create feature vector
assembler = VectorAssembler(inputCols=features, outputCol="features")
lr = LogisticRegression(maxIter=10)
pipeline = Pipeline(stages=[assembler, lr])

# Train model
model = pipeline.fit(training_data)
predictions = model.transform(test_data)`,
    },
    {
        id: 2,
        title: "Cloud Resource Optimizer",
        subtitle: "Optimization System",
        description:
            "An intelligent cloud resource allocation system using Crow Search Algorithm.",
        longDescription:
            "Developed an intelligent cloud resource allocation system using the Crow Search Algorithm for optimization. The system automatically adjusts resource distribution based on workload patterns, reducing costs while maintaining performance. This highlights skills in optimization algorithms and cloud infrastructure management.",
        techStack: [
            "Algorithms",
            "Optimization",
            "Cloud Computing",
            "Python",
            "AWS",
        ],
        category: "Full-Stack",
        links: {
            demo: "#",
            github: "#",
        },
        previewImage:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
        codeSnippet: `def crow_search_optimizer(objective_function, bounds, n_crows=50, max_iter=100):
    crows = initialize_population(n_crows, bounds)
    memory = crows.copy()
    
    for iteration in range(max_iter):
        for i in range(n_crows):
            # Follow and search
            j = random.randint(0, n_crows - 1)
            new_position = crows[i] + random.random() * (memory[j] - crows[i])
            
            # Update if better
            if objective_function(new_position) < objective_function(memory[i]):
                memory[i] = new_position
    
    return best_solution(memory)`,
    },
    {
        id: 3,
        title: "Secure Attendance System",
        subtitle: "Security Application",
        description: "A robust attendance system with end-to-end RSA encryption.",
        longDescription:
            "Created a robust attendance management system with end-to-end encryption using the RSA algorithm. Features include biometric integration, real-time synchronization, and comprehensive audit trails for enhanced security. This project showcases strong knowledge of cryptography and secure system design.",
        techStack: ["Cryptography", "Security", "RSA", "Biometrics", "Java"],
        category: "Full-Stack",
        links: {
            demo: "#",
            github: "#",
        },
        previewImage:
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
        codeSnippet: `import javax.crypto.Cipher;
import java.security.*;

public class RSAEncryption {
    private KeyPair keyPair;
    
    public RSAEncryption() throws NoSuchAlgorithmException {
        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
        generator.initialize(2048);
        keyPair = generator.generateKeyPair();
    }
    
    public byte[] encrypt(String data) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, keyPair.getPublic());
        return cipher.doFinal(data.getBytes());
    }
}`,
    },
    {
        id: 4,
        title: "Real-time Analytics Dashboard",
        subtitle: "Data Visualization",
        description:
            "Interactive dashboard for real-time data monitoring and analytics.",
        longDescription:
            "Built a comprehensive analytics dashboard with real-time data processing capabilities. Features include customizable widgets, data export functionality, and advanced filtering options for deep insights.",
        techStack: ["React", "D3.js", "WebSocket", "Node.js", "MongoDB"],
        category: "Frontend",
        links: {
            demo: "#",
            github: "#",
        },
        previewImage:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        codeSnippet: `const Dashboard = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      setData(prev => [...prev, JSON.parse(event.data)]);
    };
    return () => ws.close();
  }, []);
  
  return <ChartComponent data={data} />;
}`,
    },
];
