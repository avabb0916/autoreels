import { useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, delayRender, continueRender } from 'remotion';
import { useEffect, useState } from 'react';

interface SceneData {
    title: string;
    subtitle: string;
    duration: number;
    background?: string;
    titleColor?: string;
    subtitleColor?: string;
}

interface SceneProps {
    title: string;
    subtitle: string;
    startFrame: number;
    endFrame: number;
    background?: string;
    titleColor?: string;
    subtitleColor?: string;
}

const Slide: React.FC<SceneProps> = ({
    title,
    subtitle,
    startFrame,
    endFrame,
    background = '#1a1a2e',
    titleColor = '#ffffff',
    subtitleColor = '#e94560',
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const sceneFrame = frame - startFrame;
    const sceneDuration = endFrame - startFrame;

    if (frame < startFrame || frame >= endFrame) {
        return null;
    }

    // Slide In Animation
    const enterSpring = spring({
        frame: sceneFrame,
        fps,
        config: { damping: 12 },
    });

    const translateX = interpolate(enterSpring, [0, 1], [-1000, 0]);

    return (
        <div
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: background,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 80px',
                transform: `translateX(${translateX}px)`,
            }}
        >
            <div style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                padding: '40px 80px',
                borderRadius: '20px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}>
                <h1
                    style={{
                        fontSize: 100,
                        fontWeight: '900',
                        color: titleColor,
                        textAlign: 'center',
                        marginBottom: 20,
                        lineHeight: 1.1,
                        textTransform: 'uppercase',
                        letterSpacing: '4px'
                    }}
                >
                    {title}
                </h1>
                <p
                    style={{
                        fontSize: 45,
                        color: subtitleColor,
                        textAlign: 'center',
                        lineHeight: 1.5,
                        fontWeight: 'bold',
                        marginTop: 30
                    }}
                >
                    {subtitle}
                </p>
            </div>
        </div>
    );
};

export const SlideshowVideo: React.FC = () => {
    const { fps } = useVideoConfig();
    const [scenes, setScenes] = useState<SceneData[]>([]);
    const [handle] = useState(() => delayRender());

    useEffect(() => {
        fetch(staticFile('scriptData.json'))
            .then((res) => res.json())
            .then((data) => {
                setScenes(data.scenes || []);
                continueRender(handle);
            })
            .catch((err) => {
                console.error('Failed to load scriptData.json:', err);
                continueRender(handle);
            });
    }, [handle]);

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
                <Slide
                    key={index}
                    title={scene.title}
                    subtitle={scene.subtitle}
                    startFrame={scene.startFrame}
                    endFrame={scene.endFrame}
                    background={scene.background}
                    titleColor={scene.titleColor}
                    subtitleColor={scene.subtitleColor}
                />
            ))}
        </>
    );
};
