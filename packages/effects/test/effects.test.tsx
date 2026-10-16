// @vitest-environment jsdom
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NeonDraw, RGBSplit, Shine, SmpteWipe, StripeText, WIPE_PATTERNS } from '../src/index';
import { wipePath } from '../src/wipe-path';

describe('web', () => {
  it('RGBSplit keeps text in the DOM and sets the offset', () => {
    const { getByText } = render(
      <RGBSplit intensity={4} animated>
        VINYL
      </RGBSplit>,
    );
    const el = getByText('VINYL');
    expect(el.className).toContain('rgb-split');
    expect(el.className).toContain('animate-glitch');
    expect(el.style.getPropertyValue('--rgb-split')).toBe('4px');
  });

  it('SmpteWipe applies the pattern class and fires onEnd for its own animation only', () => {
    const onEnd = vi.fn();
    const { container } = render(
      <SmpteWipe pattern="iris" mode="out" onEnd={onEnd}>
        <span>child</span>
      </SmpteWipe>,
    );
    const root = container.firstElementChild!;
    expect(root.className).toBe('animate-wipe-iris wipe-out');
    // React listens for the prefixed event when jsdom lacks AnimationEvent.
    const end = (el: Element) =>
      fireEvent(
        el,
        new Event('AnimationEvent' in window ? 'animationend' : 'webkitAnimationEnd', {
          bubbles: true,
        }),
      );
    end(root.firstElementChild!);
    expect(onEnd).not.toHaveBeenCalled();
    end(root);
    expect(onEnd).toHaveBeenCalledOnce();
  });
});

describe('web (title-sequence effects)', () => {
  it('StripeText keeps real text', () => {
    const { getByText } = render(<StripeText>VICE</StripeText>);
    expect(getByText('VICE').className).toBe('text-stripes');
  });

  it('Shine adds a hidden sweep layer', () => {
    const { container } = render(<Shine duration={2000}>tile</Shine>);
    const sweep = container.querySelector('.animate-shine') as HTMLElement;
    expect(sweep.getAttribute('aria-hidden')).toBe('true');
    expect(sweep.style.getPropertyValue('--shine-duration')).toBe('2000ms');
  });

  it('NeonDraw is decorative unless labelled', () => {
    const { container, rerender } = render(
      <NeonDraw viewBox="0 0 10 10">
        <path d="M0 0L10 10" />
      </NeonDraw>,
    );
    expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
    rerender(
      <NeonDraw viewBox="0 0 10 10" label="Logo">
        <path d="M0 0L10 10" />
      </NeonDraw>,
    );
    expect(container.querySelector('svg')?.getAttribute('role')).toBe('img');
    expect(container.querySelector('g')?.getAttribute('class')).toBe('animate-draw');
  });
});

describe('wipePath', () => {
  it.each(WIPE_PATTERNS)('%s: no hole at 0, starts with the full cover', (p) => {
    const d = wipePath(p, 0, 100, 50);
    expect(d.startsWith('M0 0H100V50H0Z')).toBe(true);
    expect(d).not.toMatch(/NaN|Infinity/);
  });

  it('bar-left hole grows with progress', () => {
    expect(wipePath('bar-left', 0.5, 100, 50)).toBe('M0 0H100V50H0ZM0 0H50V50H0Z');
  });

  it('blinds opens 8 slats together', () => {
    const d = wipePath('blinds', 0.5, 100, 80);
    expect(d.match(/M/g)).toHaveLength(9);
    expect(d).toContain('M0 10H100V15H0Z');
  });

  it('box is centred', () => {
    expect(wipePath('box', 0.5, 100, 50)).toBe('M0 0H100V50H0ZM25 12.5H75V37.5H25Z');
  });
});
