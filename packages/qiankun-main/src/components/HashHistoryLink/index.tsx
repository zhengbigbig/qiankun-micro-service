import React, { FC } from 'react';
import { Link, LinkProps, useHistory } from 'react-router-dom';

interface Props extends LinkProps {
    to: string;
    linkType?: number;
    className?: string;
    style?: React.CSSProperties;
}

/**
 *  兼容hash路由的link, 由于主路由是history路由，如果页面是hash路由，不能直接使用link,需要使用该组件进行特殊处理
 **/
const HashHistoryLink: FC<Props> = (props) => {
    const { to, linkType, children, className, style, ...rest } = props;
    const history = useHistory();
    if (to.indexOf('#') > -1) {
        return (
            <a
                className={className}
                style={style}
                href={to}
                onClick={async (e) => {
                    e.preventDefault();
                    const url = to.split('#')[0];
                    const hash = to.split('#')[1];
                    if (location.pathname.indexOf(url) > -1) {
                        window.location.hash = hash;
                        return;
                    }
                    history.push(to);
                }}
            >
                {children}
            </a>
        );
    }
    const onLinkClick = async (e: any) => {
        e.preventDefault();
        history.push(to);
    };
    return (
        <Link onClick={onLinkClick} to={to} className={className} style={style} {...rest}>
            {children}
        </Link>
    );
};

export default HashHistoryLink;
