import {useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';

export const TextAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // 主标题动画
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const titleY = spring({
    frame,
    fps,
    config: {
      damping: 100,
    },
  });

  const titleTransform = interpolate(titleY, [0, 1], [50, 0]);

  // 副标题动画（延迟出现）
  const subtitleOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const subtitleY = spring({
    frame: frame - 40,
    fps,
    config: {
      damping: 100,
    },
  });

  const subtitleTransform = interpolate(subtitleY, [0, 1], [30, 0]);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 60px',
      }}
    >
      <h1
        style={{
          fontSize: 80,
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleTransform}px)`,
          marginBottom: 40,
        }}
      >
        欢迎来到
        <br />
        Remotion
      </h1>
      <p
        style={{
          fontSize: 36,
          color: 'rgba(255, 255, 255, 0.8)',
          textAlign: 'center',
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleTransform}px)`,
        }}
      >
        用代码创建精彩视频
      </p>
    </div>
  );
};
