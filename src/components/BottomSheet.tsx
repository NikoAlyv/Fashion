import React, {ReactNode, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import {colors} from '../theme/colors';
import {normalize} from '../theme/metrics';
import {CommonStyles} from '../theme/common.styles';
import {windowWidth} from '../theme/consts.styles';
import {Table} from './Table';
import {Rating} from './Rating';
import {TypographyStyles} from '../theme/typography';

interface IBottomSheet {
  setStatus?: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
  Children?: ReactNode;
  subTitle?: string;
  onPress?: () => void;
  rightTable?: ReactNode;
  title?: string;
  size?: StyleProp<ViewStyle>;
}

export const BottomSheet: React.FC<IBottomSheet> = ({
  setStatus = () => {},
  style,
  rightTable,
  title,
  subTitle,
  Children,
  size,
}) => {
  const slide = React.useRef(new Animated.Value(300)).current;
  const lastOffset = React.useRef(0);
  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationY: slide}}],
    {useNativeDriver: true},
  );

  const slideUp = () => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      lastOffset.current = 0;
      slide.setOffset(lastOffset.current);
      slide.setValue(0);
    });
  };

  const slideDown = () => {
    Animated.timing(slide, {
      toValue: 300,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      lastOffset.current = 300;
      slide.setOffset(lastOffset.current);
      slide.setValue(0);
    });
  };

  useEffect(() => {
    slideUp();
  }, []);

  const closeModal = () => {
    slideDown();

    setTimeout(() => {
      if (setStatus) {
        setStatus(false);
      }
    }, 800);
  };

  return (
    <Pressable style={styles.backdrop}>
      <Pressable style={[styles.size, size]}>
        <GestureHandlerRootView>
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={event => {
              if (event.nativeEvent.oldState === 4) {
                lastOffset.current += event.nativeEvent.translationY;
                if (lastOffset.current >= 300) {
                  closeModal();
                } else {
                  slideUp();
                }
              }
            }}>
            <Animated.View
              style={[
                styles.bottomSheet,
                {
                  transform: [
                    {translateY: Animated.add(slide, lastOffset.current)},
                  ],
                },
                style,
              ]}>
              <Table title={title} subTitle={subTitle} Right={rightTable} />
              <View style={CommonStyles.justifyBetweenRow}>
                <Rating
                  fixRating={true}
                  rating={3}
                  numberOfRates={'320 Review'}
                />
                <Text style={TypographyStyles.title2Poppins11}>
                  Avaliable in stok
                </Text>
              </View>
              {Children}
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    flex: 1,
    bottom: 0,
    left: 0,
    width: windowWidth,
    height: 1,
    justifyContent: 'flex-end',
  },

  size: {
    width: '100%',
    height: 412,
  },
  bottomSheet: {
    paddingHorizontal: normalize('horizontal', 25),
    paddingTop: 20,
    width: windowWidth,
    backgroundColor: colors.gray.lighter,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height: '100%',
  },
  closeIcon: {
    marginLeft: 'auto',
    marginRight: normalize('horizontal', 16),
  },
});
