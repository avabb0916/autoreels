import { useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, delayRender, continueRender } from 'remotion';
import { useEffect, useState } from 'react';

interface SceneData {
  title: string;
  subtitle: string;
  duration: number;
  background?: string;
  titleColor?: string;
  subtitleColor?: string;
  animation?: 'fade' | 'slide' | 'zoom';
}

interface SceneProps {
  title: string;
  subtitle: string;
  startFrame: number;
  endFrame: number;
  background?: string;
  titleColor?: string;
  subtitleColor?: string;
  animation?: 'fade' | 'slide' | 'zoom';
}

const Scene: React.FC<SceneProps> = ({
  title,
  subtitle,
  startFrame,
  endFrame,
  titleColor = 'white',
  subtitleColor = 'rgba(255, 255, 255, 0.85)',
  animation = 'fade',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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

  // 标题动画
  const titleSpring = spring({
    frame: sceneFrame,
    fps,
    config: {
      damping: 100,
    },
  });

  let titleY = 0;
  let titleScale = 1;

  if (animation === 'slide') {
    titleY = interpolate(titleSpring, [0, 1], [50, 0]);
  } else if (animation === 'zoom') {
    titleScale = interpolate(titleSpring, [0, 1], [0.8, 1]);
  } else {
    titleY = interpolate(titleSpring, [0, 1], [50, 0]);
  }

  // 副标题延迟动画
  const subtitleSpring = spring({
    frame: sceneFrame - 10,
    fps,
    config: {
      damping: 100,
    },
  });

  let subtitleY = 0;
  let subtitleScale = 1;

  if (animation === 'slide') {
    subtitleY = interpolate(subtitleSpring, [0, 1], [30, 0]);
  } else if (animation === 'zoom') {
    subtitleScale = interpolate(subtitleSpring, [0, 1], [0.8, 1]);
  } else {
    subtitleY = interpolate(subtitleSpring, [0, 1], [30, 0]);
  }

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
          color: titleColor,
          textAlign: 'center',
          transform: `translateY(${titleY}px) scale(${titleScale})`,
          marginBottom: 40,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: 40,
          color: subtitleColor,
          textAlign: 'center',
          transform: `translateY(${subtitleY}px) scale(${subtitleScale})`,
          lineHeight: 1.4,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
};

export const MultiSceneVideo: React.FC = () => {
  const { fps } = useVideoConfig();
  const [scenes, setScenes] = useState<SceneData[]>([]);
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    // 从 public 目录加载场景数据
    fetch(staticFile('scriptData.json'))
      .then((res) => res.json())
      .then((data) => {
        setScenes(data.scenes || []);
        continueRender(handle);
      })
      .catch((err) => {
        console.error('Failed to load scenes:', err);
        continueRender(handle);
      });
  }, [handle]);

  // 计算每个场景的起止帧
  const scenesWithFrames = scenes.map((scene, index) => {
    const startFrame = scenes
      .slice(0, index)
      .reduce((acc, s) => acc + s.duration * fps, 0);
    const endFrame = startFrame + scene.duration * fps;
    return {
      ...scene,
      startFrame,
      endFrame,
    };
  });

  return (
    <>
      {scenesWithFrames.map((scene, index) => (
        <Scene
          key={index}
          title={scene.title}
          subtitle={scene.subtitle}
          startFrame={scene.startFrame}
          endFrame={scene.endFrame}
          background={scene.background}
          titleColor={scene.titleColor}
          subtitleColor={scene.subtitleColor}
          animation={scene.animation}
        />
      ))}
    </>
  );
};
