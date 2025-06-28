import { useEffect, useState } from 'react';
import AOS from 'aos';

function AosContext(props) {
    const [init, setInit] = useState(false);

    useEffect(() => {
        console.log('aos init', AOS);
        init &&
            AOS.init({
                throttleDelay: 120,
                duration: 800,
                offset: 0,
                once: true,
            });

        setInit(true);
    }, [init]);

    return props.children;
}

export default AosContext;
