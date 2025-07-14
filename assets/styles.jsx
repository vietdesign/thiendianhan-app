export const USER_WRAPPER = {
    LAKINH_APP: 'w-full relative min-h-screen bg-cover bg-top bg-no-repeat',
    WRAPPER: 'max-w-[480px] mx-auto pb-10 text-white relative',
    PANELINFO: 'md:relative absolute top-[55%] left-4 right-4 md:w-[100%] w-auto p-2 bg-red-900/90 rounded-lg border border-red-500 text-white shadow-lg z-10',
    PANELINFO_ROW: 'flex items-center gap-2 text-xs py-1',
    LABEL: 'text-yellow-400 font-bold',
};

export const LAKINH_APP = {
    CONTAINER: 'flex flex-col items-center gap-4',
    PADDING: 'p-3',
    TEXT_BASE: 'text-base font-semibold text-center w-full relative',
    TEXT_GREEN: 'text-green-400',
    TEXT_WHITE: 'text-white',
    SPACING: 'mx-1 text-xs text-gray-500',
    COMPASS_CONTAINER: 'relative cursor-move z-1 w-full max-w-[100%] aspect-square touch-none select-none',
    BUTTON_GROUP: 'flex gap-2 relative z-10 w-full justify-between',
    DIRECTION_GROUP: 'flex gap-2 relative z-10 grid grid-cols-4 grid-rows-2 w-full',
    BUTTON: {
        PRIMARY: 'px-3 py-1 bg-green-600 text-white rounded md:hover:bg-green-700 transition-colors button-style',
        SECONDARY: 'p-1 px-2 bg-gray-600 text-white rounded md:hover:bg-gray-700 transition-colors flex items-center justify-center gap-1 flex-1',
        ZOOM: 'p-1 px-1 text-white rounded-full md:hover:bg-gray-700 transition-colors flex items-center justify-center gap-1'
    },
    INPUT: 'px-3 h-10 rounded border border-gray-300 w-20 text-black flex-1',
    INPUT_GROUP: 'flex gap-2 text-black md:mx-4 flex-1 w-full',
    ICON: 'w-6 h-6 '
};

export const BUTTON_CLASSES = {
    ZOOM: 'p-1 px-2 bg-blue-600 text-white rounded md:hover:bg-blue-700 transition-colors flex items-center justify-center gap-1',
    ROTATE: 'p-1 px-2 bg-gray-600 text-white rounded md:hover:bg-gray-700 transition-colors flex items-center justify-center gap-1',
};

export const BATTU_APP = {
    CONTAINER: 'max-w-[600px] mx-auto pb-10 text-white',
    WRAPPER: 'flex flex-col gap-4',
    HEADER: 'text-lg font-bold text-center mb-4',
    SECTION: {
        WRAPPER: 'p-3 md:p-4 bg-gray-50 rounded-lg border-2 border-yellow-500 mt-4',
        TITLE: 'text-base md:text-lg font-bold text-yellow-600 mb-3 text-center pb-2',
        GRID: 'grid grid-cols-1 md:grid-cols-4 gap-2'
    },
    CARD: {
        WRAPPER: 'border rounded p-3 bg-white',
        TITLE: 'font-bold mb-2',
        CONTENT: 'text-sm'
    },
    TEXT: {
        GREEN: 'text-green-600',
        RED: 'text-red-600',
        YELLOW: 'text-yellow-600',
        GRAY: 'text-gray-600',
        BLUE: 'text-blue-600',
        WHITE: 'text-white'
    },
    FLEX: {
        ROW: 'flex items-center gap-2',
        COL: 'flex flex-col gap-2'
    },
    LIST: {
        WRAPPER: 'ml-4 mt-1',
        ITEM: 'text-xs'
    },
    BUTTON: {
        PRIMARY: 'px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors',
        SECONDARY: 'px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors'
    }
};

export const CALENDAR_APP = {
    CONTAINER: 'max-w-4xl mx-auto p-4 relative z-20',
    HEADER: {
        WRAPPER: 'flex justify-center items-center mb-4',
        CONTROLS: 'flex items-center gap-2',
        SELECT_GROUP: 'flex items-center gap-3 my-4 text-black flex-1',
        SELECT: 'px-2 py-1 border rounded flex-1',
        MONTH_TITLE: 'text-xl text-white font-bold mb-4 border-b border-green-600 pb-2 bl-month flex justify-between items-center gap-2 w-full'
    },
    BUTTON: {
        NAV: 'px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 button-style',
        ICON: 'h-5 w-5'
    },
    CALENDAR: {
        GRID: 'grid grid-cols-7 gap-0 mb-4',
        WEEKDAY: 'text-center font-bold p-2 text-gray-500',
        DAY: {
            BASE: 'border border-gray-700 p-2 md:min-h-[100px] cursor-pointer relative bg-transparent text-white',
            TODAY: 'border-2 border-white',
            SELECTED: 'bg-green-50 border-2 border-green-500',
            HOVER: 'hover:bg-white/10',
            EMPTY: 'border border-gray-700 p-2 md:min-h-[100px] bg-transparent'
        },
        DATE: {
            SOLAR: 'font-bold text-lg',
            LUNAR: {
                MOBILE: 'md:hidden block text-xs text-purple-300',
                DESKTOP: 'hidden md:block',
                DAY: 'text-xs text-purple-300',
                MONTH: 'text-xs text-gray-500',
                YEAR: 'text-xs text-gray-500'
            }
        }
    },
    DETAILS: {
        WRAPPER: 'rounded-lg p-4 box-style',
        TITLE: 'text-xl font-bold mb-4 pb-2 text-green-600',
        GRID: 'grid grid-cols-1 md:grid-cols-2 gap-4 p-6',
        LABEL: 'font-bold bg-blue-50 text-blue-500 px-2 py-1 rounded bg-gradient-to-r-2',
        LABEL2: 'font-bold text-gray-400',
        SELECT: 'w-full md:w-auto px-3 py-4 md:py-2 border rounded text-sm mr-4 text-black'
    }
};
