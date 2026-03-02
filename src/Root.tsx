import { Composition, staticFile, continueRender, delayRender } from 'remotion';
import { useEffect, useState } from 'react';
import { Video } from './Video';
import { VideoWithAudio } from './VideoWithAudio';
import { getDimensionsForPlatform } from './utils/platformDimensions';
import { SlideshowVideo } from './templates/SimpleSlideshow/Composition/SlideshowVideo';

export const RemotionRoot: React.FC = () => {
  const [handle] = useState(() => delayRender());
  const [dimensions, setDimensions] = useState({ width: 1080, height: 1920 });
  const [template, setTemplate] = useState('TextAnimation');

  useEffect(() => {
    // 加载全局配置信息
    fetch(staticFile('scriptData.json'))
      .then((res) => res.json())
      .then((data) => {
        const platform = data.metadata?.platform || 'TikTok';
        const dims = getDimensionsForPlatform(platform);
        setDimensions(dims);
        setTemplate(data.metadata?.template || 'TextAnimation');
        continueRender(handle);
      })
      .catch((err) => {
        console.error('Failed to load scriptData.json:', err);
        continueRender(handle);
      });
  }, [handle]);

  // 根据 template 动态加载不同的视频组件
  const VideoComponent = template === 'SimpleSlideshow' ? SlideshowVideo : Video;

  return (
    <>
      <Composition
        id="SocialMediaVideo"
        component={VideoComponent}
        durationInFrames={3600}
        fps={30}
        width={dimensions.width}
        height={dimensions.height}
      />
      <Composition
        id="SocialMediaVideoWithAudio"
        component={VideoWithAudio}
        durationInFrames={3600}
        fps={30}
        width={dimensions.width}
        height={dimensions.height}
      />
    </>
  );
};
