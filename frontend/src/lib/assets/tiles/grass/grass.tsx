<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.10"
          tiledversion="1.11.0"
          name="dual-grid-terrain"
          tilewidth="32"
          tileheight="32"
          tilecount="16"
          columns="4">
    <properties>
        <property tileId="grass"/>
    </properties>
    <image source="terrain.png"
           width="128"
           height="128"/>

    <tile id="0" type="sw"/>

    <tile id="1" type="ne_se"/>

    <tile id="2" type="nw_se_sw"/>

    <tile id="3" type="se_sw"/>

    <tile id="4" type="nw_se"/>

    <tile id="5" type="ne_se_sw"/>

    <tile id="6" type="nw_ne_se_sw"/>

    <tile id="7" type="nw_ne_sw"/>

    <tile id="8" type="ne"/>

    <tile id="9" type="nw_ne"/>

    <tile id="10" type="nw_ne_se"/>

    <tile id="11" type="nw_sw"/>

    <tile id="12" type="empty"/>

    <tile id="13" type="nw"/>

    <tile id="14" type="ne_sw"/>

    <tile id="15" type="se"/>
</tileset>