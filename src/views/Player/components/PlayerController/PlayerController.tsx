import React from 'react';

const controllers = [
  {
    name: 'mode',
    icon: () => {
      return ['music-icon-random', 'music-icon-single-loop', 'music-icon-loop'][0];
    },
  },
  { name: 'prev', icon: 'music-icon-prev' },
  {
    name: 'status',
    icon: () => {
      return ['music-icon-video-play-line', 'music-icon-video-pause-line'][1];
    },
  },
  { name: 'next', icon: 'music-icon-next' },
  { name: 'list', icon: 'music-icon-list' },
];

// const isString =
const getIcon = (icon: any) => {
  if (typeof icon === 'string') return icon;
  return icon();
};

const PlayerController = () => {
  return (
    <>
      {controllers.map(item => (
        <div>
          <i className={getIcon(item.icon)} />
        </div>
      ))}
    </>
  );
};

export default PlayerController;
