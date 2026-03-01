import {useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';

interface SceneProps {
  title: string;
  subtitle: string;
  startFrame: number;
  endFrame: number;
}

const Scene: React.FC<SceneProps> = ({title, subtitle, startFrame, endFrame}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const sceneFrame = frame - startFrame;
  const sceneDuration = endFrame - startFrame;

  // 只在场景时间范围内显示
  if (frame < startFrame || frame >= endFrame) {
    return null;
  }

  // 淡入动画
  const fadeIn = interpolate(sceneFrame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 淡出动画
  const fadeOut = interpolate(sceneFrame, [sceneDuration - 15, sceneDuration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = Math.min(fadeIn, fadeOut);

  // 标题弹性动画
  const titleSpring = spring({
    frame: sceneFrame,
    fps,
    config: {
      damping: 100,
    },
  });

  const titleY = interpolate(titleSpring, [0, 1], [50, 0]);

  // 副标题延迟动画
  const subtitleSpring = spring({
    frame: sceneFrame - 10,
    fps,
    config: {
      damping: 100,
    },
  });

  const subtitleY = interpolate(subtitleSpring, [0, 1], [30, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 60px',
        opacity,
      }}
    >
      <h1
        style={{
          fontSize: 90,
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          transform: `translateY(${titleY}px)`,
          marginBottom: 40,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: 40,
          color: 'rgba(255, 255, 255, 0.85)',
          textAlign: 'center',
          transform: `translateY(${subtitleY}px)`,
          lineHeight: 1.4,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
};

export const MultiSceneVideo: React.FC = () => {
  const scenes = [
    {title: '一个人，月入200万？', subtitle: 'AI时代的"一人公司"来了', start: 0, end: 300},
    {title: '你还在用AI', subtitle: '接更多外包、赚更多碎钱？', start: 300, end: 750},
    {title: '错了！', subtitle: '你在卖时间，不是做生意', start: 750, end: 1200},
    {title: '真正的高手', subtitle: '从"执行者"升级为"架构师"', start: 1200, end: 2100},
    {title: '人类：审美+判断', subtitle: 'AI：执行+规模化', start: 2100, end: 2700},
    {title: '把业务拆成原子单元', subtitle: '让AI自动协作运转', start: 2700, end: 3300},
    {title: '停止工具焦虑', subtitle: '去打磨你的体系', start: 3300, end: 3600},
  ];

  return (
    <>
      {scenes.map((scene, index) => (
        <Scene
          key={index}
          title={scene.title}
          subtitle={scene.subtitle}
          startFrame={scene.start}
          endFrame={scene.end}
        />
      ))}
    </>
  );
};
