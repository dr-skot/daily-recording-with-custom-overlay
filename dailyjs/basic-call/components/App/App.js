import React, { useMemo } from 'react';
import ExpiryTimer from '@dailyjs/shared/components/ExpiryTimer';
import { useCallState } from '@dailyjs/shared/contexts/CallProvider';
import { useCallUI } from '@dailyjs/shared/hooks/useCallUI';

import PropTypes from 'prop-types';
import Room from '../Room';
import { Asides } from './Asides';
import { Modals } from './Modals';

export const App = ({ customComponentForState }) => {
  const { roomExp, state } = useCallState();

  const componentForState = useCallUI({
    state,
    room: () => <Room />,
    ...customComponentForState,
  });

  // Memoize children to avoid unnecassary renders from HOC
  return useMemo(
    () => (
      <>
        {roomExp && <ExpiryTimer expiry={roomExp} />}
        <div className="app">
          {componentForState()}
          <Modals />
          <Asides />
          <style jsx>{`
            color: white;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;

            .loader {
              margin: 0 auto;
            }
          `}</style>
        </div>
      </>
    ),
    [componentForState, roomExp]
  );
};

App.propTypes = {
  customComponentForState: PropTypes.any,
};

export default App;
