import { observer, useObserver } from "mobx-react";
import React from "react";
import { waypointList } from '../../assets/js/constants';
import "./GetImage.scss";

export const GetImage = observer(() => {

    return useObserver(() => (
        <div className="get-image-wrapper">
            <div className='get-waypoint-list'>
                <p>航点32613</p>
                <p>包含组串</p>
            </div>
            {
                waypointList.map((item) => (
                    <div className="more-waypoint-image" key={item.id}>
                        <div className="waypoint-title">
                            <p>时间{item.time}</p>
                            <p>删除</p>
                        </div>
                        <div className="waypoint-image">
                            {
                                item.imageList.map((items) => (
                                    <span key={items.id}><img src={items.src} alt="" /></span>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    ));
});

