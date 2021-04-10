import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import BScroll from 'better-scroll';
import styled from './Scroll.module.css';
import { debounce } from '../../utils/utils';

type directionType = 'horizental' | 'vertical';

interface IPosition {
  x: number;
  y: number;
}

interface IScroll {
  children: React.ReactNode;
  direction?: directionType;
  refresh?: boolean;
  bounceTop?: boolean;
  bounceBottom?: boolean;
  onScroll?: (pos: IPosition) => void;
  pullUp?: () => void;
  pullDown?: () => void;
}

const Scroll: React.ForwardRefExoticComponent<IScroll> = forwardRef((props: IScroll, ref) => {
  const { direction, refresh, bounceTop, bounceBottom, onScroll, pullUp, pullDown } = props;
  const [bScroll, setBScroll] = useState<any>(null);
  const scrollContentRef = useRef<HTMLDivElement | null>(null);

  const pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 500);
  }, [pullUp]);

  const pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 500);
  }, [pullDown]);

  useEffect(() => {
    if (scrollContentRef && scrollContentRef.current) {
      const scroll = new BScroll(scrollContentRef.current, {
        scrollX: direction === 'horizental',
        scrollY: direction === 'vertical',
        probeType: 3,
        click: true,
        bounce: {
          top: bounceTop,
          bottom: bounceBottom,
        },
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
    if (!bScroll || !pullUp) return undefined;
    const handlePullUp = () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    };
    bScroll.on('scrollEnd', handlePullUp);
    return () => {
      bScroll.off('scrollEnd', handlePullUp);
    };
  }, [pullUp, pullUpDebounce, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullDown) return undefined;
    const handlePullDown = (position: any) => {
      if (position.y > 50) {
        pullDownDebounce();
      }
    };
    bScroll.on('touchEnd', handlePullDown);
    return () => {
      bScroll.off('touchEnd', handlePullDown);
    };
  }, [pullDown, pullDownDebounce, bScroll]);

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
  bounceTop: true,
  bounceBottom: true,
};

export default Scroll;
