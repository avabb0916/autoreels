import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { MultiSceneVideo } from './templates/TextAnimation/Composition/MultiSceneVideo';

export const VideoWithAudio: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 背景 */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <MultiSceneVideo />
      </AbsoluteFill>

      {/* 背景音乐 - 循环播放，音量降低 */}
      <Audio
        src={staticFile('background-music.mp3')}
        volume={0.3}
        loop
      />

      {/* AI配音 - 完整播放一次 */}
      <Audio
        src={staticFile('voiceover.mp3')}
        volume={1.0}
      />
    </AbsoluteFill>
  );
};
