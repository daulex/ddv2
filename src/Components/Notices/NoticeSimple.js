
import { notices_praise } from "../../utilities";
const NoticeSimple = () => {
    window.navigator.vibrate(300);
    const praise = notices_praise[Math.floor(Math.random() * notices_praise.length)];
    return(
        <div className="notice">
            <div className="notice__text">
                {praise}
            </div>
        </div>
    );
};
export default NoticeSimple;