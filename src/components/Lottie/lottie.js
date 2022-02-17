import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import lottie from "lottie-web";

const Lottie = ({ animationData, width, height, speed }) => {
	const element = useRef(null);
	const lottieInstance = useRef();

	useEffect(() => {
		if (element.current) {
			lottieInstance.current = lottie.loadAnimation({
				animationData,
				container: element.current,
				renderer: "svg",
			});
			lottieInstance.current.setSpeed(speed || 1);
		}
	}, [animationData, speed]);

	return <div style={{ width, height }} ref={element}></div>;
};

Lottie.propTypes = {
	animationData: PropTypes.object.isRequired,
	width: PropTypes.string.isRequired,
	height: PropTypes.string.isRequired,
	speed: PropTypes.number.isRequired,
};

export default Lottie;