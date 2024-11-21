import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

// Interface para as props do componente
interface GraphProps {
  progress?: number; // Progresso atual (padrão: 0)
  size?: number; // Tamanho do gráfico (padrão: 200)
  strokeWidth?: number; // Largura do traço (padrão: 20)
}

const Graph: React.FC<GraphProps> = ({ progress = 0, size = 200, strokeWidth = 20 }) => {
  const radius = (size - strokeWidth) / 2; // Raio do arco
  const center = size / 2; // Centro do SVG
  const baseAngle = 180; // Ângulo base (meia-lua inicia em 180°)

  // Função para converter ângulos polares em coordenadas cartesianas
  const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
    const radian = (Math.PI * angle) / 180.0;
    return {
      x: cx + r * Math.cos(radian),
      y: cy + r * Math.sin(radian),
    };
  };

  // Função para descrever o arco como um caminho SVG
  const describeArc = (
    x: number,
    y: number,
    r: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(x, y, r, endAngle); // Ponto final
    const end = polarToCartesian(x, y, r, startAngle); // Ponto inicial
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"; // Flag para arco pequeno ou grande
    return [
      `M ${start.x} ${start.y}`, // Mover para o ponto inicial
      `A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`, // Desenhar arco
    ].join(" ");
  };

  // Configuração dos segmentos de progresso
  const segments = [
    { start: 0, end: 50, colorStart: "green", colorEnd: "green", direction: "horizontal" },
    { start: 50, end: 70, colorStart: "green", colorEnd: "lightgreen", direction: "horizontal" },
    { start: 70, end: 90, colorStart: "lightgreen", colorEnd: "yellow", direction: "horizontal" },
    { start: 90, end: 100, colorStart: "yellow", colorEnd: "red", direction: "vertical" },
  ];

  // Caminho do arco de fundo (completo)
  const backgroundPath = describeArc(center, center, radius, baseAngle, 360);

  return (
    <View style={styles.container}>
      {/* Título acima do gráfico */}
      <Text style={styles.title}>Resumo Diário</Text>

      <View>
        <Svg width={size} height={size / 2}>
          <Defs>
            {/* Gradientes dinâmicos para cada segmento */}
            {segments.map((segment, index) => {
              if (progress <= segment.start) return null; // Não criar gradiente para segmentos não atingidos

              // Definir direção do gradiente
              const x2 = segment.direction === "horizontal" ? "1" : "0.1";
              const y2 = segment.direction === "vertical" ? "1" : "0.01";

              return (
                <LinearGradient
                  key={`grad-${index}`}
                  id={`grad-${index}`}
                  x1="0"
                  y1="0"
                  x2={x2}
                  y2={y2}
                >
                  <Stop offset="0%" stopColor={segment.colorStart} />
                  <Stop offset="100%" stopColor={segment.colorEnd} />
                </LinearGradient>
              );
            })}
          </Defs>

          {/* Fundo do gráfico */}
          <Path
            d={backgroundPath}
            stroke="#ccc"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Renderizar cada segmento suavemente */}
          {segments.map((segment, index) => {
            if (progress <= segment.start) return null; // Ignorar segmentos ainda não atingidos

            // Limitar o progresso ao intervalo do segmento
            const limitedProgress = Math.min(progress, segment.end);

            // Calcular ângulos do segmento
            const startAngle = baseAngle + (segment.start / 100) * 180;
            const endAngle = baseAngle + (limitedProgress / 100) * 180;

            // Gerar o caminho do segmento
            const path = describeArc(center, center, radius, startAngle, endAngle);

            return (
              <Path
                key={`segment-${index}`}
                d={path}
                stroke={`url(#grad-${index})`} // Gradiente aplicado
                strokeWidth={strokeWidth}
                fill="none"
              />
            );
          })}
        </Svg>

        {/* Representação do progresso em % no centro */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{`${progress}%`}</Text>
          <Text style={styles.subtitle}>Avaliação Kcal</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  progressContainer: {
    position: 'absolute',
    top: 80,
    left: 5,
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 45,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Graph;