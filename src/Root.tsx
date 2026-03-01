import {Composition} from 'remotion';
import {Video} from './Video';
import {VideoWithAudio} from './VideoWithAudio';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SocialMediaVideo"
        component={Video}
        durationInFrames={3600}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="SocialMediaVideoWithAudio"
        component={VideoWithAudio}
        durationInFrames={3600}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
