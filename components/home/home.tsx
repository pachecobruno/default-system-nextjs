import { Button, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import User from '../../models/user.model';
import { loadingsAction } from '../../state/actions/loadings';
import { messagesAction } from '../../state/actions/messages.action';
import MessageBuilder from '../common/message/model/builders/MessageBuilder';
import { useWindowSize } from '../common/resize/resizeDetector';
import Profile from '../profile/Profile';

function Home({...props}) {

    return (
        <>
          <div style={{width: '100%'}}>
            <Button onClick={() => {props.loadMessage(); }}>
                Show message
            </Button>
            <Button onClick={() => { props.incrementLoading(); }}>
                Show loading
            </Button>
          </div>
          <Profile />
        </>
    );
}

function mapStateToProps(state: any) {
    const user: User = state.get('authReducer').toJS().user;
    return { user };
  }

function mapDispatchToProps(dispatch: any) {
    return {
        loadMessage: () => {
            dispatch(() => { dispatch(
                messagesAction([
                    MessageBuilder.builder()
                        .setVariant('info')
                        .setSecondsTimeout(3)
                        .setMessage('Mensagem de teste')
                        .build()
                ])
            ); });
        },
        incrementLoading: () => {
          dispatch(() => {
            dispatch(loadingsAction(1));
            setTimeout(() => {
              dispatch(loadingsAction(-1));
            }, 3000);
          });
        },
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Home);
