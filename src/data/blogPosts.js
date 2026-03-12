export const blogPosts = {
  pt: [
    {
      id: 1,
      slug: 'microsservicos-spring-boot',
      title: 'Arquitetura de Microsserviços com Spring Boot: Guia Prático',
      excerpt: 'Como projetar, implementar e escalar microsserviços usando Spring Boot, desde a decomposição de domínios até o deploy com Docker.',
      category: 'Backend',
      date: '2026-02-15',
      readTime: 8,
      tags: ['Java', 'Spring Boot', 'Microsserviços', 'Docker', 'API'],
      content: `## Por que Microsserviços?

A arquitetura de microsserviços resolve problemas reais de escalabilidade e manutenção que equipes enfrentam com monólitos. No projeto SICARF, enfrentamos exatamente isso — um sistema legado que precisava escalar de forma independente.

### Princípios que Sigo

**1. Decomposição por Domínio de Negócio**

Cada microsserviço deve representar uma capability de negócio. No SICARF, separamos em:
- **Serviço de Autenticação** (AuthCore) — JWT + RBAC
- **Serviço de Regularização** — regras de negócio fundiárias
- **Serviço de Consulta Ambiental** — integração com bases ambientais

\`\`\`java
@SpringBootApplication
@EnableDiscoveryClient
public class AuthCoreApplication {
    public static void main(String[] args) {
        SpringApplication.run(AuthCoreApplication.class, args);
    }
}
\`\`\`

**2. Comunicação entre Serviços**

Prefiro comunicação assíncrona via mensageria (RabbitMQ/Kafka) para operações que não precisam de resposta imediata, e REST/gRPC para queries síncronas.

**3. Resiliência com Circuit Breaker**

Implementar circuit breakers é essencial. Usamos o Resilience4j para prevenir cascading failures:

\`\`\`java
@CircuitBreaker(name = "consulta-ambiental", fallbackMethod = "consultaFallback")
public ResponseEntity<DadosAmbientais> consultarDados(String cpf) {
    return restTemplate.getForEntity(ambientalUrl + "/dados/" + cpf, DadosAmbientais.class);
}
\`\`\`

### Resultados Práticos

- **12% de aumento na performance** da API principal
- **Deploy independente** de cada serviço
- **Escalabilidade horizontal** baseada em demanda
- **Tempo de recuperação** de falhas reduzido em 60%

### Conclusão

Microsserviços não são bala de prata, mas quando aplicados corretamente — com domínios bem definidos, comunicação robusta e observabilidade — transformam a capacidade de evolução de um sistema.`,
    },
  ],

  en: [
    {
      id: 1,
      slug: 'microservices-spring-boot',
      title: 'Microservices Architecture with Spring Boot: A Practical Guide',
      excerpt: 'How to design, implement, and scale microservices using Spring Boot, from domain decomposition to Docker deployment.',
      category: 'Backend',
      date: '2026-02-15',
      readTime: 8,
      tags: ['Java', 'Spring Boot', 'Microservices', 'Docker', 'API'],
      content: `## Why Microservices?

Microservices architecture solves real scalability and maintenance problems that teams face with monoliths. In the SICARF project, we faced exactly this — a legacy system that needed to scale independently.

### Principles I Follow

**1. Business Domain Decomposition**

Each microservice should represent a business capability. In SICARF, we separated into:
- **Authentication Service** (AuthCore) — JWT + RBAC
- **Regularization Service** — land regularization business rules
- **Environmental Query Service** — integration with environmental databases

\`\`\`java
@SpringBootApplication
@EnableDiscoveryClient
public class AuthCoreApplication {
    public static void main(String[] args) {
        SpringApplication.run(AuthCoreApplication.class, args);
    }
}
\`\`\`

**2. Inter-Service Communication**

I prefer asynchronous communication via messaging (RabbitMQ/Kafka) for operations that don't need immediate response, and REST/gRPC for synchronous queries.

**3. Resilience with Circuit Breaker**

Implementing circuit breakers is essential. We use Resilience4j to prevent cascading failures:

\`\`\`java
@CircuitBreaker(name = "environmental-query", fallbackMethod = "queryFallback")
public ResponseEntity<EnvironmentalData> queryData(String cpf) {
    return restTemplate.getForEntity(envUrl + "/data/" + cpf, EnvironmentalData.class);
}
\`\`\`

### Practical Results

- **12% API performance increase**
- **Independent deployment** of each service
- **Horizontal scalability** based on demand
- **Failure recovery time** reduced by 60%

### Conclusion

Microservices are not a silver bullet, but when applied correctly — with well-defined domains, robust communication, and observability — they transform a system's ability to evolve.`,
    },
  ],
};
