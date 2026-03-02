import {AbsoluteFill} from 'remotion';
import {MultiSceneVideo} from './templates/TextAnimation/Composition/MultiSceneVideo';

export const Video: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <MultiSceneVideo />
    </AbsoluteFill>
  );
};
