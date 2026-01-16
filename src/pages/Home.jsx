import React from 'react';
import ParallaxSection from '../components/ParallaxSection';
import ContactSection from '../components/ContactSection';
import AboutSection from '../components/AboutSection';

const renderImages = [
    { src: "/renders/NewLevelSequence2.0021%20copy.jpg", title: "THE BEGINNING", subtitle: "Conceptual environments in Unreal Engine 5" },
    { src: "/renders/NewLevelSequence2.002222%20copy.jpg", title: "ATMOSPHERE", subtitle: "Volumetric lighting and dense fog studies" },
    { src: "/renders/oceanShot_01.0005%20copy.jpg", title: "THE DEEP", subtitle: "Procedural ocean shaders and fluid dynamics" },
    { src: "/renders/oceanShot_01.000513%20copy.jpg", title: "REFLECTION", subtitle: "Raytraced reflections and roughness maps" },
    { src: "/renders/oceanShot_01.0005_2%20copy.jpg", title: "HORIZON", subtitle: "Infinite ocean systems" },
    { src: "/renders/oceanShot_01.0005_3%20copy.jpg", title: "STORM", subtitle: "Dynamic weather systems and chaos" },
    { src: "/renders/oceanShot_01.00089%20copy.jpg", title: "OBSERVER", subtitle: "Cinematic camera composition" },
    { src: "/renders/oceanShot_01.000add5%20copy.jpg", title: "NIGHTFALL", subtitle: "Low light exposure testing" },
    { src: "/renders/oceanShot_01.000err5%20copy.jpg", title: "GLITCH", subtitle: "Post-process material effects" },
    { src: "/renders/oceanShot_01.000re5%20copy.jpg", title: "SURFACE", subtitle: "Detailed surface imperfections" },
    { src: "/renders/oceanShot_01.00dsda05%20copy.jpg", title: "ABYSS", subtitle: "Final composite render" },
    { src: "/renders/b01.jpg", title: "ORIENTAL", subtitle: "Final composite render" },
];

const Home = () => {
    return (
        <>
            <div id="home">
                {renderImages.map((item, index) => (
                    <ParallaxSection
                        key={index}
                        image={item.src}
                        title={item.title}
                        subtitle={item.subtitle}
                        align="center"
                    />
                ))}
            </div>
            <AboutSection />
            <ContactSection />
        </>
    );
};

export default Home;
