import React, {useEffect, useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { io } from 'socket.io-client'
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'), iconUrl: require('leaflet/dist/images/marker-icon.png'), shadowUrl: require('leaflet/dist/images/marker-shadow.png') })
export default function MapTracker(){ const [vehicles,setVehicles]=useState([]); useEffect(()=>{ const socket = io(window.location.origin.replace(/^http/,'ws')); socket.on('vehicles', d=>setVehicles(d)); return ()=>socket.disconnect() },[]); return (<div style={{height:500}}><MapContainer center={[52.5,-1.9]} zoom={6} style={{height:'100%'}}><TileLayer attribution='&copy; OpenStreetMap contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />{vehicles.map(v=> (<Marker key={v.id} position={[v.lat,v.lng]}><Popup><b>{v.reg}</b><br/>Status: {v.status}</Popup></Marker>))}</MapContainer></div>) }
