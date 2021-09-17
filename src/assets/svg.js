import React, { Component } from 'react';
import Svg, { SvgUri, Circle, Path, Defs, Style, G, Rect, Text, TSpan, Ellipse, Image, LinearGradient, Stop } from 'react-native-svg';

export const EyeIcon = props => (
    < Svg
        width={24}
        height={24}
        fill={props.fill}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 5C7 5 2.73 8.11 1 12.5 2.73 16.89 7 20 12 20s9.27-3.11 11-7.5C21.27 8.11 17 5 12 5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
            fill="#000"
            fillOpacity={0.6}
        />
    </Svg >
)

export const Menu = props => (
    <Svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M12 13a1 1 0 100-2 1 1 0 000 2zM12 6a1 1 0 100-2 1 1 0 000 2zM12 20a1 1 0 100-2 1 1 0 000 2z"
            stroke="#242424"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

export const BackArrow = props => (
    < Svg
        width={8}
        height={14}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M7 13L1 7l6-6"
            stroke="#242424"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg >
)

export const CloseIcon = props => {
    return (
        <Svg viewBox="0 0 512 512" width={512} height={512} {...props}>
            <Path
                d="M256 0C115.3 0 0 115.3 0 256s115.3 256 256 256 256-115.3 256-256S396.7 0 256 0z"
                data-original="#FF3636"
                className="prefix__active-path"
                data-old_color="#FF3636"
                fill={props.fill1 || "#152a6e"}
            />
            <Path
                d="M512 256c0 140.7-115.3 256-256 256V0c140.7 0 256 115.3 256 256z"
                data-original="#F40000"
                data-old_color="#F40000"
                fill={props.fill1 || "#152a6e"}
            />
            <Path
                data-original="#E7E7E7"
                data-old_color="#E7E7E7"
                fill={props.fill2 || "white"}
                d="M298.299 256l84.901 84.901-42.299 42.299L256 298.299 171.099 383.2 128.8 340.901 213.701 256 128.8 171.099l42.299-42.299L256 213.701l84.901-84.901 42.299 42.299z"
            />
            <Path
                data-original="#D3D3D8"
                data-old_color="#D3D3D8"
                fill={props.fill2 || "white"}
                d="M298.299 256l84.901 84.901-42.299 42.299L256 298.299v-84.598l84.901-84.901 42.299 42.299z"
            />
        </Svg>
    )
}
