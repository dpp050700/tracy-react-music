import React, { forwardRef, useState, useRef, useEffect, useImperativeHandle } from 'react';
import BScroll from 'better-scroll';
import styled from './Scroll.module.css';

type directionType = 'horizental' | 'vertical';

interface IScroll {
  children: React.ReactNode;
  direction?: directionType;
  onScroll?: () => void;
  refresh?: boolean;
}

const Scroll: React.ForwardRefExoticComponent<IScroll> = forwardRef((props: IScroll, ref) => {
  const { direction, refresh, onScroll } = props;
  const [bScroll, setBScroll] = useState<any>(null);
  const scrollContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollContentRef && scrollContentRef.current) {
      const scroll = new BScroll(scrollContentRef.current, {
        scrollX: direction === 'horizental',
        scrollY: direction === 'vertical',
        probeType: 3,
        click: true,
      });
      setBScroll(scroll);
      return () => {
        setBScroll(null);
      };
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (!bScroll || !onScroll) return undefined;
    bScroll.on('scroll', onScroll);
    return () => {
      bScroll.off('scroll', onScroll);
    };
  }, [onScroll, bScroll]);

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
      return undefined;
    },
  }));

  return (
    <div className={styled.root} ref={scrollContentRef}>
      {props.children}
    </div>
  );
});

Scroll.defaultProps = {
  refresh: true,
  direction: 'vertical',
};

export default Scroll;
