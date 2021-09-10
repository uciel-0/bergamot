import * as React from 'react';
import { BopIcon } from '../svg/BopIcon';


export const Footer = () => {
    return (
        <footer className="Footer">
            <BopIcon className={"bop-logo_footer"}/>
            &#169;
            2021 Bop. All rights reserved.
        </footer>
    )
}

