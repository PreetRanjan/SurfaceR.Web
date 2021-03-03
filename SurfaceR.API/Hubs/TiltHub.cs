using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tilter.API.Hubs
{
    public class TiltHub : Hub
    {
        public async Task RotateOnAxis(string axis, string value)
        {
            await Clients.All.SendCoreAsync("rotated", new object[] { axis, value });
        }
        public async Task Rotate3Axis(string x, string y, string z)
        {
            await Clients.All.SendCoreAsync("rotated3axis", new object[] { x, y, z });
        }
        public async Task Rotate(string x, string y, string z, string deg)
        {
            await Clients.All.SendCoreAsync("fullyrotated", new object[] { x, y, z, deg });
        }

    }
}
