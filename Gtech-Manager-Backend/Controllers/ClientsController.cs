using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Gtech_Manager_Backend.Data;
using Gtech_Manager_Backend.Models;

namespace Gtech_Manager_Backend.Controllers
{
    [ApiController]
    [Route("api/clients")]
    public class ClientsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClientsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Clientes.ToList());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();
            return Ok(cliente);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var cliente = await _context.Clientes.FirstOrDefaultAsync(c => c.Id == id);
            if (cliente == null)
            {
                return NotFound();
            }

            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] Cliente cliente)
        {
            var existingCliente = await _context.Clientes.FirstOrDefaultAsync(c => c.Id == id);
            if (existingCliente == null)
            {
                return NotFound();
            }            

            _context.Entry(existingCliente).CurrentValues.SetValues(cliente);
            await _context.SaveChangesAsync();

            return Ok(existingCliente);
        }
    }
}
