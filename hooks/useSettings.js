/* eslint-disable react-hooks/rules-of-hooks */
const { useLocalStorageValue } = require('@react-hookz/web');

function usepewdsflixSettings() {
  const currentSubtitleFontColor = useLocalStorageValue('pewdsflix_settings-subtitle-font_color', {
    defaultValue: 'White',
  });
  const currentSubtitleFontSize = useLocalStorageValue('pewdsflix_settings-subtitle-font_size', {
    defaultValue: '100%',
  });
  const currentSubtitleBackgroundColor = useLocalStorageValue(
    'pewdsflix_settings-subtitle-background_color',
    {
      defaultValue: 'Black',
    },
  );
  const currentSubtitleBackgroundOpacity = useLocalStorageValue(
    'pewdsflix_settings-subtitle-background_opacity',
    {
      defaultValue: '0%',
    },
  );
  const currentSubtitleWindowColor = useLocalStorageValue(
    'pewdsflix_settings-subtitle-window_color',
    {
      defaultValue: 'Black',
    },
  );
  const currentSubtitleWindowOpacity = useLocalStorageValue(
    'pewdsflix_settings-subtitle-window_opacity',
    {
      defaultValue: '0%',
    },
  );
  const currentSubtitleTextEffects = useLocalStorageValue(
    'pewdsflix_settings-subtitle-text_effect',
    {
      defaultValue: 'Outline',
    },
  );
  const autoShowSubtitle = useLocalStorageValue('pewdsflix_settings-subtitle-auto_show', {
    defaultValue: false,
  });
  // const showFilter = useLocalStorageValue('pewdsflix_settings-layout-show-filter', {
  //   defaultValue: false,
  //   initializeWithValue: false,
  // });
  const isMutedTrailer = useLocalStorageValue('pewdsflix_settings-list-mute_trailer', {
    defaultValue: true,
    initializeWithValue: false,
  });
  const isPlayTrailer = useLocalStorageValue('pewdsflix_settings-list-play_trailer', {
    defaultValue: false,
    initializeWithValue: false,
  });
  const isFetchLogo = useLocalStorageValue('pewdsflix_settings-list-fetch_logo', {
    defaultValue: false,
  });
  const isShowSpotlight = useLocalStorageValue('pewdsflix_settings-list-show_spotlight', {
    defaultValue: false,
  });
  const isAutoSize = useLocalStorageValue('pewdsflix_settings-player-auto_size', {
    defaultValue: false,
  });
  const isPicInPic = useLocalStorageValue('pewdsflix_settings-player-pic_in_pic', {
    defaultValue: true,
  });
  const isMuted = useLocalStorageValue('pewdsflix_settings-player-mute', {
    defaultValue: false,
  });
  const isAutoPlay = useLocalStorageValue('pewdsflix_settings-player-auto_play', {
    defaultValue: false,
  });
  const isAutoMini = useLocalStorageValue('pewdsflix_settings-player-auto_mini', {
    defaultValue: false,
  });
  const isLoop = useLocalStorageValue('pewdsflix_settings-player-loop', {
    defaultValue: false,
  });
  const isScreenshot = useLocalStorageValue('pewdsflix_settings-player-screenshot', {
    defaultValue: true,
  });
  const isMiniProgressBar = useLocalStorageValue('pewdsflix_settings-player-mini_progress_bar', {
    defaultValue: true,
  });
  const isAutoPlayback = useLocalStorageValue('pewdsflix_settings-player-auto_playback', {
    defaultValue: true,
  });
  const isAutoPlayNextEpisode = useLocalStorageValue(
    'pewdsflix_settings-player-auto_play_next_episode',
    {
      defaultValue: true,
    },
  );
  const isShowSkipOpEdButton = useLocalStorageValue(
    'pewdsflix_settings-player-show_skip_op_ed_button',
    {
      defaultValue: true,
    },
  );
  const isAutoSkipOpEd = useLocalStorageValue('pewdsflix_settings-player-auto_skip_op_ed', {
    defaultValue: false,
  });
  const isFastForward = useLocalStorageValue('pewdsflix_settings-player-fast_forward', {
    defaultValue: true,
  });
  // const isSwipeFullscreen = useLocalStorageValue('pewdsflix_settings_player-gestures_swipe-fullscreen', {
  //   defaultValue: false,
  // });
  const sidebarStyleMode = useLocalStorageValue('pewdsflix_settings-layout-sidebar-style_mode', {
    defaultValue: 'rounded-all',
  });
  const sidebarMiniMode = useLocalStorageValue('pewdsflix_settings-layout-sidebar-mini_mode', {
    defaultValue: false,
    initializeWithValue: false,
  });
  const sidebarHoverMode = useLocalStorageValue('pewdsflix_settings-layout-sidebar-hover_mode', {
    defaultValue: false,
    initializeWithValue: false,
  });
  const sidebarBoxedMode = useLocalStorageValue('pewdsflix_settings-layout-sidebar-boxed_mode', {
    defaultValue: false,
    initializeWithValue: false,
  });
  const sidebarSheetMode = useLocalStorageValue('pewdsflix_settings-layout-sidebar-sheet_mode', {
    defaultValue: false,
    initializeWithValue: false,
  });
  const listViewType = useLocalStorageValue(
    'pewdsflix_settings-layout-list_view',
    {
      defaultValue: 'card',
      initializeWithValue: false,
    },
  );
  const listLoadingType = useLocalStorageValue('pewdsflix_settings-layout-list-loading_type', {
    defaultValue: 'pagination',
    initializeWithValue: false,
  });
  const autoSwitchSubtitle = useLocalStorageValue('pewdsflix_settings-subtitle-auto_switch', {
    defaultValue: true,
  });
  const isShowBreadcrumb = useLocalStorageValue(
    'pewdsflix_settings-layout-header-show_breadcrumb',
    {
      defaultValue: true,
      initializeWithValue: false,
    },
  );
  const isShowTopPagination = useLocalStorageValue(
    'pewdsflix_settings-layout-list-show-top-pagination',
    {
      defaultValue: false,
      initializeWithValue: false,
    },
  );
  const isLightDarkThemeOnly = useLocalStorageValue(
    'pewdsflix_settings-layout-theme-light_dark_only',
    {
      defaultValue: true,
    },
  );
  const currentThemeColor = useLocalStorageValue('pewdsflix_settings-layout-theme-color', {
    defaultValue: 'blue',
    initializeWithValue: false,
  });

  return {
    currentSubtitleFontColor,
    currentSubtitleFontSize,
    currentSubtitleBackgroundColor,
    currentSubtitleBackgroundOpacity,
    currentSubtitleWindowColor,
    currentSubtitleWindowOpacity,
    autoShowSubtitle,
    // showFilter,
    isMutedTrailer,
    isPlayTrailer,
    isAutoSize,
    isPicInPic,
    isMuted,
    isAutoPlay,
    isAutoMini,
    isLoop,
    isScreenshot,
    isMiniProgressBar,
    isAutoPlayback,
    isAutoPlayNextEpisode,
    isShowSkipOpEdButton,
    isAutoSkipOpEd,
    isFastForward,
    // isSwipeFullscreen,
    currentSubtitleTextEffects,
    sidebarStyleMode,
    sidebarMiniMode,
    sidebarHoverMode,
    sidebarBoxedMode,
    sidebarSheetMode,
    listViewType,
    listLoadingType,
    autoSwitchSubtitle,
    isShowBreadcrumb,
    isShowTopPagination,
    isLightDarkThemeOnly,
    currentThemeColor,
    isFetchLogo,
    isShowSpotlight,
  };
}

module.exports = { usepewdsflixSettings };
